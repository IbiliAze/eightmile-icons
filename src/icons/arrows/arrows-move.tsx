import { icon } from '../../icon.js';

/** The four heads push outwards. */
export default icon((m, cut) => (
  <>
    <path d="M12 3v18" />
    {cut(<path d="M3 12h18" />, { near: [15, 12] })}
    <path d="M9 6l3 -3l3 3" {...m('shift', { y: -1.2 })} />
    <path d="M9 18l3 3l3 -3" {...m('shift', { y: 1.2 })} />
    <path d="M6 9l-3 3l3 3" {...m('shift', { x: -1.2 })} />
    <path d="M18 9l3 3l-3 3" {...m('shift', { x: 1.2 })} />
  </>
));
