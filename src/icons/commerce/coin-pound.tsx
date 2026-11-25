import { icon } from '../../icon.js';

/** A pound coin; it flips. */
export default icon((m, cut) => (
  <>
    <g {...m('blink')}>
      {cut(<circle cx="12" cy="12" r="9" />, { near: [18.4, 5.6] })}
      <path d="M14.6 9.3a2.4 2.4 0 0 0 -4.6 .9V16" />
      <path d="M8.5 12.75h4.5M8.5 16h7" />
    </g>
  </>
));
