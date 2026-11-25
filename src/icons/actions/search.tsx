import { icon } from '../../icon.js';

/** The glass tips and swells, as if looking closer. */
export default icon((m, cut) => (
  <>
    <g {...m('hop', { x: -0.6, y: -0.6, r: -14, s: 1.08, o: [10.5, 10.5] })}>
      {cut(<circle cx="10.5" cy="10.5" r="6.5" />, { near: [14.5, 5.5] })}
      <path d="M15.3 15.3L20 20" />
    </g>
  </>
));
