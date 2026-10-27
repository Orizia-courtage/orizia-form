import localFont from 'next/font/local';

// Polices auto-hébergées (aucun appel à Google Fonts au build ni au runtime).
export const fontSans = localFont({
  src: '../app/fonts/dm-sans-latin-opsz-normal.woff2',
  weight: '100 1000',
  style: 'normal',
  display: 'swap',
  variable: '--font-sans',
  fallback: ['system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
});

// Serif de titrage — fait écho au caractère classique du logo Orizia.
export const fontDisplay = localFont({
  src: '../app/fonts/newsreader-latin-opsz-normal.woff2',
  weight: '200 800',
  style: 'normal',
  display: 'swap',
  variable: '--font-display',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});
