import { icon } from '../../icon.js';

/** The page parts at the break. */
export default icon((m, cut) => (
  <>
    <g {...m('shift', { y: -1.2 })}>
      {cut(<path d="M5 10.5V5a2 2 0 0 1 2 -2h7l5 5v2.5" />, { near: [16.5, 5.5] })}
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
    </g>
    <path d="M5 16.5V19a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-2.5" {...m('shift', { y: 1.2 })} />
    <path d="M3 13.5h3M10.5 13.5h3M18 13.5h3" />
  </>
));
