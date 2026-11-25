import { icon } from '../../icon.js';

/** Its edges redraw from the first corner. */
export default icon((m, cut) => (
  <>
    {cut(<path d="M12 3.5L20.2 9.5L17.1 19.2H6.9L3.8 9.5z" {...m('draw')} />, { near: [16, 6.5] })}
    <circle cx="12" cy="3.5" r="1.2" />
    <circle cx="20.2" cy="9.5" r="1.2" />
    <circle cx="17.1" cy="19.2" r="1.2" />
    <circle cx="6.9" cy="19.2" r="1.2" />
    <circle cx="3.8" cy="9.5" r="1.2" />
  </>
));
