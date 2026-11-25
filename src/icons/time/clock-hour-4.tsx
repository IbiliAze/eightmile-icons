import { icon } from '../../icon.js';

/** Four o’clock; the minute hand sweeps round. */
export default icon((m, cut) => (
  <>
    {cut(<circle cx="12" cy="12" r="9" />, { near: [18, 5] })}
    <path d="M12 12V6.5" {...m('spin')} />
    <path d="M12 12L15.12 13.8" />
  </>
));
