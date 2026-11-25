import { icon } from '../../icon.js';

/** The branch is drawn out again. */
export default icon((m, cut) => (
  <>
    <circle cx="6.5" cy="5.5" r="2" />
    <circle cx="6.5" cy="18.5" r="2" />
    <circle cx="17.5" cy="8" r="2" />
    <path d="M6.5 7.5v9" />
    {cut(<path d="M17.5 10a6.5 6.5 0 0 1 -6.5 6.5h-2.5" {...m('draw')} />, { near: [15, 15] })}
  </>
));
