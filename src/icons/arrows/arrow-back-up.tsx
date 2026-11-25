import { icon } from '../../icon.js';

/** Nudges back. */
export default icon((m, cut) => (
  <>
    <g {...m('shift', { x: -1.5 })}>
      <path d="M9 14l-4 -4l4 -4" />
      {cut(<path d="M5 10h10a4.5 4.5 0 0 1 0 9h-1" />, { near: [16, 10] })}
    </g>
  </>
));
