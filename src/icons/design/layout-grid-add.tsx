import { icon } from '../../icon.js';

/** The plus turns a quarter. */
export default icon((m, cut) => (
  <>
    <rect x="4" y="4" width="6" height="6" rx="1" />
    {cut(<rect x="14" y="4" width="6" height="6" rx="1" />, { near: [17, 4] })}
    <rect x="4" y="14" width="6" height="6" rx="1" />
    <path d="M17 14v6M14 17h6" {...m('shift', { r: 90, o: [17, 17] })} />
  </>
));
