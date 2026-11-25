import { icon } from '../../icon.js';

/** The canopy tips. */
export default icon((m, cut) => (
  <>
    {cut(<path d="M3 12a9 9 0 0 1 18 0z" {...m('swing', { r: 10, o: [12, 12] })} />, {
      near: [15.5, 3.5],
    })}
    <path d="M12 12v6.5a2 2 0 0 1 -4 0" />
  </>
));
