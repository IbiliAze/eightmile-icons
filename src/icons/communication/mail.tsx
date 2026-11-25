import { icon } from '../../icon.js';

/** Tips and lifts, as if sent. */
export default icon((m, cut) => (
  <>
    <g {...m('pop', { r: -7, s: 1.04 })}>
      {cut(<rect x="3" y="5" width="18" height="14" rx="2" />, { near: [15.5, 5] })}
      <path d="M3.5 7l8.5 6l8.5 -6" />
    </g>
  </>
));
