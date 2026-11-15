'use client';
import { useEffect, useState } from 'react';
import { creditWarning } from '@/lib/credit-notice.mjs';

// Mention légale du crédit, à jour le jour même où la formule change (20 novembre 2026),
// y compris sur les pages générées avant cette date.
export default function CreditWarning() {
  const [text, setText] = useState(() => creditWarning());
  useEffect(() => { setText(creditWarning()); }, []);
  return <span suppressHydrationWarning>{text}</span>;
}
