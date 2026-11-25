import { icon } from '../../icon.js';

/** Tips and lifts. */
export default icon((m, cut) => (
  <>
    <g {...m('pop', { r: -6, s: 1.04 })}>
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      {cut(<path d="M17 21H7a2 2 0 0 1 -2 -2V5a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />, {
        near: [16.5, 5.5],
      })}
      <path d="M10 12l4 5M14 12l-4 5" />
    </g>
  </>
));
