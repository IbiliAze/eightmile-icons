import { icon } from '../../icon.js';

/** The question mark tilts its head. */
export default icon((m, cut) => (
  <>
    {cut(
      <path d="M12 3c2.6 1.7 5 2.5 7.5 2.5c0 7 -2.5 12.2 -7.5 15.5c-5 -3.3 -7.5 -8.5 -7.5 -15.5c2.5 0 4.9 -.8 7.5 -2.5z" />,
      { near: [16.5, 5] },
    )}
    <g {...m('swing', { r: 12, o: [12, 16.4] })}>
      <path d="M10 9.3a2.1 2.1 0 1 1 2.9 1.9c-.5 .25 -.9 .75 -.9 1.35v.25" />
      <path d="M12 16.4h.01" />
    </g>
  </>
));
