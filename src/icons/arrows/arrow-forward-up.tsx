import { icon } from '../../icon.js';

/** Nudges forward. */
export default icon((m, cut) => (
  <>
    <g {...m('shift', { x: 1.5 })}>
      <path d="M15 14l4 -4l-4 -4" />
      {cut(<path d="M19 10H9a4.5 4.5 0 0 0 0 9h1" />, { near: [13, 10] })}
    </g>
  </>
));
