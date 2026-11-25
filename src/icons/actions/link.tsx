import { icon } from '../../icon.js';

/** The links pull together and spring apart. */
export default icon((m, cut) => (
  <>
    <path d="M9.5 14.5l5 -5" />
    {cut(
      <path d="M11 6.5l.9 -.9a3.8 3.8 0 0 1 5.4 5.4l-.9 .9" {...m('hop', { x: -0.9, y: 0.9 })} />,
      { near: [17.3, 5.6] },
    )}
    <path d="M13 17.5l-.9 .9a3.8 3.8 0 0 1 -5.4 -5.4l.9 -.9" {...m('hop', { x: 0.9, y: -0.9 })} />
  </>
));
