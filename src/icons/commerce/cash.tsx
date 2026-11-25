import { icon } from '../../icon.js';

/** The front note slides out. */
export default icon((m, cut) => (
  <>
    <path d="M17 9V7a2 2 0 0 0 -2 -2H5a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" />
    <g {...m('hop', { x: 1.4, y: 0.6 })}>
      {cut(<rect x="7" y="9" width="14" height="10" rx="2" />, { near: [21, 12.5] })}
      <circle cx="14" cy="14" r="2" />
    </g>
  </>
));
