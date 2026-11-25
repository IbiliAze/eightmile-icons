import { icon } from '../../icon.js';

/** Rings: the bell swings and the clapper follows a beat behind. */
export default icon((m, cut) => (
  <>
    <g {...m('swing', { r: 14, o: [12, 3] })}>
      {cut(
        <path d="M12 4a6 6 0 0 0 -6 6v4.2l-1.6 2.3a.6 .6 0 0 0 .5 .9h14.2a.6 .6 0 0 0 .5 -.9L18 14.2V10a6 6 0 0 0 -6 -6z" />,
        { near: [16.5, 6] },
      )}
      <path d="M12 4V2.8" />
    </g>
    <path d="M10 20.5a2 2 0 0 0 4 0" {...m('swing', { r: 24, o: [12, 3], d: 70 })} />
  </>
));
