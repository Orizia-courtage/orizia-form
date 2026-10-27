import { createElement } from 'react';
import { ICONS, EMOJI_TO_ICON } from './icons/iconData';

const DOT_COLORS = {
  'dot-red': '#b5483b',
  'dot-orange': '#c07a35',
  'dot-amber': '#c9a24a',
  'dot-green': '#6bb69b',
  'dot-blue': '#5c8fa8',
};

/**
 * Pictogramme SVG Orizia.
 *  <Icon name="calendar-days" />
 *
 * - `name` accepte un nom d'icône, un ancien emoji (converti automatiquement)
 *   ou un élément React (rendu tel quel) : les composants existants qui
 *   affichent `{item.icon}` peuvent passer par <Icon name={item.icon} /> sans risque.
 * - Taille : 1em par défaut, la couleur suit `currentColor`.
 */
export default function Icon({ name, size = '1em', strokeWidth = 1.75, className = '', title, style, ...rest }) {
  if (name == null || name === false || name === '') return null;
  if (typeof name !== 'string') return name;

  const key = ICONS[name] || DOT_COLORS[name] ? name : EMOJI_TO_ICON[name.trim()];
  if (!key) return name;

  const a11y = title
    ? { role: 'img', 'aria-label': title }
    : { 'aria-hidden': true, focusable: 'false' };

  if (DOT_COLORS[key]) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={`oz-icon oz-icon--dot ${className}`} style={style} {...a11y} {...rest}>
        <circle cx="12" cy="12" r="6" fill={DOT_COLORS[key]} />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`oz-icon oz-icon--${key} ${className}`}
      style={style}
      {...a11y}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {ICONS[key].map(([tag, attrs], i) => createElement(tag, { key: i, ...attrs }))}
    </svg>
  );
}
