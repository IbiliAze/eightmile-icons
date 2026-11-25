import { icon } from '../../icon.js';

/** The tick is drawn again. */
export default icon((m, cut) => (
  <>
    {cut(
      <path d="M12 3c2.6 1.7 5 2.5 7.5 2.5c0 7 -2.5 12.2 -7.5 15.5c-5 -3.3 -7.5 -8.5 -7.5 -15.5c2.5 0 4.9 -.8 7.5 -2.5z" />,
      { near: [16.5, 5] },
    )}
    <path d="M9 12l2 2l4 -4" {...m('draw')} />
  </>
));
