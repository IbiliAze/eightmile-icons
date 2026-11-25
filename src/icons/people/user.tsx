import { icon } from '../../icon.js';

/** The head bobs. */
export default icon((m, cut) => (
  <>
    {cut(<circle cx="12" cy="8" r="4" {...m('hop', { y: -1.5 })} />, { near: [15, 5] })}
    <path d="M5.5 20.5v-1a5 5 0 0 1 5 -5h3a5 5 0 0 1 5 5v1" />
  </>
));
