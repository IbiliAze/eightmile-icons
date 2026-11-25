import { icon } from '../../icon.js';

/** The heads bob in turn. */
export default icon((m, cut) => (
  <>
    <circle cx="5.5" cy="7" r="2" {...m('hop', { y: -1.3 })} />
    {cut(<circle cx="12" cy="8.5" r="2.5" {...m('hop', { y: -1.3, d: 80 })} />, {
      near: [13.5, 6.5],
    })}
    <circle cx="18.5" cy="7" r="2" {...m('hop', { y: -1.3, d: 160 })} />
    <path d="M8 19.5v-.5a3 3 0 0 1 3 -3h2a3 3 0 0 1 3 3v.5" />
    <path d="M2.5 15.5a3 3 0 0 1 3 -3h1.5M21.5 15.5a3 3 0 0 0 -3 -3H17" />
  </>
));
