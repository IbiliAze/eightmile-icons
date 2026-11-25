import { icon } from '../../icon.js';

/** A newspaper: its lines of print redraw in turn. */
export default icon((m, cut) => (
  <>
    {cut(
      <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0V5a1 1 0 0 0 -1 -1H5a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11" />,
      { near: [16, 7] },
    )}
    <path d="M8 8h4" {...m('draw')} />
    <path d="M8 12h4" {...m('draw', { d: 70 })} />
    <path d="M8 16h4" {...m('draw', { d: 140 })} />
  </>
));
