import { icon } from '../../icon.js';

/** Turns a quarter. */
export default icon((m, cut) => (
  <>
    <g {...m('shift', { r: 90 })}>
      <path d="M12 5v14" />
      {cut(<path d="M5 12h14" />, { near: [13.5, 12] })}
    </g>
  </>
));
