import { icon } from '../../icon.js';

/** The day pops. */
export default icon((m, cut) => (
  <>
    {cut(<rect x="4" y="5" width="16" height="16" rx="2" />, { near: [16.5, 5] })}
    <path d="M8 3v4M16 3v4M4 10.5h16" />
    <rect
      x="8"
      y="14"
      width="3"
      height="3"
      rx="0.5"
      {...m('pop', { y: 0, s: 1.35, o: [9.5, 15.5] })}
    />
  </>
));
