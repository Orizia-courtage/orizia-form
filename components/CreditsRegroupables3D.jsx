'use client';

// « Quels crédits peut-on regrouper ? » en 3D.
// Six blocs (un par type de crédit) flottent ; chacun s'avance tour à tour avec son
// explication, puis ils se rassemblent et fusionnent en un seul bloc : « 1 seul crédit ».
// Three.js n'est chargé qu'à l'approche de la section ; sans WebGL ou si l'utilisateur
// préfère réduire les animations, la liste classique s'affiche.

import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/Icon';
import { ICONS } from '@/components/icons/iconData';
import '@/app/credits-3d.css';

const PALETTE = [
  { bg: '#6bb69b', fg: '#1b1d1a' },
  { bg: '#b3ddcb', fg: '#1b1d1a' },
  { bg: '#e9d9a8', fg: '#1b1d1a' },
  { bg: '#f2f4f1', fg: '#1b1d1a' },
  { bg: '#3e7f68', fg: '#ffffff' },
  { bg: '#dff1e9', fg: '#1b1d1a' },
];
const HOLD = 2.1;      // secondes par crédit mis en avant
const GATHER = 1.4;    // rassemblement
const MERGED = 3.2;    // bloc unique affiché
const SPLIT = 1.2;     // retour à l'état éparpillé

function iconSvg(name, color) {
  const parts = (ICONS[name] || []).map(([tag, attrs]) => `<${tag} ${Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ')}/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${parts}</svg>`;
}
const loadImage = (src) => new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src; });

// Face avant d'un bloc : pictogramme + intitulé, dessinés en haute définition.
async function faceTexture(THREE, { icon, label, sub }, { bg, fg }, font, w = 1024, h = 590) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d');
  g.fillStyle = bg; g.fillRect(0, 0, w, h);
  const glow = g.createRadialGradient(w * 0.85, h * 0.1, 0, w * 0.85, h * 0.1, w * 0.7);
  glow.addColorStop(0, 'rgba(255,255,255,.35)'); glow.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = glow; g.fillRect(0, 0, w, h);
  if (icon) {
    g.fillStyle = fg === '#ffffff' ? 'rgba(255,255,255,.14)' : 'rgba(255,255,255,.55)';
    g.beginPath(); g.roundRect(70, 70, 150, 150, 38); g.fill();
    const img = await loadImage(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(iconSvg(icon, fg))}`);
    if (img) g.drawImage(img, 97, 97, 96, 96);
  }
  g.fillStyle = fg; g.textBaseline = 'alphabetic';
  const words = label.split(' '); const lines = []; let line = '';
  g.font = `700 76px ${font}`;
  for (const word of words) { const t = line ? `${line} ${word}` : word; if (g.measureText(t).width > w - 140 && line) { lines.push(line); line = word; } else line = t; }
  lines.push(line);
  const top = icon ? 330 : h / 2 - (lines.length - 1) * 44;
  lines.forEach((l, i) => g.fillText(l, 70, top + i * 88));
  if (sub) { g.globalAlpha = 0.72; g.font = `500 40px ${font}`; g.fillText(sub, 70, top + lines.length * 88 + 6); g.globalAlpha = 1; }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
  return tex;
}

export default function CreditsRegroupables3D({ items }) {
  const wrap = useRef(null);
  const holder = useRef(null);
  const api = useRef(null);
  const [mode, setMode] = useState('pending'); // pending | 3d | list
  const [focus, setFocus] = useState(0);       // index mis en avant, -1 = fusionné

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const gl = (() => { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; } })();
    if (reduce || !gl) { setMode('list'); return; }
    let disposed = false; let cleanup = () => {};
    const io = new IntersectionObserver(async ([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const THREE = await import('three');
      const { RoundedBoxGeometry } = await import('three/examples/jsm/geometries/RoundedBoxGeometry.js');
      if (disposed) return;
      await document.fonts?.ready;
      cleanup = await mount(THREE, RoundedBoxGeometry);
      if (!disposed) setMode('3d');
    }, { rootMargin: '300px' });
    io.observe(wrap.current);

    async function mount(THREE, RoundedBoxGeometry) {
      const el = holder.current;
      const font = getComputedStyle(document.body).fontFamily || 'DM Sans, sans-serif';
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
      el.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
      camera.position.set(0, 0, 13);
      scene.add(new THREE.HemisphereLight(0xffffff, 0x1b1d1a, 1.4));
      const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(-4, 6, 8); scene.add(key);
      const rim = new THREE.DirectionalLight(0xb3ddcb, 1.6); rim.position.set(6, -2, -4); scene.add(rim);

      // Ombre douce sous les blocs (texture radiale, sans calcul d'ombres).
      const sc = document.createElement('canvas'); sc.width = sc.height = 128;
      const sg = sc.getContext('2d'); const rg = sg.createRadialGradient(64, 64, 0, 64, 64, 64);
      rg.addColorStop(0, 'rgba(0,0,0,.55)'); rg.addColorStop(1, 'rgba(0,0,0,0)'); sg.fillStyle = rg; sg.fillRect(0, 0, 128, 128);
      const shadowTex = new THREE.CanvasTexture(sc);

      const W = 2.7, H = 1.56, D = 0.3;
      const geo = new RoundedBoxGeometry(W, H, D, 5, 0.16);
      const faceGeo = new THREE.PlaneGeometry(W - 0.12, H - 0.12);
      const shadowGeo = new THREE.PlaneGeometry(W * 1.4, H * 0.7);
      const blocks = await Promise.all(items.map(async (it, i) => {
        const pal = PALETTE[i % PALETTE.length];
        const group = new THREE.Group();
        const body = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: pal.bg, roughness: 0.42, metalness: 0.05 }));
        const face = new THREE.Mesh(faceGeo, new THREE.MeshBasicMaterial({ map: await faceTexture(THREE, it, pal, font), toneMapped: false }));
        face.position.z = D / 2 + 0.002;
        const shadow = new THREE.Mesh(shadowGeo, new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false, opacity: 0.6 }));
        shadow.rotation.x = -Math.PI / 2; shadow.position.y = -H / 2 - 0.55;
        group.add(body, face); body.userData.index = i; face.userData.index = i;
        scene.add(group); scene.add(shadow);
        return { group, shadow, cur: { p: new THREE.Vector3(0, -6, 0), r: new THREE.Euler(), s: 0.001 }, seed: i * 1.7 };
      }));
      // Le bloc final : un seul crédit.
      const oneGeo = new RoundedBoxGeometry(W * 1.25, H * 1.25, D * 1.3, 6, 0.2);
      const one = new THREE.Group();
      const oneBody = new THREE.Mesh(oneGeo, new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.3, metalness: 0.08, emissive: '#b3ddcb', emissiveIntensity: 0.15 }));
      const oneFace = new THREE.Mesh(new THREE.PlaneGeometry(W * 1.25 - 0.14, H * 1.25 - 0.14), new THREE.MeshBasicMaterial({ map: await faceTexture(THREE, { icon: 'circle-check', label: '1 seul crédit', sub: '1 mensualité · 1 interlocuteur' }, { bg: '#ffffff', fg: '#1b1d1a' }, font), toneMapped: false }));
      oneFace.position.z = D * 0.65 + 0.002; one.add(oneBody, oneFace); one.scale.setScalar(0.001); scene.add(one);

      let aspect = 1; let mobile = false;
      function resize() {
        const w = el.clientWidth, h = el.clientHeight; aspect = w / h; mobile = w < 520;
        renderer.setSize(w, h, false); camera.aspect = aspect; camera.updateProjectionMatrix();
        // Recul de la caméra calculé pour que la grille de blocs remplisse la zone.
        const cols = mobile ? 2 : 3, rows = Math.ceil(items.length / cols);
        const needW = cols * (mobile ? 3.05 : 3.15) + 0.9, needH = rows * (mobile ? 2.05 : 2.25) + 1.2;
        const vHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
        camera.position.z = Math.max((needH / 2) / vHalf, (needW / 2) / (vHalf * aspect)) + 0.6;
      }
      resize();
      const ro = new ResizeObserver(resize); ro.observe(el);

      // Positions éparpillées : grille souple 3×2 (ordinateur) ou 2×3 (téléphone).
      const scattered = (i) => {
        const cols = mobile ? 2 : 3; const col = i % cols, row = Math.floor(i / cols);
        const rows = Math.ceil(items.length / cols);
        const gx = mobile ? 3.05 : 3.15, gy = mobile ? 2.05 : 2.25;
        return new THREE.Vector3((col - (cols - 1) / 2) * gx + Math.sin(i * 2.3) * 0.15, ((rows - 1) / 2 - row) * gy + Math.cos(i * 1.9) * 0.12, Math.sin(i * 3.1) * 0.6);
      };

      // Chronologie : chaque crédit s'avance, puis rassemblement, fusion, retour.
      const cycle = items.length * HOLD + GATHER + MERGED + SPLIT;
      let t = 0, last = performance.now(), visible = true, raf = 0, manual = null, manualUntil = 0;
      const pointer = new THREE.Vector2(0, 0), look = new THREE.Vector2(0, 0);
      const raycaster = new THREE.Raycaster();
      const ease = (x) => x * x * (3 - 2 * x);
      let lastFocus = null;

      function frame(now) {
        const dt = Math.min((now - last) / 1000, 0.05); last = now;
        if (!manual || now > manualUntil) { manual = null; t = (t + dt) % cycle; }
        const scatterEnd = items.length * HOLD;
        let phase, k = 0, focusIndex = -2;
        if (manual) { phase = 'scatter'; focusIndex = manual.index; }
        else if (t < scatterEnd) { phase = 'scatter'; focusIndex = Math.floor(t / HOLD); }
        else if (t < scatterEnd + GATHER) { phase = 'gather'; k = ease((t - scatterEnd) / GATHER); }
        else if (t < scatterEnd + GATHER + MERGED) { phase = 'merged'; }
        else { phase = 'split'; k = ease((t - scatterEnd - GATHER - MERGED) / SPLIT); }
        const shown = phase === 'merged' || (phase === 'gather' && k > 0.85) ? -1 : focusIndex >= 0 ? focusIndex : (phase === 'split' ? 0 : lastFocus);
        if (shown !== lastFocus && shown !== undefined) { lastFocus = shown; setFocus(shown); }

        const time = now / 1000;
        blocks.forEach((b, i) => {
          const home = scattered(i);
          const stack = new THREE.Vector3(0, (i - (items.length - 1) / 2) * 0.12, -i * 0.05);
          let p, r = new THREE.Euler(0, 0, 0), s = 1;
          const bob = Math.sin(time * 1.1 + b.seed) * 0.12;
          const scatterRot = new THREE.Euler(Math.sin(b.seed) * 0.18 + look.y * 0.15, Math.cos(b.seed * 1.3) * 0.32 + look.x * 0.25, Math.sin(b.seed * 0.7) * 0.06);
          if (phase === 'scatter') {
            p = home.clone(); p.y += bob; r = scatterRot;
            if (i === focusIndex) { p.z += 2.3; p.x *= 0.55; p.y = p.y * 0.6 + 0.15; r = new THREE.Euler(look.y * 0.12, look.x * 0.18, 0); s = 1.08; }
          } else if (phase === 'gather') {
            p = home.clone().lerp(stack, k); r = new THREE.Euler(scatterRot.x * (1 - k), scatterRot.y * (1 - k), scatterRot.z * (1 - k)); s = 1 - k * 0.15;
          } else if (phase === 'merged') {
            p = stack.clone(); s = 0.001;
          } else {
            p = stack.clone().lerp(home, k); p.y += bob * k; r = new THREE.Euler(scatterRot.x * k, scatterRot.y * k, scatterRot.z * k); s = Math.max(0.001, k);
          }
          // Lissage : les blocs glissent vers leur cible au lieu de sauter.
          const damp = 1 - Math.exp(-dt * (phase === 'gather' ? 14 : 7));
          b.cur.p.lerp(p, damp); b.cur.s += (s - b.cur.s) * damp;
          b.cur.r.set(b.cur.r.x + (r.x - b.cur.r.x) * damp, b.cur.r.y + (r.y - b.cur.r.y) * damp, b.cur.r.z + (r.z - b.cur.r.z) * damp);
          b.group.position.copy(b.cur.p); b.group.rotation.copy(b.cur.r); b.group.scale.setScalar(b.cur.s);
          b.shadow.position.x = b.cur.p.x; b.shadow.position.z = b.cur.p.z; b.shadow.position.y = b.cur.p.y - H / 2 - 0.5 - Math.max(0, bob);
          b.shadow.scale.setScalar(b.cur.s); b.shadow.material.opacity = 0.45 * b.cur.s;
        });
        const target = phase === 'merged' ? 1 : phase === 'gather' && k > 0.85 ? 0.6 : 0.001;
        const d1 = 1 - Math.exp(-dt * 9);
        one.scale.setScalar(one.scale.x + (target - one.scale.x) * d1);
        one.rotation.set(look.y * 0.15 + Math.sin(time * 0.8) * 0.04, look.x * 0.3 + Math.sin(time * 0.6) * 0.12, 0);
        one.position.y = Math.sin(time * 1.2) * 0.1;
        look.lerp(pointer, 1 - Math.exp(-dt * 4));
        renderer.render(scene, camera);
        if (visible) raf = requestAnimationFrame(frame);
      }
      raf = requestAnimationFrame(frame);

      // Pause hors écran.
      const vis = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) { last = performance.now(); cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); } }, { threshold: 0 });
      vis.observe(el);

      // Survol / toucher : le bloc visé s'avance et son explication s'affiche.
      const canvas = renderer.domElement;
      function pick(ev) {
        const rect = canvas.getBoundingClientRect();
        const v = new THREE.Vector2(((ev.clientX - rect.left) / rect.width) * 2 - 1, -((ev.clientY - rect.top) / rect.height) * 2 + 1);
        raycaster.setFromCamera(v, camera);
        const hit = raycaster.intersectObjects(blocks.map((b) => b.group), true)[0];
        return hit ? hit.object.userData.index : null;
      }
      const onMove = (ev) => {
        const rect = canvas.getBoundingClientRect();
        pointer.set(((ev.clientX - rect.left) / rect.width - 0.5) * 2, ((ev.clientY - rect.top) / rect.height - 0.5) * 2);
        if (ev.pointerType === 'mouse') { const i = pick(ev); canvas.style.cursor = i === null ? 'default' : 'pointer'; }
      };
      const onTap = (ev) => { const i = pick(ev); if (i !== null) show(i); };
      const onLeave = () => pointer.set(0, 0);
      canvas.addEventListener('pointermove', onMove); canvas.addEventListener('pointerup', onTap); canvas.addEventListener('pointerleave', onLeave);
      function show(i) { manual = { index: i }; manualUntil = performance.now() + 4500; t = i * HOLD; }
      api.current = { show };

      return () => {
        cancelAnimationFrame(raf); ro.disconnect(); vis.disconnect();
        canvas.removeEventListener('pointermove', onMove); canvas.removeEventListener('pointerup', onTap); canvas.removeEventListener('pointerleave', onLeave);
        scene.traverse((o) => { o.geometry?.dispose?.(); if (o.material) { o.material.map?.dispose?.(); o.material.dispose?.(); } });
        renderer.dispose(); canvas.remove();
      };
    }
    return () => { disposed = true; io.disconnect(); cleanup(); };
  }, [items]);

  const current = focus >= 0 ? items[focus] : null;
  return (
    <div className="cr3d" ref={wrap}>
      <div className="cr3d-title">Quels crédits peut-on regrouper ?</div>
      {mode !== 'list' && (
        <>
          <div className={`cr3d-stage${mode === '3d' ? ' ready' : ''}`} ref={holder} aria-hidden="true" />
          <p className="cr3d-caption" aria-live="polite">
            {current ? <><strong>{current.label}</strong><span>{current.desc}</span></> : <><strong>Tout réuni en un seul crédit</strong><span>Une seule mensualité, un seul interlocuteur.</span></>}
          </p>
          <div className="cr3d-chips" role="list">
            {items.map((c, i) => (
              <button type="button" role="listitem" key={c.label} className={`cr3d-chip${focus === i ? ' on' : ''}`} onClick={() => { setFocus(i); api.current?.show(i); }}>
                <Icon name={c.icon} /> {c.label}
              </button>
            ))}
          </div>
        </>
      )}
      {mode === 'list' && (
        <ul className="cr3d-list">
          {items.map((c) => <li key={c.label}><span><Icon name={c.icon} /></span><div><strong>{c.label}</strong><small>{c.desc}</small></div></li>)}
        </ul>
      )}
    </div>
  );
}
