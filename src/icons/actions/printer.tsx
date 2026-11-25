import { icon } from '../../icon.js';

/** The page feeds out. */
export default icon((m, cut) => (
  <>
    {cut(
      <path d="M7 17H5a2 2 0 0 1 -2 -2v-4a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-2" />,
      { near: [14, 9] },
    )}
    <path d="M7 9V4a1 1 0 0 1 1 -1h8a1 1 0 0 1 1 1v5" />
    <path d="M7 14h10v6a1 1 0 0 1 -1 1H8a1 1 0 0 1 -1 -1z" {...m('shift', { y: 1.5 })} />
  </>
));
