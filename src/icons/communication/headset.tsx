import { icon } from '../../icon.js';

/** Nods. */
export default icon((m, cut) => (
  <>
    <g {...m('pop', { s: 1.05, y: -1 })}>
      {cut(<path d="M4.5 14v-3a7.5 7.5 0 0 1 15 0v3" />, { near: [15.5, 4.5] })}
      <rect x="3.5" y="13" width="4.5" height="6" rx="1.5" />
      <rect x="16" y="13" width="4.5" height="6" rx="1.5" />
      <path d="M18.3 19v.5a2 2 0 0 1 -2 2h-2.8" />
    </g>
  </>
));
