import { icon } from '../../icon.js';

/** Its panels hop in turn. */
export default icon((m, cut) => (
  <>
    <rect x="4" y="4" width="6" height="8" rx="1" {...m('hop', { y: -1.2 })} />
    {cut(<rect x="14" y="4" width="6" height="4" rx="1" {...m('hop', { y: -1.2, d: 60 })} />, {
      near: [17, 4],
    })}
    <rect x="4" y="16" width="6" height="4" rx="1" {...m('hop', { y: -1.2, d: 120 })} />
    <rect x="14" y="12" width="6" height="8" rx="1" {...m('hop', { y: -1.2, d: 180 })} />
  </>
));
