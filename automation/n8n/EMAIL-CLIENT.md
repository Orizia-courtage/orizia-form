# Email RAC client — Orizia

Le 7 septembre 2026, le HTML du nœud `Email rac client` a été remplacé dans le workflow de production `oriziaRacMigration`, puis publié. Une sauvegarde préalable est conservée sur le serveur dans `~/n8n/rac-before-design.json`. Les destinataires, connexions SMTP, autres nœuds et données MongoDB sont conservés.

La source maintenable est `rac-client-email.js`. Le convertisseur l'intègre directement dans l'expression HTML du nœud client ; l'ancien `html1` du nœud de préparation reste présent pour préserver ce nœud, mais n'est plus utilisé par l'email client. Ne pas réimporter les modèles locaux sans préserver les connexions configurées sur le serveur.

La présentation reprend les couleurs du site (#432828, #F5F3EF, #C9A96E), le logo Orizia et la photo originale `photo-cindy.webp`. Les images passent par le service d'images du site, vérifié accessible publiquement et renvoyant du JPEG sans en-tête Accept WebP. Le texte et les coordonnées restent lisibles lorsque les images sont bloquées.

L'email confirme la réception, rappelle l'objectif et explique les prochaines étapes sans promettre une offre de financement ni un délai ferme. Le bouton principal ouvre la fiche contact de Cindy ; le téléphone et l'email sont cliquables. Les données personnelles injectées sont échappées.

Validation : 10 tests automatiques (modèle client et migration), expression rendue par le moteur n8n du serveur, aperçus Chromium à 320, 375, 390, 600 et 1000 px sans débordement. Tableaux de présentation, styles essentiels en ligne et largeur Outlook conditionnelle. Ces contrôles ne remplacent pas un test dans chaque logiciel de messagerie. Aucun email de test n'a été envoyé lors de cette refonte.

Les aperçus avec des données fictives se trouvent dans `artifacts/email-rac/`.

## Identité et délivrabilité — 8 septembre 2026

Les trois nœuds SMTP RAC/rappel affichent désormais `Orizia Courtage` tout en conservant leur adresse d'envoi. Le client reçoit un message multipart texte/HTML, avec `Reply-To: Cindy Urbansky <cindy.urbansky@orizia-courtage.fr>`, un objet descriptif et la vérification des certificats activée. Le bouton « Ajouter Cindy à mes contacts » ouvre la VCF publique ; l'utilisateur confirme l'enregistrement sur son téléphone. L'ajout n'est pas automatique.

Le 8 septembre à 06:00:56 UTC, un seul test autorisé a été envoyé à la boîte Orange du propriétaire via l'implémentation Send Email installée dans n8n, le credential SMTP existant et les paramètres du nouveau nœud client. Transport OVH `ssl0.ovh.net:465`, TLS implicite. Réponse SMTP : `250 2.0.0 Ok: 14033 bytes queued as 59C39C2604`. Aucun enregistrement MongoDB ni email à Cindy n'a été déclenché. L'acceptation SMTP ne prouve pas le classement en boîte de réception ni la validation DKIM du message reçu.

DNS observé : SPF `v=spf1 include:mx.ovh.com -all`, DMARC `v=DMARC1; p=none;`, deux sélecteurs DKIM OVH (`ovhmo-selector-1` et `ovhmo-selector-2`) avec clés publiques résolues. Leur présence ne suffit pas à prouver que chaque message est correctement signé et aligné. Aucun DNS n'a été modifié ; un passage DMARC à `reject` nécessiterait d'abord de contrôler tous les émetteurs du domaine, dont les formulaires envoyant via Resend.

Orange exige une authentification SPF/DKIM/DMARC correcte : https://postmaster.orange.fr/. Pour diagnostiquer le classement du test, vérifier les en-têtes `Authentication-Results`, `DKIM-Signature` et `Return-Path` dans le message reçu. L'activation et les clés DKIM se gèrent chez le fournisseur d'envoi : https://docs.ovhcloud.com/fr/guides/web-cloud/domains/dns-zone-dkim. Ne pas fabriquer de sélecteur ni ajouter un deuxième enregistrement SPF.

```sh
node --test scripts/test-rac-client-email.mjs scripts/test-n8n-migration.mjs
```
