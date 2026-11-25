import { icon } from '../../icon.js';

/** The brackets open out. */
export default icon((m, cut) => (
  <>
    <path d="M8 7l-5 5l5 5" {...m('shift', { x: -1.2 })} />
    <path d="M16 7l5 5l-5 5" {...m('shift', { x: 1.2 })} />
    {cut(<path d="M13.5 5l-3 14" />, { near: [12.5, 10.5] })}
  </>
));
