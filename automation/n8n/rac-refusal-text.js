// Plain-text alternative to rac-refusal-email.js; p is the prepared document.
const line = value => String(value ?? '').replace(/[\r\n\u0000-\u001f\u007f]/g, ' ');
return `ORIZIA COURTAGE

Bonjour ${line(p.profil_prenom)},

Après examen des informations communiquées, je ne suis malheureusement pas en mesure de donner une suite favorable à votre demande de regroupement de crédits à ce jour.

Votre situation peut évoluer. En cas de changement de situation, vous pouvez revenir vers moi pour effectuer un nouveau test : je serai ravie de refaire le point avec vous.

Référence de votre demande : ${line(p.numero_dossier)}

Cindy URBANSKY
Fondatrice & Gérante
Courtier indépendant en crédit, assurance & patrimoine
07 77 25 97 06
cindy.urbansky@orizia-courtage.fr

Site web : https://www.orizia-courtage.fr/
Rendez-vous : https://cal.com/cindy-urbansky/rendez-vous
Enregistrer mon contact : https://www.orizia-courtage.fr/cindy-urbansky.vcf`;
