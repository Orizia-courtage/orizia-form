# Email RAC client — Orizia

Le 7 septembre 2026, le HTML du nœud `Email rac client` a été remplacé dans le workflow de production `oriziaRacMigration`, puis publié. Une sauvegarde préalable est conservée sur le serveur dans `~/n8n/rac-before-design.json`. Les destinataires, connexions SMTP, autres nœuds et données MongoDB sont conservés.

La source maintenable est `rac-client-email.js`. Le convertisseur l'intègre directement dans l'expression HTML du nœud client ; l'ancien `html1` du nœud de préparation reste présent pour préserver ce nœud, mais n'est plus utilisé par l'email client. Ne pas réimporter les modèles locaux sans préserver les connexions configurées sur le serveur.

La présentation reprend les couleurs du site (#432828, #F5F3EF, #C9A96E), le logo Orizia et la photo originale `photo-cindy.webp`. Les images passent par le service d'images du site, vérifié accessible publiquement et renvoyant du JPEG sans en-tête Accept WebP. Le texte et les coordonnées restent lisibles lorsque les images sont bloquées.

L'email confirme la réception, rappelle l'objectif et explique les prochaines étapes sans promettre une offre de financement ni un délai ferme. Le bouton principal ouvre la fiche contact de Cindy ; le téléphone et l'email sont cliquables. Les données personnelles injectées sont échappées.

Validation : 10 tests automatiques (modèle client et migration), expression rendue par le moteur n8n du serveur, aperçus Chromium à 320, 375, 390, 600 et 1000 px sans débordement. Tableaux de présentation, styles essentiels en ligne et largeur Outlook conditionnelle. Ces contrôles ne remplacent pas un test dans chaque logiciel de messagerie. Aucun email de test n'a été envoyé lors de cette refonte.

Les aperçus avec des données fictives se trouvent dans `artifacts/email-rac/`.

```sh
node --test scripts/test-rac-client-email.mjs scripts/test-n8n-migration.mjs
```
