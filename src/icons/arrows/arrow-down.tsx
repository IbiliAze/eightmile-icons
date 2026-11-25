import { icon } from '../../icon.js';

/** Nudges down. */
export default icon((m, cut) => (
  <>
    <g {...m('shift', { y: 2 })}>
      {cut(<path d="M12 5v14" />, { near: [12, 11] })}
      <path d="M6 13l6 6l6 -6" />
    </g>
  </>
));
