import { icon } from '../../icon.js';

/** The tiles squeeze in turn. */
export default icon((m, cut) => (
  <>
    <rect x="4" y="4" width="6" height="6" rx="1" {...m('hop', { y: 0, s: 0.8, o: [7, 7] })} />
    {cut(
      <rect
        x="14"
        y="4"
        width="6"
        height="6"
        rx="1"
        {...m('hop', { y: 0, s: 0.8, o: [17, 7], d: 60 })}
      />,
      { near: [17, 4] },
    )}
    <rect
      x="4"
      y="14"
      width="6"
      height="6"
      rx="1"
      {...m('hop', { y: 0, s: 0.8, o: [7, 17], d: 60 })}
    />
    <rect
      x="14"
      y="14"
      width="6"
      height="6"
      rx="1"
      {...m('hop', { y: 0, s: 0.8, o: [17, 17], d: 120 })}
    />
  </>
));
