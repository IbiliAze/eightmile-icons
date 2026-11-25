import { icon } from '../../icon.js';

/** The roof lifts. */
export default icon((m, cut) => (
  <>
    {cut(<path d="M3 12.5l9 -8.5l9 8.5" {...m('hop', { y: -1.5 })} />, { near: [16.5, 8.25] })}
    <path d="M5 11.5V19a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 19v-7.5" />
    <path d="M10 20.5v-5a2 2 0 0 1 4 0v5" />
  </>
));
