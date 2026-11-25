import { icon } from '../../icon.js';

/** Shakes its head. */
export default icon((m, cut) => (
  <>
    <g {...m('shake', { r: 10 })}>
      {cut(<circle cx="12" cy="12" r="9" />, { near: [18, 5] })}
      <path d="M5.7 5.7l12.6 12.6" />
    </g>
  </>
));
