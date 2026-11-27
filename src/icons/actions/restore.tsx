import { icon } from '../../icon.js';

/** Turns back once. */
export default icon((m, cut) => (
  <>
    <g {...m('spin', { r: -360 })}>
      {cut(<path d="M3.5 12A8.5 8.5 0 1 1 7.75 19.36" />, { near: [17.5, 5.5] })}
      <path d="M1 9.5L3.5 12L6 9.5" />
    </g>
    <path d="M12 12h.01" />
  </>
));
