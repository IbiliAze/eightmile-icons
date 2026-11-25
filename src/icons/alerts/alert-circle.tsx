import { icon } from '../../icon.js';

/** The mark hops. */
export default icon((m, cut) => (
  <>
    {cut(<circle cx="12" cy="12" r="9" />, { near: [18, 5] })}
    <path d="M12 7.8v4.7M12 16.2h.01" {...m('hop', { y: -1.3 })} />
  </>
));
