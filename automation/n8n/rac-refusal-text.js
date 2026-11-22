// Plain-text alternative to rac-refusal-email.js; p is the prepared document.
const line = value => String(value ?? '').replace(/[\r\n\u0000-\u001f\u007f]/g, ' ');
return `ORIZIA COURTAGE

Bonjour ${line(p.profil_prenom)},

D’après les informations saisies dans le formulaire, votre demande de regroupement de crédits ne correspond pas, à ce jour, aux critères des établissements avec lesquels je travaille. Cette réponse a été établie automatiquement, à partir de la situation que vous avez déclarée (fichage Banque de France, statut, revenus et charges).

Vous pouvez me demander de réexaminer personnellement votre dossier, ou contester cette réponse : il vous suffit de répondre à cet e-mail.

Votre situation peut évoluer. En cas de changement de situation, vous pouvez revenir vers moi pour effectuer un nouveau test : je serai ravie de refaire le point avec vous.

Référence de votre demande : ${line(p.numero_dossier)}

Cindy URBANSKY
Fondatrice & Gérante
Courtier en crédit, assurance & patrimoine
07 77 25 97 06
cindy.urbansky@orizia-courtage.fr

Site web : https://www.orizia-courtage.fr/
Rendez-vous : https://cal.com/cindy-urbansky/rendez-vous
Enregistrer mon contact : https://www.orizia-courtage.fr/cindy-urbansky.vcf`;
