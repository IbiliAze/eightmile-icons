import { icon } from '../../icon.js';

/** Its lights blink in turn. */
export default icon((m, cut) => (
  <>
    {cut(<rect x="3.5" y="4" width="17" height="7" rx="2" />, { near: [15, 4] })}
    <rect x="3.5" y="13" width="17" height="7" rx="2" />
    <path d="M7.5 7.5h.01" {...m('blink', { o: [7.5, 7.5] })} />
    <path d="M7.5 16.5h.01" {...m('blink', { o: [7.5, 16.5], d: 120 })} />
    <path d="M11.5 7.5h5M11.5 16.5h5" />
  </>
));
