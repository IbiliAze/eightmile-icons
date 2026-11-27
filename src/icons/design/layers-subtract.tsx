import { icon } from '../../icon.js';

/** The top layer slides off the one below. */
export default icon((m, cut) => (
  <>
    {cut(<rect x="8" y="4" width="12" height="12" rx="2" {...m('shift', { x: 1, y: -1 })} />, {
      near: [15, 4],
    })}
    <path d="M16 16v2a2 2 0 0 1 -2 2H6a2 2 0 0 1 -2 -2v-8a2 2 0 0 1 2 -2h2" />
  </>
));
