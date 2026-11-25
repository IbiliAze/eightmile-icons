import { icon } from '../../icon.js';

/** Nudges left. */
export default icon((m, cut) => (
  <>
    <g {...m('shift', { x: -2 })}>
      {cut(<path d="M5 12h14" />, { near: [12, 12] })}
      <path d="M11 6l-6 6l6 6" />
    </g>
  </>
));
