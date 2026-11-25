import { icon } from '../../icon.js';

/** The return arrow nudges back. */
export default icon((m, cut) => (
  <>
    {cut(
      <path d="M5 20.5V5a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v15.5l-2.33 -1.5l-2.34 1.5l-2.33 -1.5l-2.33 1.5l-2.34 -1.5z" />,
      { near: [19, 6.5] },
    )}
    <g {...m('shift', { x: -1.3 })}>
      <path d="M15 14v-1.5a2.5 2.5 0 0 0 -2.5 -2.5H9" />
      <path d="M11 8l-2 2l2 2" />
    </g>
  </>
));
