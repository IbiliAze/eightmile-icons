import { icon } from '../../icon.js';

/** The arrow nudges out of the door. */
export default icon((m, cut) => (
  <>
    {cut(
      <path d="M14 8V6a2 2 0 0 0 -2 -2H6a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2 -2v-2" />,
      { near: [10.5, 4] },
    )}
    <path d="M9 12h12M18 9l3 3l-3 3" {...m('shift', { x: 1.6 })} />
  </>
));
