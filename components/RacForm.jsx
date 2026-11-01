'use client';

// Formulaire de regroupement de crédits affiché sur la page.
// Par défaut : la conversation avec Cindy. L'ancien formulaire reste disponible :
//  - en ajoutant ?formulaire=classique à l'adresse de la page ;
//  - ou partout, en passant FORMULAIRE_RAC à 'classique' ci-dessous.
import { useEffect, useState } from 'react';
import RacConversation from '@/components/RacConversation';
import dynamic from 'next/dynamic';

// Chargé seulement s'il est demandé : il embarque des bibliothèques lourdes.
const OriziaFormClassique = dynamic(() => import('@/components/OriziaFormClassique'), { ssr: false });

const FORMULAIRE_RAC = 'conversation'; // 'conversation' ou 'classique'

export default function RacForm() {
  const [mode, setMode] = useState(FORMULAIRE_RAC);
  useEffect(() => {
    const asked = new URLSearchParams(window.location.search).get('formulaire');
    if (asked === 'classique' || asked === 'conversation') setMode(asked);
  }, []);
  return mode === 'classique' ? <OriziaFormClassique /> : <RacConversation />;
}
