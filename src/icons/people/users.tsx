import { icon } from '../../icon.js';

/** The heads bob, front then back. */
export default icon((m, cut) => (
  <>
    {cut(<circle cx="9" cy="8" r="3.5" {...m('hop', { y: -1.4 })} />, { near: [11, 5] })}
    <path d="M3 20v-1a4.5 4.5 0 0 1 4.5 -4.5h3a4.5 4.5 0 0 1 4.5 4.5v1" />
    <path d="M15.5 4.6a3.5 3.5 0 0 1 0 6.8" {...m('hop', { y: -1.4, d: 90 })} />
    <path d="M17.5 14.6a4.5 4.5 0 0 1 3.5 4.4v1" />
  </>
));
