import { icon } from '../../icon.js';

/** The card lifts off the line. */
export default icon((m, cut) => (
  <>
    {cut(
      <path
        d="M12 15.5l-2 -2H6.5A1.5 1.5 0 0 1 5 12V4.5A1.5 1.5 0 0 1 6.5 3h11A1.5 1.5 0 0 1 19 4.5V12a1.5 1.5 0 0 1 -1.5 1.5H14z"
        {...m('hop', { y: -1.5 })}
      />,
      { near: [15.5, 3] },
    )}
    <circle cx="12" cy="20" r="1.8" />
    <path d="M3 20h7.2M13.8 20H21" />
  </>
));
