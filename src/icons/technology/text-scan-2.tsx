import { icon } from '../../icon.js';

/** Its lines redraw in turn, as if read again. */
export default icon((m, cut) => (
  <>
    <path d="M3 7V5a2 2 0 0 1 2 -2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1 -2 2h-2M7 21H5a2 2 0 0 1 -2 -2v-2" />
    <path d="M6.5 9h8" {...m('draw')} />
    {cut(<path d="M6.5 12h11" {...m('draw', { d: 70 })} />, { near: [12, 12] })}
    <path d="M6.5 15h5" {...m('draw', { d: 140 })} />
  </>
));
