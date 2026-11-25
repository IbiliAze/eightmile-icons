import { icon } from '../../icon.js';

/** The shackle lifts. */
export default icon((m, cut) => (
  <>
    {cut(<rect x="5" y="11" width="14" height="10" rx="2" />, { near: [13.5, 11] })}
    <path d="M8 11V7a4 4 0 0 1 8 0v4" {...m('shift', { y: -1.6 })} />
    <path d="M12 15v2" />
  </>
));
