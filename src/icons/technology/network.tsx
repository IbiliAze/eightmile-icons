import { icon } from '../../icon.js';

/** The nodes hop in turn. */
export default icon((m, cut) => (
  <>
    {cut(<circle cx="12" cy="5.5" r="2.5" {...m('hop', { y: -1.3 })} />, { near: [13.8, 3.7] })}
    <circle cx="5.5" cy="18" r="2.5" {...m('hop', { y: -1.3, d: 80 })} />
    <circle cx="18.5" cy="18" r="2.5" {...m('hop', { y: -1.3, d: 160 })} />
    <path d="M10.8 7.7L6.9 15.6M13.2 7.7l3.9 7.9M8 18h8" />
  </>
));
