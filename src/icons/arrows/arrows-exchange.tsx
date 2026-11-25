import { icon } from '../../icon.js';

/** The two arrows pass each other. */
export default icon((m, cut) => (
  <>
    {cut(<path d="M4 9h16l-4 -4" {...m('shift', { x: 1.5 })} />, { near: [17, 9] })}
    <path d="M20 15H4l4 4" {...m('shift', { x: -1.5 })} />
  </>
));
