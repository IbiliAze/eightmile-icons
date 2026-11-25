import { icon } from '../../icon.js';

/** Slides forward, as if offered. */
export default icon((m, cut) => (
  <>
    <g {...m('hop', { x: 1.5, y: -0.8, r: -6 })}>
      {cut(<rect x="3" y="5" width="18" height="14" rx="2.5" />, { near: [17, 5] })}
      <path d="M3 10h18" />
      <path d="M7 15h.01M10.5 15h2.5" />
    </g>
  </>
));
