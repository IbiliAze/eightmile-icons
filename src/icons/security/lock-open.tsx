import { icon } from '../../icon.js';

/** The shackle swings further open. */
export default icon((m, cut) => (
  <>
    {cut(<rect x="5" y="11" width="14" height="10" rx="2" />, { near: [15.5, 11] })}
    <path d="M8 11V7a4 4 0 0 1 7.75 -1.4" {...m('shift', { y: -1, r: -10, o: [8, 11] })} />
    <path d="M12 15v2" />
  </>
));
