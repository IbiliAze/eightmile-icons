import { icon } from '../../icon.js';

/** Charges. */
export default icon((m, cut) => (
  <>
    {cut(<path d="M13 3L5 13.5h6l-1 7.5l8 -10.5h-6z" {...m('pop', { s: 1.12 })} />, {
      near: [12.5, 7.5],
    })}
  </>
));
