import { icon } from '../../icon.js';

/** Presses towards its tip, as if clicking. */
export default icon((m, cut) => (
  <>
    <g {...m('hop', { x: -0.8, y: -0.8, s: 0.9, o: [5, 4] })}>
      {cut(<path d="M5 4l13.5 5.4a.6 .6 0 0 1 0 1.1l-5.6 2l-2 5.6a.6 .6 0 0 1 -1.1 0z" />, {
        near: [14.5, 8],
      })}
      <path d="M13.2 13.2l5.3 5.3" />
    </g>
  </>
));
