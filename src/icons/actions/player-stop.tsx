import { icon } from '../../icon.js';

/** Presses in. */
export default icon((m, cut) => (
  <>
    {cut(<rect x="6" y="6" width="12" height="12" rx="2" {...m('hop', { y: 0, s: 0.85 })} />, {
      near: [13.5, 6],
    })}
  </>
));
