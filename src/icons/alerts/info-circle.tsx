import { icon } from '../../icon.js';

/** The dot of the i hops. */
export default icon((m, cut) => (
  <>
    {cut(<circle cx="12" cy="12" r="9" />, { near: [18, 5] })}
    <path d="M12 11.5V16" />
    <path d="M12 8h.01" {...m('hop', { y: -1.8 })} />
  </>
));
