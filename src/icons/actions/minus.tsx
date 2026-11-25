import { icon } from '../../icon.js';

/** Draws in and springs back. */
export default icon((m, cut) => (
  <>{cut(<path d="M5 12h14" {...m('hop', { y: 0, s: 0.7 })} />, { near: [12, 12] })}</>
));
