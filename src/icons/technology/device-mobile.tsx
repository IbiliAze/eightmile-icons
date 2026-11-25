import { icon } from '../../icon.js';

/** Buzzes. */
export default icon((m, cut) => (
  <>
    <g {...m('shake', { r: 6, x: 0.6 })}>
      {cut(<rect x="6" y="3" width="12" height="18" rx="2.5" />, { near: [18, 7] })}
      <path d="M11 5.5h2" />
      <path d="M12 18h.01" />
    </g>
  </>
));
