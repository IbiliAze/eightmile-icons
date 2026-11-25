import { icon } from '../../icon.js';

/** The clock hand sweeps round. */
export default icon((m, cut) => (
  <>
    {cut(<path d="M11.5 21H6a2 2 0 0 1 -2 -2V7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4.5" />, {
      near: [16.5, 5],
    })}
    <path d="M8 3v4M16 3v4M4 10.5h16" />
    <circle cx="17.5" cy="17.5" r="4" />
    <path d="M17.5 15.5v2" {...m('spin', { o: [17.5, 17.5] })} />
    <path d="M17.5 17.5l1.3 .8" />
  </>
));
