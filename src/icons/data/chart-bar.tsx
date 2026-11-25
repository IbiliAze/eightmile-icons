import { icon } from '../../icon.js';

/** The bars grow in turn. */
export default icon((m, cut) => (
  <>
    {cut(<path d="M4 4v16h16" />, { near: [4, 10] })}
    <path d="M8 16.5v-4" {...m('hop', { y: -1.5 })} />
    <path d="M11.5 16.5v-8" {...m('hop', { y: -1.5, d: 60 })} />
    <path d="M15 16.5v-5.5" {...m('hop', { y: -1.5, d: 120 })} />
    <path d="M18.5 16.5V6" {...m('hop', { y: -1.5, d: 180 })} />
  </>
));
