import { icon } from '../../icon.js';

/** A box being put away: its lid lifts off. */
export default icon((m, cut) => (
  <>
    {cut(<rect x="3" y="4" width="18" height="4" rx="1.5" {...m('shift', { x: 0, y: -1.5 })} />, {
      near: [13.5, 4],
    })}
    <path d="M5 8v9a3 3 0 0 0 3 3h8a3 3 0 0 0 3 -3V8" />
    <path d="M10 12h4" />
  </>
));
