import { icon } from '../../icon.js';

/** The top layer lifts off the one below. */
export default icon((m, cut) => (
  <>
    {cut(<path d="M12 4l8.5 4.5l-8.5 4.5l-8.5 -4.5z" {...m('shift', { y: -1.5 })} />, {
      near: [14.5, 5.5],
    })}
    <path d="M3.5 13l8.5 4.5l8.5 -4.5" />
  </>
));
