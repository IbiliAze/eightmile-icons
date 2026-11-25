import { icon } from '../../icon.js';

/** Shudders from the knock. */
export default icon((m, cut) => (
  <>
    <g {...m('shake', { x: 1, r: 0 })}>
      <path d="M3.7 16.5H2.5v-4l2.3 -4.5H11l3.2 4.5h1.3a2 2 0 0 1 2 2v2h-1.5M12.2 16.5H7.3" />
      <path d="M5 12.5h9M8.2 8v4.5" />
      {cut(<circle cx="5.5" cy="16.5" r="1.8" />, { near: [7, 15.5] })}
      <circle cx="14" cy="16.5" r="1.8" />
    </g>
    <path d="M20 8.5l1.5 -1.5M20.5 12.5h1.5M20 16.5l1.5 1.5" />
  </>
));
