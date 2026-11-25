import { icon } from '../../icon.js';

/** Turns a little and swells. */
export default icon((m, cut) => (
  <>
    {cut(
      <rect x="5" y="5" width="14" height="14" rx="2" {...m('pop', { y: 0, r: 8, s: 1.06 })} />,
      { near: [15.5, 5] },
    )}
  </>
));
