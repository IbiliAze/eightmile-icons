import { icon } from '../../icon.js';

/** The line redraws between its ends. */
export default icon((m, cut) => (
  <>
    <circle cx="5.5" cy="18.5" r="2" />
    <circle cx="18.5" cy="5.5" r="2" />
    {cut(<path d="M7 17L17 7" {...m('draw')} />, { near: [12, 12] })}
  </>
));
