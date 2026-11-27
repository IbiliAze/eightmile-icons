import { icon } from '../../icon.js';

/** The sidebar's edge slides right and its chevron follows, opening the sidebar out. */
export default icon((m, cut) => (
  <>
    {cut(<rect x="4" y="4" width="16" height="16" rx="2" />, { near: [15, 4] })}
    <path d="M9 4v16" {...m('shift', { x: 1 })} />
    <path d="M14 10l2 2l-2 2" {...m('shift', { x: 1, d: 60 })} />
  </>
));
