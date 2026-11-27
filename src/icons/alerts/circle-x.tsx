import { icon } from '../../icon.js';

/** The cross shakes. */
export default icon((m, cut) => (
  <>
    {cut(<circle cx="12" cy="12" r="9" />, { near: [18, 5] })}
    <path d="M9.5 9.5l5 5M14.5 9.5l-5 5" {...m('shake', { r: 12 })} />
  </>
));
