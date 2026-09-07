# Migration Make vers n8n — Orizia

Les deux workflows ont été préparés à partir des exports Make fournis, puis importés **non publiés** dans n8n. Les identifiants MongoDB et SMTP ne figurent pas dans les exports : les renseigner dans n8n avant la bascule. Aucun email de test n'a été envoyé et aucun dossier n'a été inséré.

## Workflows

- [Demande de rappel](https://serveur-antoine.tail070809.ts.net/workflow/oriziaRappelMigration) : webhook → préparation du message → SMTP vers Cindy → réponse de succès.
- [Dossier RAC](https://serveur-antoine.tail070809.ts.net/workflow/oriziaRacMigration) : webhook → préparation → insertion des 39 champs dans `OriziaDB.Dossiers` → SMTP vers Cindy → SMTP vers le client → réponse de succès.

Les destinataires, objets, conditions et modèles HTML viennent des exports Make. Les données saisies sont échappées dans le HTML, mais restent intactes dans le document MongoDB. Les champs calculés MAF/EV/Revenu/Segment ne sont pas ajoutés à MongoDB, conformément au mapping Make. Les traces d'exécution contenant les données des prospects ne sont pas conservées par ces workflows. Les erreurs restent renvoyées à l'appelant.

Les erreurs SMTP ou MongoDB interrompent le workflow. Une erreur après insertion MongoDB peut donc laisser un dossier enregistré sans tous ses emails, comme avec le scénario séquentiel Make. Ne pas relancer aveuglément une demande réelle. Il n'y a pas de déduplication supplémentaire ni de nouvelle collection.

## Accès

- Éditeur privé : `https://serveur-antoine.tail070809.ts.net/` (Tailscale nécessaire).
- Entrée publique : `https://serveur-antoine.tail070809.ts.net:8443` (Funnel).
- Seuls `POST /webhook/orizia-rac` et `POST /webhook/orizia-rappel` sont autorisés.
- Les deux requièrent l'en-tête `X-Orizia-Webhook-Key`. Il est vérifié par le proxy et le credential n8n `Orizia - Webhook prive`.
- Les autres routes, dont `/`, `/rest/`, `/signin` et `/webhook-test/`, sont bloquées sur l'entrée publique.

La clé n'est pas dans Git ni dans le JavaScript du navigateur. Elle figure dans `~/n8n/orizia-vercel.env` sur le serveur, ainsi que dans le fichier local ignoré `.env.n8n.local` une fois transféré. Ne pas publier ces fichiers.

## Connexions à renseigner dans n8n

1. Dans le nœud MongoDB du workflow RAC, créer/sélectionner une connexion à la base **OriziaDB**, puis vérifier la connexion. Si MongoDB Atlas filtre les IP, autoriser l'IP de sortie Internet du serveur ; l'adresse Tailscale 100.64.114.81 n'est pas cette IP.
2. Dans les deux nœuds Email du workflow RAC, créer/sélectionner le SMTP de **dossier@orizia-courtage.fr** (hôte, port, TLS, identifiant et mot de passe de la connexion Make).
3. Dans le workflow Rappel, sélectionner le SMTP de **demande-rappel@orizia-courtage.fr**.
4. Le credential Header Auth est déjà créé ; ne pas le remplacer par une clé différente de celle de Vercel.

## Validation avant bascule

Les tests automatiques locaux n'envoient aucun email et n'appellent pas MongoDB.
Pour une validation réelle, utiliser une copie de chaque workflow, une collection MongoDB de test et une boîte de test comme destinataire pour TOUS les emails. Utiliser l'adresse de test privée n8n depuis un poste connecté à Tailscale : les chemins webhook-test ne sont volontairement pas exposés sur Funnel. Ne pas utiliser les données d'un vrai prospect.

Après validation et accord pour la bascule :

1. Publier les deux workflows de production dans n8n.
2. Déployer les modifications de ce dépôt `CINDY/orizia-form` sur Vercel.
3. Ajouter dans Vercel les trois variables du fichier `.env.n8n.local` : `N8N_WEBHOOK_SUBMIT_URL`, `N8N_WEBHOOK_RAPPEL_URL`, `N8N_WEBHOOK_SECRET`, puis redéployer.
4. Vérifier une soumission contrôlée et un rappel, puis désactiver les scénarios Make seulement après confirmation de réception.

Sans variables N8N, les routes continuent d'utiliser les variables MAKE existantes. Si une URL N8N est renseignée mais que la clé manque, la route échoue explicitement. Aucun repli automatique vers Make après un échec n8n, afin d'éviter des doublons.

## Retour à Make

Retirer les variables `N8N_WEBHOOK_SUBMIT_URL` et `N8N_WEBHOOK_RAPPEL_URL` de Vercel, vérifier les variables `MAKE_WEBHOOK_SUBMIT_URL` et `MAKE_WEBHOOK_RAPPEL_URL`, puis redéployer. Conserver les scénarios Make prêts jusqu'à validation définitive. Ne pas lancer les deux circuits simultanément pour le même formulaire.

## Maintenance serveur

Le service Docker `orizia-gateway` et `~/n8n/orizia-gateway.conf` filtrent l'accès. La configuration contient la clé et doit rester privée. Sauvegarder `compose.yaml`, `.env`, `data/`, `orizia-gateway.conf`, `orizia-webhook-secret.txt` et `orizia-vercel.env` ensemble.

Pour fermer l'entrée publique uniquement : `sudo tailscale funnel --https=8443 off`.

## Vérifications et régénération

```powershell
python scripts/convert-make-to-n8n.py
node --test scripts/test-n8n-migration.mjs
npx eslint app/api/orizia-form/route.js app/api/orizia-rappel/route.js lib/automation-webhook.mjs scripts/test-n8n-migration.mjs
npm run build
```

Le convertisseur lit les deux fichiers blueprint du dossier Downloads, sans exécuter leurs modules. Ne pas réimporter les JSON après avoir configuré les connexions dans n8n : cela écraserait les modifications des workflows.
