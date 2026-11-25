import { icon } from '../../icon.js';

/** Redraws itself. */
export default icon((m, cut) => (
  <>{cut(<path d="M5 12.5l4.5 4.5l9.5 -10" {...m('draw')} />, { near: [15, 11] })}</>
));
