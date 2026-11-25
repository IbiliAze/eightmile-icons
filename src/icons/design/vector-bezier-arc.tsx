import { icon } from '../../icon.js';

/** The curve redraws between its handles. */
export default icon((m, cut) => (
  <>
    {cut(<path d="M5 16.5A13.09 13.09 0 0 1 16.5 5" {...m('draw')} />, { near: [11, 7] })}
    <rect x="3.5" y="16.5" width="3" height="3" rx="0.6" />
    <rect x="16.5" y="3.5" width="3" height="3" rx="0.6" />
  </>
));
