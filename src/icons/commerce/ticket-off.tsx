import { icon } from '../../icon.js';

/** The stroke through it redraws itself. */
export default icon((m, cut) => (
  <>
    <path d="M8.5 5H18a2 2 0 0 1 2 2v2.5a2.5 2.5 0 0 0 0 5v1.5" />
    <path d="M15.5 19H6a2 2 0 0 1 -2 -2v-2.5a2.5 2.5 0 0 0 0 -5V8.5" />
    <path d="M15 7.5v1M15 11.5v.5" />
    {cut(<path d="M3 3l18 18" {...m('draw')} />, { near: [11, 11] })}
  </>
));
