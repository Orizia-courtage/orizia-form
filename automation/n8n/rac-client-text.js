// Plain-text alternative to rac-client-email.js; p is the prepared document.
const line = value => String(value ?? '').replace(/[\r\n\u0000-\u001f\u007f]/g, ' ');
return `ORIZIA COURTAGE
Votre demande est enregistrée
Référence : ${line(p.numero_dossier)}

Bonjour ${line(p.profil_prenom)},

Merci de m'avoir confié votre demande de regroupement de crédits. J'ai bien reçu les informations de votre formulaire et je vais prendre le temps d'étudier votre situation.

Votre objectif : ${line(p.Raison || 'Regroupement de crédits')}

ET MAINTENANT ?
1. J'étudie votre demande : je fais le point sur vos informations et votre objectif.
2. Nous échangeons sur votre projet : je reviens vers vous pour préciser votre besoin et répondre à vos questions.
3. Je vous explique les suites possibles : selon votre situation, nous examinons les possibilités d'accompagnement et les prochaines démarches.

POUR RECONNAÎTRE MON APPEL
Enregistrez mon numéro : 07 77 25 97 06.
Ajouter Cindy à mes contacts :
https://www.orizia-courtage.fr/cindy-urbansky.vcf
Sur votre téléphone, ouvrez la fiche contact puis enregistrez-la dans votre répertoire.

Une précision à ajouter ? Répondez simplement à cet email ou appelez-moi directement.
Au plaisir d'échanger avec vous,

Cindy Urbansky
Orizia Courtage — Financement & patrimoine
07 77 25 97 06
cindy.urbansky@orizia-courtage.fr
https://www.orizia-courtage.fr/

Cet email confirme la réception de votre formulaire. Il ne constitue pas un accord de financement.
Confidentialité : https://www.orizia-courtage.fr/confidentialite
Vous n'êtes pas à l'origine de cette demande ? Prévenez-moi simplement par retour d'email.`;
