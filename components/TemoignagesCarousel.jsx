'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const TEMOIGNAGES = [
  { auteur: 'Regis Bidounga', poste: 'Directeur Indemnisation', date: 'Octobre 2025', texte: "J'ai eu l'occasion de rencontrer à plusieurs reprises Cindy URBANSKY dans le cadre de nos échanges professionnels. J'ai toujours apprécié son investissement, sa rigueur et son professionnalisme exemplaire. Elle fait preuve d'un réel engagement dans ses missions et d'une grande fiabilité dans le suivi des dossiers. C'est une personne sur qui l'on peut compter.", initiale: 'R', color: '#16a34a' },
  { auteur: 'Laurent Eliet', poste: 'Directeur du développement Commercial — AssurOne / Netvox', date: 'Septembre 2025', texte: "Un enthousiasme débordant, de l'énergie à revendre et un professionnalisme exacerbé. Cindy c'est le \"perfect combo\" du crédit !", initiale: 'L', color: 'var(--orizia-primary)' },
  { auteur: 'Francois Boileau', poste: 'Gérant Cabinet FB Finances — Crédit Libra', date: 'Septembre 2025', texte: "J'ai la chance de travailler régulièrement avec Cindy. Son sens de l'organisation, sa rigueur et sa capacité à anticiper les besoins de ses partenaires font d'elle une alliée précieuse. Toujours à l'écoute et proactive, elle sait faire avancer les demandes avec bienveillance et toute la positivité qu'elle dégage. Je la recommande vivement 👍", initiale: 'F', color: '#d97706' },
  { auteur: 'Maureen B.', poste: 'Chargée de recouvrement', date: 'Août 2025', texte: "Dynamique, Cindy a le commerce dans la peau, elle est à l'écoute, toujours bienveillante.", initiale: 'M', color: '#0369a1' },
  { auteur: 'Vincent Bord', poste: 'Directeur des Assurances — Premista', date: 'Août 2025', texte: "J'ai la chance de collaborer avec Cindy, et ne peux que souligner la valeur qu'elle apporte au groupe ainsi qu'à ses partenaires. Avec une solide expérience dans le rachat de crédit, elle combine une expertise technique pointue et une réelle proximité avec les courtiers, qu'elle accompagne toujours avec écoute et efficacité.", initiale: 'V', color: '#7c3aed' },
  { auteur: 'Astrid BOUDRY', poste: 'Direction Marketing Communication', date: 'Août 2025', texte: "J'ai eu l'occasion de travailler avec Cindy chez Premista et j'en garde un excellent souvenir. Elle fait preuve d'un grand professionnalisme ; elle est réactive et très agréable dans les échanges. Cindy allie efficacité, bonne humeur et sens du relationnel.", initiale: 'A', color: '#dc2626' },
  { auteur: 'Anthony Pena', poste: 'Directeur Commercial des assurances — Premista', date: 'Août 2025', texte: "J'ai eu beaucoup de plaisir à travailler avec Cindy. Toujours souriante et disponible, elle sait créer une relation de confiance immédiate. Son professionnalisme s'accompagne d'une grande bienveillance, ce qui fait d'elle une collègue précieuse.", initiale: 'A', color: '#d97706' },
  { auteur: 'Mathieu Cassidanius', poste: 'Directeur du développement — Solutions alternatives de financement', date: 'Août 2025', texte: "J'ai le plaisir de collaborer régulièrement avec Cindy sur des projets communs. Son engagement, sa motivation et sa rigueur en font une partenaire de confiance. Travailler avec Cindy, c'est avancer efficacement tout en gardant le sourire.", initiale: 'M', color: '#16a34a' },
  { auteur: 'DIRAISON Mickael', poste: 'Directeur général — BUDGETLYSS', date: 'Août 2025', texte: "Professionnelle, tenace et grande connaissance du métier de l'intermédiation bancaire.", initiale: 'D', color: 'var(--orizia-primary)' },
  { auteur: 'Audrey JENTRELLE', poste: 'Groupe Premista — Mentor', date: 'Août 2025', texte: "Elle dispose d'un sens du commerce particulièrement affûté et d'une excellente connaissance du milieu des IOB. Toujours disponible et à l'écoute, elle fait preuve d'une grande conscience professionnelle. Sa capacité naturelle à créer rapidement des liens authentiques est une force précieuse.", initiale: 'A', color: '#7c3aed' },
  { auteur: 'Lynda Aïssani', poste: 'Indépendante — Prévoyance & Assurance', date: 'Août 2025', texte: "Cindy est toujours présente, à l'écoute et de bon conseil.", initiale: 'L', color: '#0369a1' },
  { auteur: 'Yannis LE GARF', poste: 'Directeur Développement Franchise — VOUSFINANCER', date: 'Août 2025', texte: "J'ai eu le plaisir de travailler avec Cindy dans le cadre d'un partenariat. C'est une personne solaire, qui ne manque pas d'énergie et sur qui vous pouvez compter.", initiale: 'Y', color: '#d97706' },
  { auteur: 'Aurélia Simon', poste: 'Responsable partenariats — Crédit Agricole Consumer Finance', date: 'Août 2025', texte: "Je recommande vivement Cindy : une professionnelle passionnée, experte en intermédiation et animation de réseau. Clarté, énergie et expertise font d'elle une véritable référence.", initiale: 'A', color: '#16a34a' },
  { auteur: 'Nicolas RICHARD', poste: 'Développement de partenariats — Finance & Habitat', date: 'Août 2025', texte: "Cindy est une personne professionnelle avec un grand sens de la communication et qui a une parfaite connaissance du domaine du courtage. Je vous invite à la contacter.", initiale: 'N', color: 'var(--orizia-primary)' },
  { auteur: 'Anne-Charlotte Delplace', poste: 'Consultante ADP', date: 'Août 2025', texte: "Cindy est une manager dynamique, positive et qui sait animer son équipe au quotidien pour performer. J'ai apprécié tant ses qualités professionnelles qu'humaines.", initiale: 'A', color: '#dc2626' },
  { auteur: 'Jérôme Cusanno', poste: 'Juriste spécialisé IOBSP et Assurance', date: 'Août 2025', texte: "Quand je lui ai proposé le poste de présidente du conseil de surveillance de l'AFIB, c'était parce que je savais qu'elle connaissait parfaitement le secteur. Cindy est un fin stratège, à l'écoute et sait garder un sang froid dans les situations tendues. L'avoir dans son équipe est assurément une forte valeur ajoutée.", initiale: 'J', color: '#7c3aed' },
  { auteur: 'Marie-Pascale Tribotté', poste: "l'Adresse Assure", date: 'Août 2025', texte: "Son leadership repose autant sur son expertise métier que sur ses qualités humaines : écoute, bienveillance et exigence constructive. Cindy est une professionnelle inspirante, capable de transformer des idées en actions concrètes.", initiale: 'M', color: '#0369a1' },
  { auteur: 'Magali DEBOFFLE', poste: 'Expert en financement — JLConseils', date: 'Août 2025', texte: "Cindy est une partenaire efficace et très disponible. Elle est de plus particulièrement agréable et pédagogue. Je la recommande vivement !", initiale: 'M', color: '#d97706' },
  { auteur: 'Alexandre D.', poste: 'Directeur Opérationnel ASC Crédits — Groupe VILAVI', date: 'Août 2025', texte: "Je recommande Cindy pour son professionnalisme, sa capacité d'écoute et son management. Professionnelle sérieuse et assidue.", initiale: 'A', color: 'var(--orizia-primary)' },
];

const INTERVAL = 5000;

export default function TemoignagesCarousel() {
  const total = TEMOIGNAGES.length;
  const [idx, setIdx]       = useState(0);   // index du premier visible
  const [sliding, setSliding] = useState(false);
  const [paused, setPaused]   = useState(false);
  const [visible, setVisible] = useState(3);
  const timerRef = useRef(null);

  // Responsive
  useEffect(() => {
    const check = () => setVisible(window.innerWidth < 640 ? 1 : 3);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Avance d'un cran (toujours vers la gauche)
  const advance = useCallback(() => {
    if (sliding) return;
    setSliding(true);
    // Après la durée de la transition CSS, on met à jour l'index et on reset
    setTimeout(() => {
      setIdx(i => (i + 1) % total);
      setSliding(false);
    }, 420);
  }, [sliding, total]);

  const goBack = useCallback(() => {
    if (sliding) return;
    // Pour "reculer" on avance de (total - 1) — même animation vers la gauche
    setSliding(true);
    setTimeout(() => {
      setIdx(i => (i - 1 + total) % total);
      setSliding(false);
    }, 420);
  }, [sliding, total]);

  // Auto-play
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(advance, INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [paused, advance]);

  // On affiche visible + 1 cartes dans la piste (la +1 entre depuis la droite)
  const trackCards = Array.from({ length: visible + 1 }, (_, i) => TEMOIGNAGES[(idx + i) % total]);

  return (
    <div
      className="tc3-wrap"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Fenêtre avec overflow hidden */}
      <div className="tc3-viewport">
        {/* Piste qui se translate */}
        <div
          className="tc3-track"
          style={{
            '--visible': visible,
            transform: sliding ? `translateX(calc(-100% / ${visible}))` : 'translateX(0)',
            transition: sliding ? 'transform 0.42s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          }}
        >
          {trackCards.map((t, i) => (
            <div key={`${idx}-${i}`} className="tc3-card">
              <div className="tc3-quote">❝</div>
              <p className="tc3-texte">{t.texte}</p>
              <div className="tc3-auteur-row">
                <div className="tc3-avatar" style={{ background: t.color }}>{t.initiale}</div>
                <div>
                  <div className="tc3-auteur-nom">{t.auteur}</div>
                  <div className="tc3-auteur-poste">{t.poste}</div>
                  <div className="tc3-auteur-date">{t.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contrôles */}
      <div className="tc3-controls">
        <button className="tc3-arrow" onClick={goBack} aria-label="Précédent">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M6.5 1.5L3 5l3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="tc3-dots">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              className={`tc3-dot${i === idx ? ' tc3-dot--active' : ''}`}
              onClick={() => { if (!sliding) setIdx(i); }}
              aria-label={`Avis ${i + 1}`}
            />
          ))}
        </div>
        <button className="tc3-arrow" onClick={advance} aria-label="Suivant">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M3.5 1.5L7 5l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
