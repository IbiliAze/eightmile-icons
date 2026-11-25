import { icon } from '../../icon.js';

/** The tick redraws itself. */
export default icon((m, cut) => (
  <>
    {cut(<circle cx="12" cy="12" r="9" />, { near: [18, 5] })}
    <path d="M8.5 12.3l2.5 2.5l4.6 -5" {...m('draw', { d: 60 })} />
  </>
));
