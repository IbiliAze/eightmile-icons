import { icon } from '../../icon.js';

/** The broken links drift further apart. */
export default icon((m, cut) => (
  <>
    {cut(
      <path d="M11 6.5l.9 -.9a3.8 3.8 0 0 1 5.4 5.4l-.9 .9" {...m('shift', { x: 0.9, y: -0.9 })} />,
      { near: [17.3, 5.6] },
    )}
    <path d="M13 17.5l-.9 .9a3.8 3.8 0 0 1 -5.4 -5.4l.9 -.9" {...m('shift', { x: -0.9, y: 0.9 })} />
    <path d="M3.5 8.5h2M8.5 3.5v2M20.5 15.5h-2M15.5 20.5v-2" />
  </>
));
