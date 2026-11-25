import { icon } from '../../icon.js';

/** The pencil scribbles. */
export default icon((m, cut) => (
  <>
    {cut(<path d="M11 4.5H6.5a2 2 0 0 0 -2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2 -2V13" />, {
      near: [4.5, 8],
    })}
    <path
      d="M17.6 3.9a1.9 1.9 0 0 1 2.7 2.7L12.5 14.4l-3.5 .9l.9 -3.5z"
      {...m('shake', { x: 0.6, r: 7, o: [9.5, 15] })}
    />
  </>
));
