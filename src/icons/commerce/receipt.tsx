import { icon } from '../../icon.js';

/** Its lines print one after another. */
export default icon((m, cut) => (
  <>
    {cut(
      <path d="M5 20.5V5a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v15.5l-2.33 -1.5l-2.34 1.5l-2.33 -1.5l-2.33 1.5l-2.34 -1.5z" />,
      { near: [15.5, 3] },
    )}
    <path d="M9 8h6" {...m('draw')} />
    <path d="M9 11.5h6" {...m('draw', { d: 80 })} />
    <path d="M9 15h3.5" {...m('draw', { d: 160 })} />
  </>
));
