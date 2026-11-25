import { icon } from '../../icon.js';

/** The lens looks around. */
export default icon((m, cut) => (
  <>
    <path d="M4 4h16a1 1 0 0 1 1 1v2.5H3V5a1 1 0 0 1 1 -1z" />
    {cut(<path d="M19 7.5v5a7 7 0 0 1 -14 0v-5" />, { near: [19, 13.5] })}
    <g {...m('hop', { x: 1.6 })}>
      <circle cx="12" cy="12.5" r="2.5" />
      <path d="M12 12.5h.01" />
    </g>
  </>
));
