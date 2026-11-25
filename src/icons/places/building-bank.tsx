import { icon } from '../../icon.js';

/** The pediment lifts. */
export default icon((m, cut) => (
  <>
    {cut(<path d="M3.5 9L12 3.5L20.5 9z" {...m('hop', { y: -1.3 })} />, { near: [14.5, 5] })}
    <path d="M6 12v6M10 12v6M14 12v6M18 12v6" />
    <path d="M3.5 20.5h17" />
  </>
));
