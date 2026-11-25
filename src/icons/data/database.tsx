import { icon } from '../../icon.js';

/** Its middle ring is drawn round again. */
export default icon((m, cut) => (
  <>
    {cut(<ellipse cx="12" cy="6" rx="7" ry="3" />, { near: [14.5, 3] })}
    <path d="M5 6v12c0 1.66 3.13 3 7 3s7 -1.34 7 -3V6" />
    <path d="M5 12c0 1.66 3.13 3 7 3s7 -1.34 7 -3" {...m('draw')} />
  </>
));
