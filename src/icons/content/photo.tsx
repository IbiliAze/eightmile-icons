import { icon } from '../../icon.js';

/** The sun rises. */
export default icon((m, cut) => (
  <>
    {cut(<rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />, { near: [16.5, 4.5] })}
    <circle cx="15.5" cy="9.5" r="1.5" {...m('hop', { y: -1.5 })} />
    <path d="M3.5 16l4.5 -4.5a1.5 1.5 0 0 1 2.1 0l5 5M14.2 14.6l1.3 -1.3a1.5 1.5 0 0 1 2.1 0l2.9 2.9" />
  </>
));
