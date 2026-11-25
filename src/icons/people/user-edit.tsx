import { icon } from '../../icon.js';

/** The pencil scribbles. */
export default icon((m, cut) => (
  <>
    <circle cx="10" cy="7.5" r="3.5" />
    <path d="M4 20v-1a5 5 0 0 1 5 -5h2.5" />
    {cut(
      <path
        d="M18.3 13.4a1.4 1.4 0 0 1 2 2l-4.6 4.6l-2.7 .7l.7 -2.7z"
        {...m('shake', { x: 0.6, r: 7, o: [13.5, 20.5] })}
      />,
      { near: [17, 14.5] },
    )}
  </>
));
