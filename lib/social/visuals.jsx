import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import sharp from 'sharp';
import { ARTICLE_TYPES, AUTHOR, SILOS } from '@/lib/articles.mjs';

// Visuels de marque pour les réseaux sociaux, composés à partir de la photo principale d'un article :
// carré (Instagram), paysage (Facebook, LinkedIn) et vertical (story).
const INK = '#1b1d1a';
const MINT = '#b3ddcb';
const SAGE = '#6bb69b';
const PAPER = '#fcfdfc';
const SOFT = 'rgba(252,253,252,.82)';
const LINE = 'rgba(252,253,252,.18)';

export const SOCIAL_FORMATS = {
  square: { width: 1080, height: 1080, suffix: 'carre' },
  landscape: { width: 1200, height: 627, suffix: 'paysage' },
  story: { width: 1080, height: 1920, suffix: 'story' },
};

const asset = (name) => readFile(path.join(process.cwd(), 'lib', 'social', name));
let assetsPromise;
function loadAssets() {
  assetsPromise ||= Promise.all([
    asset('dm-sans-latin-500-normal.woff'),
    asset('dm-sans-latin-700-normal.woff'),
    asset('newsreader-latin-500-normal.woff'),
    asset('logo-blanc.png'),
  ]).then(([sans, sansBold, serif, logo]) => ({
    fonts: [
      { name: 'DM Sans', data: sans, weight: 500, style: 'normal' },
      { name: 'DM Sans', data: sansBold, weight: 700, style: 'normal' },
      { name: 'Newsreader', data: serif, weight: 500, style: 'normal' },
    ],
    logo: `data:image/png;base64,${logo.toString('base64')}`,
  }));
  return assetsPromise;
}

// La photo est recadrée à la taille exacte de sa zone, pour un rendu net et un fichier léger.
async function photoData(buffer, width, height) {
  if (!buffer) return null;
  const jpeg = await sharp(buffer).rotate().resize({ width, height, fit: 'cover', position: 'attention' }).jpeg({ quality: 86 }).toBuffer();
  return `data:image/jpeg;base64,${jpeg.toString('base64')}`;
}

// Taille du titre selon sa longueur : un titre long reste lisible sans déborder.
const titleSize = (title, sizes) => sizes[title.length <= 48 ? 0 : title.length <= 72 ? 1 : title.length <= 96 ? 2 : 3];

function labels(article) {
  const isNews = article.type === 'actualite';
  const silo = SILOS[article.silo]?.label;
  return {
    eyebrow: [isNews ? 'Actualité' : 'Nouveau guide', silo].filter(Boolean).join(' · '),
    cta: isNews ? 'Lire l’article' : 'Lire le guide',
    minutes: `${article.readMinutes || 1} min de lecture`,
    section: ARTICLE_TYPES[article.type]?.path || '/blog',
  };
}

const Eyebrow = ({ text, size, bar }) => (
  <div style={{ display: 'flex', alignItems: 'center', color: MINT, fontSize: size, fontWeight: 700, letterSpacing: size * 0.14, textTransform: 'uppercase' }}>
    <div style={{ width: bar, height: 2, background: SAGE, marginRight: size * 0.7 }} />
    {text}
  </div>
);

const Arrow = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: size * 0.45 }}>
    <path d="M4 12h16" />
    <path d="M13 5l7 7-7 7" />
  </svg>
);

const Cta = ({ text, size }) => (
  <div style={{ display: 'flex', alignItems: 'center', background: MINT, color: INK, fontSize: size, fontWeight: 700, borderRadius: 999, padding: `${size * 0.66}px ${size * 1.25}px` }}>
    {text}
    <Arrow size={size} />
  </div>
);

const Title = ({ text, size }) => (
  <div style={{ display: 'flex', fontFamily: 'Newsreader', fontWeight: 500, fontSize: size, lineHeight: 1.07, letterSpacing: -size * 0.02, color: PAPER }}>{text}</div>
);

const Byline = ({ prefix, minutes, size }) => (
  <div style={{ display: 'flex', fontSize: size, color: SOFT }}>
    <span>{prefix}&nbsp;</span>
    <span style={{ color: PAPER, fontWeight: 700 }}>{AUTHOR.name}</span>
    <span>&nbsp;·&nbsp;{minutes}</span>
  </div>
);

function Square({ article, photo, logo }) {
  const l = labels(article);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 1080, height: 1080, background: INK, color: PAPER, fontFamily: 'DM Sans', fontWeight: 500, position: 'relative' }}>
      {photo ? <img src={photo} width={1080} height={570} style={{ position: 'absolute', top: 0, left: 0 }} /> : null}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 1080, height: 572, backgroundImage: 'linear-gradient(180deg, rgba(27,29,26,0) 0%, rgba(27,29,26,.12) 50%, #1b1d1a 100%)' }} />
      <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', left: 64, right: 64, bottom: 60 }}>
        <Eyebrow text={l.eyebrow} size={25} bar={56} />
        <div style={{ display: 'flex', marginTop: 30, marginBottom: 26 }}><Title text={article.title} size={titleSize(article.title, [84, 76, 64, 54])} /></div>
        <Byline prefix="Écrit par" minutes={l.minutes} size={27} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${LINE}`, marginTop: 38, paddingTop: 34 }}>
          <img src={logo} width={178} height={103} />
          <Cta text={l.cta} size={27} />
        </div>
      </div>
    </div>
  );
}

function Landscape({ article, photo, logo }) {
  const l = labels(article);
  return (
    <div style={{ display: 'flex', width: 1200, height: 627, background: INK, color: PAPER, fontFamily: 'DM Sans', fontWeight: 500 }}>
      <div style={{ display: 'flex', flexDirection: 'column', width: 690, height: 627, padding: '48px 30px 46px 60px' }}>
        <img src={logo} width={150} height={87} />
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto' }}>
          <Eyebrow text={l.eyebrow} size={18} bar={40} />
          <div style={{ display: 'flex', marginTop: 20, marginBottom: 28 }}><Title text={article.title} size={titleSize(article.title, [58, 52, 44, 38])} /></div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${LINE}`, paddingTop: 22 }}>
            <Byline prefix="Par" minutes={l.minutes} size={19} />
            <Cta text={l.cta} size={19} />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', width: 510, height: 627, position: 'relative' }}>
        {photo ? <img src={photo} width={510} height={627} /> : null}
        <div style={{ position: 'absolute', top: 0, left: 0, width: 510, height: 627, backgroundImage: 'linear-gradient(90deg, #1b1d1a 0%, rgba(27,29,26,.25) 28%, rgba(27,29,26,0) 60%)' }} />
      </div>
    </div>
  );
}

// Story : rien d'important dans les 250 px du haut ni les 330 px du bas (zones couvertes par l'interface d'Instagram).
function Story({ article, photo, logo }) {
  const l = labels(article);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 1080, height: 1920, background: INK, color: PAPER, fontFamily: 'DM Sans', fontWeight: 500, position: 'relative' }}>
      {photo ? <img src={photo} width={1080} height={980} style={{ position: 'absolute', top: 0, left: 0 }} /> : null}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 1080, height: 982, backgroundImage: 'linear-gradient(180deg, rgba(27,29,26,.45) 0%, rgba(27,29,26,0) 28%, rgba(27,29,26,.15) 62%, #1b1d1a 100%)' }} />
      <img src={logo} width={190} height={110} style={{ position: 'absolute', top: 258, left: 72 }} />
      <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', left: 72, right: 72, top: 900 }}>
        <Eyebrow text={l.eyebrow} size={30} bar={64} />
        <div style={{ display: 'flex', marginTop: 36, marginBottom: 34 }}><Title text={article.title} size={titleSize(article.title, [96, 86, 74, 62])} /></div>
        <Byline prefix="Écrit par" minutes={l.minutes} size={32} />
        <div style={{ display: 'flex', alignItems: 'center', borderTop: `1px solid ${LINE}`, marginTop: 44, paddingTop: 40, fontSize: 32, color: SOFT }}>
          <span>À lire sur&nbsp;</span>
          <span style={{ color: MINT, fontWeight: 700 }}>orizia-courtage.fr{l.section}</span>
        </div>
      </div>
    </div>
  );
}

const LAYOUTS = {
  square: { Component: Square, photo: [1080, 570] },
  landscape: { Component: Landscape, photo: [510, 627] },
  story: { Component: Story, photo: [1080, 980] },
};

// Rend un visuel en JPEG (le seul format accepté par tous les réseaux, Instagram compris).
export async function renderSocialVisual(format, article, photoBuffer) {
  const { width, height } = SOCIAL_FORMATS[format];
  const { Component, photo: [pw, ph] } = LAYOUTS[format];
  const [{ fonts, logo }, photo] = await Promise.all([loadAssets(), photoData(photoBuffer, pw, ph)]);
  const png = await new ImageResponse(<Component article={article} photo={photo} logo={logo} />, { width, height, fonts }).arrayBuffer();
  return sharp(Buffer.from(png)).flatten({ background: INK }).jpeg({ quality: 88, mozjpeg: true }).toBuffer();
}
