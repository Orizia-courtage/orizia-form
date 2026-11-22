// Information RGPD au moment de la collecte (art. 13 et 14), affichée sous chaque formulaire.
// Le détail (finalités, bases légales, durées, droits) est dans la politique de confidentialité.
export default function PrivacyNotice({ children, style }) {
  return (
    <p className="privacy-notice" style={style}>
      {children || 'Vos coordonnées sont utilisées par Orizia Courtage uniquement pour répondre à votre demande, puis conservées 3 ans au plus sans suite donnée.'}{' '}
      Vous pouvez y accéder, les faire rectifier ou effacer :{' '}
      <a href="/confidentialite" target="_blank" rel="noopener noreferrer">politique de confidentialité</a>.
    </p>
  );
}
