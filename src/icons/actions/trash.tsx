import { icon } from '../../icon.js';

/** The lid lifts. */
export default icon((m, cut) => (
  <>
    <g {...m('shift', { y: -1.6, r: -12, o: [4, 7] })}>
      <path d="M4 7h16" />
      <path d="M9.5 7v-2a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v2" />
    </g>
    {cut(<path d="M6 7l0.9 11.2a2 2 0 0 0 2 1.8h6.2a2 2 0 0 0 2 -1.8l0.9 -11.2" />, {
      near: [17.5, 13],
    })}
    <path d="M10 11v5M14 11v5" />
  </>
));
