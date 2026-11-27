import { icon } from '../../icon.js';

/** The plug lunges at the socket and springs back. */
export default icon((m, cut) => (
  <>
    {cut(<path d="M11.47 6.87l5.66 5.66l1.06 -1.06A4 4 0 0 0 12.53 5.81z" />, {
      near: [14.98, 4.66],
    })}
    <path d="M18.19 5.81L20.5 3.5" />
    <g {...m('hop', { x: 1, y: -1 })}>
      <path d="M6.87 11.47l5.66 5.66l-1.06 1.06A4 4 0 0 1 5.81 12.53z" />
      <path d="M8.29 12.88l2.12 -2.12M11.12 15.71l2.12 -2.12" />
      <path d="M5.81 18.19L3.5 20.5" />
    </g>
    <path d="M16.25 16.25l3.5 3.5M19.75 16.25l-3.5 3.5" />
  </>
));
