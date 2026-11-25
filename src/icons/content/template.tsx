import { icon } from '../../icon.js';

/** Its text lines redraw in turn. */
export default icon((m, cut) => (
  <>
    {cut(<rect x="4" y="4" width="16" height="5" rx="1.5" />, { near: [14, 4] })}
    <rect x="4" y="12" width="7" height="8" rx="1.5" />
    <path d="M14.5 13h5.5" {...m('draw')} />
    <path d="M14.5 16.5h5.5" {...m('draw', { d: 70 })} />
    <path d="M14.5 20h3.5" {...m('draw', { d: 140 })} />
  </>
));
