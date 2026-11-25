import { icon } from '../../icon.js';

/** Tips and lifts. */
export default icon((m, cut) => (
  <>
    <g {...m('pop', { r: -6, s: 1.04 })}>
      {cut(<rect x="3" y="6" width="18" height="12" rx="2" />, { near: [17, 6] })}
      <circle cx="12" cy="12" r="2.5" />
      <path d="M6.5 12h.01M17.5 12h.01" />
    </g>
  </>
));
