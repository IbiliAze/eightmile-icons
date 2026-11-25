import { icon } from '../../icon.js';

/** The bag hops; the plus turns a quarter. */
export default icon((m, cut) => (
  <>
    <g {...m('hop', { y: -1.2 })}>
      {cut(<path d="M9.5 8L8 4.2c1.3 .7 2.7 .7 4 0c1.3 .7 2.7 .7 4 0L14.5 8" />, {
        near: [12, 4.2],
      })}
      <path d="M9.5 8h5" />
      <path d="M14.5 8c1.7 .9 3.1 2.2 4 3.8M9.5 8C6.5 9.6 4.5 12.6 4.5 15.6A4.4 4.4 0 0 0 8.9 20h3.6" />
    </g>
    <path d="M15.5 18h5M18 15.5v5" {...m('shift', { r: 90, o: [18, 18] })} />
  </>
));
