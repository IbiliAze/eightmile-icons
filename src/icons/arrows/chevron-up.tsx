import { icon } from '../../icon.js';

/** Rises. */
export default icon((m, cut) => (
  <>{cut(<path d="M6 15l6 -6l6 6" {...m('shift', { y: -1.5 })} />, { near: [12, 9] })}</>
));
