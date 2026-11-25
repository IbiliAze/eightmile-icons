import { icon } from '../../icon.js';

/** The sliders move along their tracks. */
export default icon((m, cut) => (
  <>
    {cut(<path d="M4 6h16" />, { near: [13, 6] })}
    <path d="M4 12h16" />
    <path d="M4 18h16" />
    <path d="M8 3.5v5" {...m('shift', { x: 3.5 })} />
    <path d="M16 9.5v5" {...m('shift', { x: -4 })} />
    <path d="M10 15.5v5" {...m('shift', { x: 3, d: 40 })} />
  </>
));
