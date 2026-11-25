import { icon } from '../../icon.js';

/** The minute hand sweeps round. */
export default icon((m, cut) => (
  <>
    {cut(<circle cx="12" cy="12" r="9" />, { near: [18, 5] })}
    <path d="M12 12V6.5" {...m('spin')} />
    <path d="M12 12l3 2" />
  </>
));
