import { icon } from '../../icon.js';

/** Turns a little, as a globe on its stand does. */
export default icon((m, cut) => (
  <>
    {cut(<circle cx="12" cy="12" r="9" />, { near: [18.5, 5.5] })}
    <ellipse cx="12" cy="12" rx="4" ry="9" {...m('hop', { x: 1.2 })} />
    <path d="M3.6 9h16.8M3.6 15h16.8" />
  </>
));
