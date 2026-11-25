import { icon } from '../../icon.js';

/** Blinks. */
export default icon((m, cut) => (
  <>
    {cut(<rect x="5" y="7.5" width="14" height="11" rx="2.5" />, { near: [15, 7.5] })}
    <path d="M12 7.5V4.5" />
    <path d="M12 3.5h.01" />
    <g {...m('blink', { o: [12, 12] })}>
      <path d="M9.5 12h.01" />
      <path d="M14.5 12h.01" />
    </g>
    <path d="M10 15.5h4" />
    <path d="M3 11.5v3M21 11.5v3" />
  </>
));
