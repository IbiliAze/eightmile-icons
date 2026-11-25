import { icon } from '../../icon.js';

/** The bag hops; the minus draws in. */
export default icon((m, cut) => (
  <>
    <g {...m('hop', { y: -1.2 })}>
      {cut(<path d="M9.5 8L8 4.2c1.3 .7 2.7 .7 4 0c1.3 .7 2.7 .7 4 0L14.5 8" />, {
        near: [12, 4.2],
      })}
      <path d="M9.5 8h5" />
      <path d="M14.5 8c1.7 .9 3.1 2.2 4 3.8M9.5 8C6.5 9.6 4.5 12.6 4.5 15.6A4.4 4.4 0 0 0 8.9 20h3.6" />
    </g>
    <path d="M15.5 18h5" {...m('hop', { y: 0, s: 0.6, o: [18, 18], d: 60 })} />
  </>
));
