import { icon } from '../../icon.js';

/** Nudges up and to the right, out of the box it points from. */
export default icon((m, cut) => (
  <>
    <g {...m('shift', { x: 1.5, y: -1.5 })}>
      {cut(<path d="M7 17L17 7" />, { near: [12, 12] })}
      <path d="M9 7h8v8" />
    </g>
  </>
));
