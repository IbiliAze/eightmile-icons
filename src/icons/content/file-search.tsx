import { icon } from '../../icon.js';

/** The glass tips and swells, as if looking closer. */
export default icon((m, cut) => (
  <>
    {cut(<path d="M18.5 11.5V8.5l-5 -5H7a2 2 0 0 0 -2 2v13a2 2 0 0 0 2 2h4.5" />, {
      near: [16, 6],
    })}
    <path d="M13.5 3.5v3.5a2 2 0 0 0 2 2h3" />
    <g {...m('hop', { x: -0.5, y: -0.5, r: -14, s: 1.08, o: [16, 16] })}>
      <circle cx="16" cy="16" r="3" />
      <path d="M18.2 18.2L20.5 20.5" />
    </g>
  </>
));
