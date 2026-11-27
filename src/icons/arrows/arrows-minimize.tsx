import { icon } from '../../icon.js';

/** The four arrows draw in towards the centre. */
export default icon((m, cut) => (
  <>
    <path d="M3 3l6.5 6.5M9.5 5.5v4h-4" {...m('shift', { x: 0.7, y: 0.7 })} />
    <g {...m('shift', { x: -0.7, y: 0.7 })}>
      {cut(<path d="M21 3l-6.5 6.5v-4" />, { near: [17.1, 6.9] })}
      <path d="M14.5 9.5h4" />
    </g>
    <path d="M3 21l6.5 -6.5M5.5 14.5h4v4" {...m('shift', { x: 0.7, y: -0.7 })} />
    <path d="M21 21l-6.5 -6.5M14.5 18.5v-4h4" {...m('shift', { x: -0.7, y: -0.7 })} />
  </>
));
