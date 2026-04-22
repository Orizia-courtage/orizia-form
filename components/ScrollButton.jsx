'use client';

/**
 * ScrollButton — remplace <Link href="#section-id"> pour le scroll ancre.
 * Utilise scrollIntoView avec behavior:'smooth' à chaque clic,
 * ce qui fonctionne même si l'utilisateur est déjà scrollé vers la cible.
 */
export default function ScrollButton({ targetId, className, style, children }) {
  const handleClick = (e) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <button type="button" className={className} style={style} onClick={handleClick}>
      {children}
    </button>
  );
}
