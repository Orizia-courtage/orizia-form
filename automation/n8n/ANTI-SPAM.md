# Protection des formulaires Orizia

Les deux routes `/api/orizia-form` et `/api/orizia-rappel` exigent une validation Turnstile côté serveur. La variable `TURNSTILE_SECRET_KEY`, déjà configurée dans Vercel Production et Preview, est obligatoire : une configuration absente ou une erreur Cloudflare ne laisse pas passer la demande.

Chaque jeton doit correspondre au domaine de la requête et à son action (`orizia_submit` ou `orizia_rappel`). Turnstile valide l'usage unique et l'expiration du jeton. Le rappel utilise un nouveau widget : il ne réutilise pas le jeton du formulaire. Les widgets sont nettoyés au changement d'étape, et renouvelables après une erreur ou une expiration.

Un formulaire transmis avec succès retourne une preuve signée valable deux heures. Le rappel exige cette preuve et les mêmes coordonnées et numéro de dossier. Elle utilise la clé serveur Turnstile avec un préfixe dédié ; aucune nouvelle variable Vercel n'est nécessaire. Elle ne contient pas les coordonnées et n'est pas envoyée à Make/n8n. Une rotation de la clé invalide les preuves en cours.

Les requêtes JSON dépassant 32 Kio, les structures inattendues et les appels provenant d'une autre origine sont refusés. Les doubles clics sont bloqués dans l'interface. Une erreur 429 affiche une invitation à patienter.

## Règle Vercel

Le propriétaire a confirmé la correction et l'enregistrement de cette règle dans Vercel le 7 septembre 2026.

La condition **Request Path Equals `/api/`** ne couvre pas les routes ci-dessus.

Dans la règle `FORMULAIRE RATE LIMITE`, choisir :

- Request Path → **Starts With** → **`/api/orizia-`**.
- Conserver **Fixed Window**, **600 seconds**, **20 requests**, clé **IP Address**.
- Conserver **Too Many Requests (429)** et enregistrer la règle avec **Save Rule**.

Ce réglage du tableau de bord n'est pas modifié par le push Git. La limite est appliquée par Vercel avant l'exécution des routes ; le code n'ajoute pas un compteur en mémoire qui serait incohérent entre les instances serverless. Ne pas combiner les deux chemins exacts avec AND : aucune requête ne pourrait satisfaire cette condition.

## Limites

La preuve de rappel n'est pas à usage unique et aucune déduplication persistante des dossiers n'est ajoutée. Un utilisateur obtenant de nouveaux jetons peut réessayer dans les limites du pare-feu. Ces protections réduisent les abus mais ne garantissent pas l'absence totale de spam.

Les anciens onglets ouverts avant ce déploiement peuvent devoir être rechargés pour obtenir un widget avec l'action attendue. Les domaines Preview doivent être autorisés dans la configuration Cloudflare du sitekey pour fonctionner. La validation locale exige des clés de test Cloudflare et un domaine/action cohérents ; il n'existe pas de contournement automatique en développement.

Tests sans email ni insertion MongoDB :

```sh
node --test scripts/test-form-protection.mjs scripts/test-n8n-migration.mjs
```
