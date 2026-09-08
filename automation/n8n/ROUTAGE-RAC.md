# Routage des emails RAC

Règle demandée le 8 septembre 2026 : tous les dossiers restent enregistrés dans MongoDB et notifiés à `cindy.urbansky@orizia-courtage.fr`. L'email client n'est envoyé qu'aux profils à gros potentiel.

| Potentiel | Segments | Email Cindy | Email client |
| --- | --- | --- | --- |
| Gros | Investisseur 1, Client projet premium 1–2, Trésorerie 1–7, Pro Contraint 1–5 | Oui | Oui |
| Petit | IR, Petit Pro, Client projet, Pro Consommateur, Autre, LOC, BDF, TNS | Oui | Non |

Le segment envoyé par le formulaire est conservé pour le routage, avec priorité au fichage BDF, puis aux professions TNS, puis au statut locataire/hébergé. Les seuils financiers de classement du formulaire ne changent pas. Un segment absent ou inconnu est traité comme petit potentiel pour l'envoi des emails.

L'objet interne prend la forme `[GROS POTENTIEL] Trésorerie 4 | Prénom Nom | Dossier` ou `[PETIT POTENTIEL] LOC | Prénom Nom | Dossier`. Un encadré dans le corps rappelle le potentiel, le segment et si l'email client est prévu. Ces indications internes n'apparaissent pas dans l'email client.

Chemin du workflow : réception → préparation → MongoDB → email Cindy → condition `Email client autorise`. La sortie vraie envoie l'email client puis confirme le webhook ; la sortie fausse confirme directement le webhook. Les deux branches renvoient le même succès au formulaire. Les erreurs MongoDB/SMTP conservent leur comportement existant.

Source : `rac-routing.js`, incorporée par `scripts/convert-make-to-n8n.py` dans `Preparer rac`. Les champs de routage ne sont pas ajoutés aux 39 champs MongoDB. Les connexions et paramètres SMTP de production sont conservés lors de la mise à jour. Sauvegarde serveur : `~/n8n/rac-routing-before.json`.

Validation sans envoi : 14 tests locaux couvrent les segments, priorités, échappement et chemins du workflow ; 13 cas ont aussi été vérifiés avec les moteurs Expression, Filter et IF de n8n installés sur le serveur. Aucun prospect réel n'a été utilisé et aucun email de test n'a été envoyé pour cette modification.

```sh
node --test scripts/test-rac-routing.mjs scripts/test-rac-client-email.mjs scripts/test-n8n-migration.mjs
```
