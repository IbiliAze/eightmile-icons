import { icon } from '../../icon.js';

/** The lines slide out in turn. */
export default icon((m, cut) => (
  <>
    <path d="M5 6h.01M5 12h.01M5 18h.01" />
    {cut(<path d="M9 6h11" {...m('hop', { x: 1.5, y: 0 })} />, { near: [14.5, 6] })}
    <path d="M9 12h11" {...m('hop', { x: 1.5, y: 0, d: 60 })} />
    <path d="M9 18h11" {...m('hop', { x: 1.5, y: 0, d: 120 })} />
  </>
));
