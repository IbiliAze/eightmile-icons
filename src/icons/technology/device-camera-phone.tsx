import { icon } from '../../icon.js';

/** The lens blinks, as a shutter does. */
export default icon((m, cut) => (
  <>
    {cut(<rect x="6" y="3" width="12" height="18" rx="2.5" />, { near: [18, 7] })}
    <circle cx="12" cy="9" r="2.5" {...m('blink', { o: [12, 9] })} />
    <path d="M12 18h.01" />
  </>
));
