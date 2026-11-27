import { icon } from '../../icon.js';

/** The scan line sweeps up and back. */
export default icon((m, cut) => (
  <>
    <path d="M3 7V5a2 2 0 0 1 2 -2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1 -2 2h-2M7 21H5a2 2 0 0 1 -2 -2v-2" />
    {cut(<path d="M5 12h14" {...m('hop', { y: -2 })} />, { near: [13, 12] })}
  </>
));
