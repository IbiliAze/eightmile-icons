import { icon } from '../../icon.js';

/** A hub and the six nodes round it; the nodes swell in turn, clockwise. */
export default icon((m, cut) => (
  <>
    <circle cx="12" cy="12" r="2.5" />
    <path d="M14.5 12h4M13.25 14.17l2 3.46M10.75 14.17l-2 3.46M9.5 12h-4M10.75 9.83l-2 -3.46M13.25 9.83l2 -3.46" />
    {cut(<circle cx="16" cy="5.07" r="1.5" {...m('pop', { y: 0, s: 1.3, o: [16, 5.07] })} />, {
      near: [16.75, 3.77],
      gap: 2,
    })}
    <circle cx="20" cy="12" r="1.5" {...m('pop', { y: 0, s: 1.3, o: [20, 12], d: 60 })} />
    <circle cx="16" cy="18.93" r="1.5" {...m('pop', { y: 0, s: 1.3, o: [16, 18.93], d: 120 })} />
    <circle cx="8" cy="18.93" r="1.5" {...m('pop', { y: 0, s: 1.3, o: [8, 18.93], d: 180 })} />
    <circle cx="4" cy="12" r="1.5" {...m('pop', { y: 0, s: 1.3, o: [4, 12], d: 240 })} />
    <circle cx="8" cy="5.07" r="1.5" {...m('pop', { y: 0, s: 1.3, o: [8, 5.07], d: 300 })} />
  </>
));
