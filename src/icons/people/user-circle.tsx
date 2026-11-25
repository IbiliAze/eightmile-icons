import { icon } from '../../icon.js';

/** The head bobs. */
export default icon((m, cut) => (
  <>
    {cut(<circle cx="12" cy="12" r="9" />, { near: [18.5, 5.5] })}
    <circle cx="12" cy="10" r="3" {...m('hop', { y: -1.3 })} />
    <path d="M6.7 18.7a6 6 0 0 1 10.6 0" />
  </>
));
