import { icon } from '../../icon.js';

/** The tick is drawn again. */
export default icon((m, cut) => (
  <>
    {cut(<path d="M7 18.5a3.5 3.5 0 1 1 .7 -6.9a5 5 0 0 1 9.6 0a3.5 3.5 0 1 1 -.3 6.9z" />, {
      near: [17, 18.5],
    })}
    <path d="M9.5 14.75l2 2l3.5 -3.5" {...m('draw')} />
  </>
));
