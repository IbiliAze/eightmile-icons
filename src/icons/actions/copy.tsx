import { icon } from '../../icon.js';

/** The front sheet slides off the one behind. */
export default icon((m, cut) => (
  <>
    <path d="M16 8V6a2 2 0 0 0 -2 -2H6a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
    {cut(<rect x="8" y="8" width="12" height="12" rx="2" {...m('shift', { x: 1, y: 1 })} />, {
      near: [20, 11.5],
    })}
  </>
));
