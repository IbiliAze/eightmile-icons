import { icon } from '../../icon.js';

/** Nudges up. */
export default icon((m, cut) => (
  <>
    <g {...m('shift', { y: -2 })}>
      {cut(<path d="M12 5v14" />, { near: [12, 12] })}
      <path d="M6 11l6 -6l6 6" />
    </g>
  </>
));
