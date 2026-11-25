import { icon } from '../../icon.js';

/** Turns a quarter. */
export default icon((m, cut) => (
  <>
    <g {...m('shift', { r: 90 })}>
      <path d="M6.5 6.5l11 11" />
      {cut(<path d="M17.5 6.5l-11 11" />, { near: [13.5, 10.5] })}
    </g>
  </>
));
