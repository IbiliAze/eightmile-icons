import { icon } from '../../icon.js';

/** The rings hop. */
export default icon((m, cut) => (
  <>
    {cut(<rect x="4" y="5" width="16" height="16" rx="2" />, { near: [13.5, 5] })}
    <path d="M8 3v4" {...m('hop', { y: -1.2 })} />
    <path d="M16 3v4" {...m('hop', { y: -1.2, d: 80 })} />
    <path d="M4 10.5h16" />
  </>
));
