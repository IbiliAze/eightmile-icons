import { icon } from '../../icon.js';

/** Turns, as if in a lock. */
export default icon((m, cut) => (
  <>
    <g {...m('hop', { x: 0, y: 0, r: -22 })}>
      {cut(<circle cx="8" cy="16" r="4.5" />, { near: [12.5, 15] })}
      <path d="M11.2 12.8L20 4" />
      <path d="M16.8 7.2l2.6 2.6M14.2 9.8l2 2" />
    </g>
  </>
));
