"""Convert the two supplied Make exports; never execute their modules."""
import json
import re
import sys
import uuid
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'automation' / 'n8n'


def expression(source, escaped=True):
    source = source.strip()
    call = re.fullmatch(r'(if|switch)\((.*)\)', source, re.S)
    if call:
        args, start, depth, quoted, slash = [], 0, 0, False, False
        body = call[2]
        for i, char in enumerate(body):
            if char == '"' and not slash:
                quoted = not quoted
            if not quoted:
                if char == '(':
                    depth += 1
                elif char == ')':
                    depth -= 1
                elif char == ';' and depth == 0:
                    args.append(body[start:i])
                    start = i + 1
            slash = char == '\\' and not slash
        args.append(body[start:])
        if call[1] == 'if':
            if len(args) != 3:
                raise ValueError('Invalid if expression')
            return '(' + expression(args[0], False) + ' ? ' + expression(args[1], escaped) + ' : ' + expression(args[2], escaped) + ')'
        converted = [expression(args[0], False)]
        for i, arg in enumerate(args[1:], 1):
            converted.append(expression(arg, escaped if i % 2 == 0 or i == len(args) - 1 else False))
        return 'select(' + ', '.join(converted) + ')'
    if not source:
        return '""'
    tokens = re.findall(r'"(?:\\.|[^"\\])*"|1\.`[^`]+`|1\.\w+|[A-Za-z_]+|\d+|[();=><&+]', source)
    if re.sub(r'\s+', '', source) != re.sub(r'\s+', '', ''.join(tokens)):
        raise ValueError('Unsupported Make expression: ' + source)
    result = []
    for i, token in enumerate(tokens):
        if token.startswith('1.'):
            result.append('v(' + json.dumps(token[2:].strip('`'), ensure_ascii=False) + ', ' + str(escaped).lower() + ')')
        elif token.startswith('"'):
            result.append(token)
        elif token == 'if':
            result.append('choose')
        elif token == 'switch':
            result.append('select')
        elif token == ';':
            result.append(',')
            if i + 1 < len(tokens) and tokens[i + 1] == ')':
                result.append('""')
        elif token in {'=', '&'}:
            result.append({'=': '==', '&': '&&'}[token])
        elif token in {'true', 'false', '(', ')', '+', '>', '<'} or token.isdigit():
            result.append(token)
        else:
            raise ValueError('Unsupported token: ' + token)
    return ' '.join(result)


def template(text):
    parts = re.split(r'({{.*?}})', text, flags=re.S)
    return ' + '.join('String(' + expression(p[2:-2]) + ')' if p.startswith('{{')
                      else json.dumps(p, ensure_ascii=False) for p in parts if p) or '""'


def node(name, type_, parameters, x, version=1):
    return {'id': str(uuid.uuid5(uuid.NAMESPACE_URL, 'orizia/' + name)), 'name': name,
            'type': 'n8n-nodes-base.' + type_, 'typeVersion': version,
            'position': [x, 0], 'parameters': parameters}


def convert(source, kind):
    flow = source['flow']
    fields = [f['name'] for f in flow[0]['metadata']['interface']]
    emails = [n for n in flow if n['module'] == 'email:ActionSendEmail']
    code = """const p = $input.first().json.body;
if (!p || typeof p !== 'object' || Array.isArray(p)) throw new Error('Corps JSON invalide');
for (const key of ['numero_dossier', 'profil_nom', 'profil_prenom', 'profil_mail', 'profil_tel']) {
  if (typeof p[key] !== 'string' || !p[key].trim() || p[key].length > 300) throw new Error('Champ invalide : ' + key);
}
if (!/^[^\\s@<>]+@[^\\s@<>]+\\.[^\\s@<>]+$/.test(p.profil_mail)) throw new Error('Email invalide');
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const v = (key, escaped) => typeof p[key] === 'string' && escaped ? escape(p[key]) : (p[key] ?? '');
const select = (value, ...args) => {
  for (let i = 0; i + 1 < args.length; i += 2) if (value === args[i]) return args[i + 1];
  return args.length % 2 ? args[args.length - 1] : '';
};
"""
    code += 'const fields = ' + json.dumps(fields, ensure_ascii=False) + ';\n'
    code += 'const document = Object.fromEntries(fields.map(k => [k, p[k] ?? null]));\n'
    # Render trusted static templates while escaping all submitted string values.
    for i, email in enumerate(emails):
        code += f'const html{i} = ' + template(email['mapper']['html']) + ';\n'
    code += 'return [{json: {...document, ' + ', '.join(f'html{i}' for i in range(len(emails))) + '}}];'
    (OUT / f'{kind}-render.js').write_text(code, encoding='utf-8')
    names = ['Reception ' + kind, 'Preparer ' + kind]
    nodes = [node(names[0], 'webhook', {'httpMethod': 'POST', 'path': 'orizia-' + kind,
             'authentication': 'headerAuth', 'responseMode': 'responseNode', 'options': {}}, 0, 2),
             node(names[1], 'code', {'jsCode': code}, 260, 2)]
    nodes[0]['webhookId'] = str(uuid.uuid5(uuid.NAMESPACE_URL, 'orizia-webhook/' + kind))
    nodes[0]['credentials'] = {'httpHeaderAuth': {'id': 'oriziaWebhookAuth', 'name': 'Orizia - Webhook prive'}}
    if kind == 'rac':
        nodes.append(node('Enregistrer dossier MongoDB', 'mongoDb', {
            'operation': 'insert', 'collection': 'Dossiers', 'fields': ','.join(fields), 'options': {}}, 520, 1.4))
    for i, email in enumerate(emails):
        mapper = email['mapper']
        sender = 'demande-rappel@orizia-courtage.fr' if kind == 'rappel' else 'dossier@orizia-courtage.fr'
        # Read the preparation node explicitly: MongoDB/SMTP replace their output.
        ref = "$('" + names[1] + "').first().json"
        to = '={{ ' + ref + '.profil_mail }}' if '{{' in mapper['to'][0] else mapper['to'][0]
        subject = re.sub(r'{{1\.(\w+)}}', lambda m: '{{ String(' + ref + '[' + json.dumps(m[1]) + ']).replace(/[\\r\\n]/g, " ") }}', mapper['subject'])
        if '{{' in subject:
            subject = '=' + subject
        nodes.append(node('Email ' + kind + (' client' if i else ' Cindy'), 'emailSend', {
            'fromEmail': sender, 'toEmail': to, 'subject': subject, 'emailFormat': 'html',
            'html': '={{ ' + ref + f'.html{i}' + ' }}', 'options': {'appendAttribution': False}}, len(nodes) * 260, 2.1))
    if kind == 'rac':
        client = next(n for n in nodes if n['name'] == 'Email rac client')
        email_source = (OUT / 'rac-client-email.js').read_text(encoding='utf-8')
        client['parameters']['html'] = "={{ (() => { const p = $('Preparer rac').first().json;\n" + email_source + "\n})() }}"
    nodes.append(node('Confirmer ' + kind, 'respondToWebhook', {
        'respondWith': 'json', 'responseBody': '{"success":true}', 'options': {'responseCode': 200}}, len(nodes) * 260, 1.4))
    connections = {a['name']: {'main': [[{'node': b['name'], 'type': 'main', 'index': 0}]]}
                   for a, b in zip(nodes, nodes[1:])}
    note = '## Connexions à renseigner avant publication\n'
    note += 'SMTP : ' + ('demande-rappel@orizia-courtage.fr' if kind == 'rappel' else 'dossier@orizia-courtage.fr (les deux emails)')
    if kind == 'rac':
        note += '\nMongoDB : base OriziaDB, collection Dossiers.'
    note += '\nClé HTTP : credential Orizia - Webhook prive.\nNe pas tester avec des clients réels : ce workflow envoie des emails.\nConserver Make jusqu’à validation.'
    sticky = node('Configuration ' + kind, 'stickyNote', {'content': note, 'height': 260, 'width': 460}, 0)
    sticky['position'] = [0, -320]
    nodes.append(sticky)
    result = {'id': 'orizia' + kind.capitalize() + 'Migration', 'name': 'Orizia - ' + ('Dossier RAC' if kind == 'rac' else 'Demande de rappel'),
              'active': False, 'nodes': nodes, 'connections': connections,
              'settings': {'executionOrder': 'v1', 'saveDataSuccessExecution': 'none',
                           'saveDataErrorExecution': 'none', 'saveManualExecutions': False, 'executionTimeout': 60}}
    (OUT / f'orizia-{kind}.json').write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    return result


if __name__ == '__main__':
    OUT.mkdir(parents=True, exist_ok=True)
    download = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.home() / 'Downloads'
    results = []
    for filename, kind in [('Webhook - Rappel.blueprint.json', 'rappel'), ('Webhook Formulaire RAC.blueprint.json', 'rac')]:
        results.append(convert(json.loads((download / filename).read_text(encoding='utf-8-sig')), kind))
    (OUT / 'workflows.json').write_text(json.dumps(results, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print('Generated two inactive workflows in', OUT)
