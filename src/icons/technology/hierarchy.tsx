import { icon } from '../../icon.js';

/** The top swells and the two below hop in turn. */
export default icon((m, cut) => (
  <>
    <circle cx="12" cy="5" r="2.5" {...m('pop', { s: 1.15, o: [12, 5] })} />
    <circle cx="5.5" cy="19" r="2.5" {...m('hop', { y: -1.2, d: 80 })} />
    <circle cx="18.5" cy="19" r="2.5" {...m('hop', { y: -1.2, d: 160 })} />
    <path d="M12 7.5v4" />
    {cut(<path d="M5.5 16.5V15a3.5 3.5 0 0 1 3.5 -3.5h6a3.5 3.5 0 0 1 3.5 3.5v1.5" />, {
      near: [16, 11.5],
    })}
  </>
));
