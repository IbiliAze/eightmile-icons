import { icon } from '../../icon.js';

/** The question mark tilts its head. */
export default icon((m, cut) => (
  <>
    {cut(<circle cx="12" cy="12" r="9" />, { near: [18.5, 5.5] })}
    <g {...m('swing', { r: 12, o: [12, 17] })}>
      <path d="M9.6 9.6a2.5 2.5 0 1 1 3.5 2.3c-.6 .3 -1.1 .9 -1.1 1.6v.3" />
      <path d="M12 17h.01" />
    </g>
  </>
));
