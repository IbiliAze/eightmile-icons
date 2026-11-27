import { icon } from '../../icon.js';

/** A wheelchair, facing right; it rolls forward. */
export default icon((m, cut) => (
  <>
    <g {...m('shift', { x: 1.5 })}>
      {cut(<circle cx="8" cy="16" r="5" />, { near: [11.6, 19.6] })}
      <circle cx="19" cy="19" r="2" />
      <path d="M19 17a3 3 0 0 0 -3 -3h-3.4" />
      <path d="M3 3h1a2 2 0 0 1 2 2v6" />
      <path d="M6 8h11" />
      <path d="M15 8v6" />
    </g>
  </>
));
