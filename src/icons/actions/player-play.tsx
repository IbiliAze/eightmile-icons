import { icon } from '../../icon.js';

/** Nudges forward. */
export default icon((m, cut) => (
  <>{cut(<path d="M7 4.5v15L19 12z" {...m('shift', { x: 1.5 })} />, { near: [13, 8.25] })}</>
));
