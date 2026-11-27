import { icon } from '../../icon.js';

/** The arrow nudges up and out of its box. */
export default icon((m, cut) => (
  <>
    {cut(<path d="M11 6H6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-5" />, {
      near: [4, 11],
    })}
    <g {...m('shift', { x: 1.5, y: -1.5 })}>
      <path d="M11 13L20 4" />
      <path d="M15 4h5v5" />
    </g>
  </>
));
