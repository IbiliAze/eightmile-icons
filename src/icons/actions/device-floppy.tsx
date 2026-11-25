import { icon } from '../../icon.js';

/** The shutter slides open. */
export default icon((m, cut) => (
  <>
    {cut(<path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2H6a2 2 0 0 1 -2 -2V6a2 2 0 0 1 2 -2z" />, {
      near: [18, 6],
    })}
    <path d="M8 4v3.5a.5 .5 0 0 0 .5 .5h5a.5 .5 0 0 0 .5 -.5V4" {...m('shift', { x: 1.4 })} />
    <circle cx="12" cy="14" r="2.5" />
  </>
));
