import { icon } from '../../icon.js';

/** Nudges right. */
export default icon((m, cut) => (
  <>
    <g {...m('shift', { x: 2 })}>
      {cut(<path d="M5 12h14" />, { near: [12, 12] })}
      <path d="M13 6l6 6l-6 6" />
    </g>
  </>
));
