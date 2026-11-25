import { icon } from '../../icon.js';

/** Blinks. */
export default icon((m, cut) => (
  <>
    {cut(<circle cx="12" cy="12" r="9" />, { near: [18, 5] })}
    <path d="M9 10h.01M15 10h.01" {...m('blink', { o: [12, 10] })} />
    <path d="M9 16.2a3.5 3.5 0 0 1 6 0" />
  </>
));
