import { icon } from '../../icon.js';

/** The bars close in and part again. */
export default icon((m, cut) => (
  <>
    <rect x="6" y="5" width="4" height="14" rx="1" {...m('hop', { x: 0.8, y: 0 })} />
    {cut(<rect x="14" y="5" width="4" height="14" rx="1" {...m('hop', { x: -0.8, y: 0 })} />, {
      near: [18, 9.5],
    })}
  </>
));
