import { icon } from '../../icon.js';

/** A wave runs across the dots. */
export default icon(m => (
  <>
    <circle cx="5" cy="5" r="1" {...m('hop', { y: -1.6, d: 0 })} />
    <circle cx="12" cy="5" r="1" {...m('hop', { y: -1.6, d: 50 })} />
    <circle cx="19" cy="5" r="1" {...m('hop', { y: -1.6, d: 100 })} />
    <circle cx="5" cy="12" r="1" {...m('hop', { y: -1.6, d: 50 })} />
    <circle cx="12" cy="12" r="1" {...m('hop', { y: -1.6, d: 100 })} />
    <circle cx="19" cy="12" r="1" {...m('hop', { y: -1.6, d: 150 })} />
    <circle cx="5" cy="19" r="1" {...m('hop', { y: -1.6, d: 100 })} />
    <circle cx="12" cy="19" r="1" {...m('hop', { y: -1.6, d: 150 })} />
    <circle cx="19" cy="19" r="1" {...m('hop', { y: -1.6, d: 200 })} />
  </>
));
