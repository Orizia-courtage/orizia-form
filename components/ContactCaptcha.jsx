'use client';
import { useEffect, useRef, useState } from 'react';
import { mountTurnstile } from '@/lib/turnstile-lifecycle.mjs';

export default function ContactCaptcha({ onToken }) {
  const element = useRef(null);
  const [error, setError] = useState('');
  useEffect(() => {
    onToken('');
    if (!document.getElementById('cf-ts')) {
      const script = document.createElement('script');
      script.id = 'cf-ts';
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      document.head.appendChild(script);
    }
    const cleanup = mountTurnstile(element.current, 'orizia_contact', '0x4AAAAAACu8a5g2pFEtNqxD', onToken, setError);
    return () => { cleanup(); onToken(''); };
  }, [onToken]);
  return <div>
    <div ref={element}/>
    {error && <p role="alert">{error}</p>}
    {error && <button type="button" onClick={() => window.dispatchEvent(new CustomEvent('orizia-turnstile-reset', { detail: 'orizia_contact' }))}>Relancer la vérification</button>}
  </div>;
}
