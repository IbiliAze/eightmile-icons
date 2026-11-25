import { icon } from '../../icon.js';

/** Turns half a turn, which brings each arrow round to the other. */
export default icon((m, cut) => (
  <>
    <g {...m('spin', { r: 180 })}>
      {cut(<path d="M4 12V9a3 3 0 0 1 3 -3h13" />, { near: [14, 6] })}
      <path d="M17 3l3 3l-3 3" />
      <path d="M20 12v3a3 3 0 0 1 -3 3H4" />
      <path d="M7 21l-3 -3l3 -3" />
    </g>
  </>
));
