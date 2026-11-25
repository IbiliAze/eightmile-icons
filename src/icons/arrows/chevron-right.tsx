import { icon } from '../../icon.js';

/** Nudges right. */
export default icon((m, cut) => (
  <>{cut(<path d="M9 6l6 6l-6 6" {...m('shift', { x: 1.5 })} />, { near: [15, 12] })}</>
));
