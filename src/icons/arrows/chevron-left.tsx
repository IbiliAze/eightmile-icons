import { icon } from '../../icon.js';

/** Nudges left. */
export default icon((m, cut) => (
  <>{cut(<path d="M15 6l-6 6l6 6" {...m('shift', { x: -1.5 })} />, { near: [9, 12] })}</>
));
