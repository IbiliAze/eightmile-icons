import { icon } from '../../icon.js';

/** Turns, as on a bolt. */
export default icon((m, cut) => (
  <>
    {cut(
      <path
        d="M13.5 10.5a4.5 4.5 0 0 1 5.4 -6.2l-2.4 2.4l.5 2l2 .5l2.4 -2.4a4.5 4.5 0 0 1 -6.2 5.4l-7.2 7.2a1.7 1.7 0 0 1 -2.4 -2.4z"
        {...m('swing', { r: -14, o: [17, 7] })}
      />,
      { near: [11, 12.5] },
    )}
  </>
));
