import { icon } from '../../icon.js';

/** A wave runs down the dots. */
export default icon(m => (
  <>
    <circle cx="9" cy="5" r="1" {...m('hop', { y: -1.4, d: 0 })} />
    <circle cx="15" cy="5" r="1" {...m('hop', { y: -1.4, d: 0 })} />
    <circle cx="9" cy="12" r="1" {...m('hop', { y: -1.4, d: 60 })} />
    <circle cx="15" cy="12" r="1" {...m('hop', { y: -1.4, d: 60 })} />
    <circle cx="9" cy="19" r="1" {...m('hop', { y: -1.4, d: 120 })} />
    <circle cx="15" cy="19" r="1" {...m('hop', { y: -1.4, d: 120 })} />
  </>
));
