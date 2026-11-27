import { icon } from '../../icon.js';

/** The minute hand sweeps round, then the tick is drawn again. */
export default icon((m, cut) => (
  <>
    {cut(<path d="M20.91 13.25A9 9 0 1 0 11.69 20.99" />, { near: [18, 5] })}
    <path d="M12 12V6.5" {...m('spin')} />
    <path d="M12 12l3 2" />
    <path d="M14.5 18.5l2 2l4 -4" {...m('draw', { d: 120 })} />
  </>
));
