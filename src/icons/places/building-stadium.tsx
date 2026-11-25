import { icon } from '../../icon.js';

/** A bowl with its gate and a pennant on each side; the pennants flutter in turn. */
export default icon((m, cut) => (
  <>
    {cut(<ellipse cx="12" cy="10" rx="9" ry="3" />, { near: [14, 7] })}
    <path d="M3 10v7c0 1.66 4.03 3 9 3s9 -1.34 9 -3v-7" />
    <path d="M10 19.9V17a2 2 0 0 1 4 0v2.9" />
    <path d="M6 7.8V3M18 7.8V3" />
    <path d="M6 3l3 1.25l-3 1.25" {...m('swing', { r: 14, o: [6, 4.25] })} />
    <path d="M18 3l3 1.25l-3 1.25" {...m('swing', { r: 14, o: [18, 4.25], d: 90 })} />
  </>
));
