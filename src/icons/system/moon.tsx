import { icon } from '../../icon.js';

/** Rocks. */
export default icon((m, cut) => (
  <>
    {cut(<path d="M12 3a6.5 6.5 0 0 0 9 9a9 9 0 1 1 -9 -9z" {...m('swing', { r: -16 })} />, {
      near: [13, 11],
    })}
  </>
));
