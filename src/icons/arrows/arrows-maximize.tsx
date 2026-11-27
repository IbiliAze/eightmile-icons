import { icon } from '../../icon.js';

/** The four arrows push out to the corners. */
export default icon((m, cut) => (
  <>
    <path d="M10 10L3 3M7 3H3v4" {...m('shift', { x: -1, y: -1 })} />
    <g {...m('shift', { x: 1, y: -1 })}>
      {cut(<path d="M14 10l7 -7h-4" />, { near: [17.9, 6.1] })}
      <path d="M21 3v4" />
    </g>
    <path d="M10 14l-7 7M3 17v4h4" {...m('shift', { x: -1, y: 1 })} />
    <path d="M14 14l7 7M21 17v4h-4" {...m('shift', { x: 1, y: 1 })} />
  </>
));
