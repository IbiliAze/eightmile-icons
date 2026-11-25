import { icon } from '../../icon.js';

/** Flies off up and to the right. */
export default icon((m, cut) => (
  <>
    <g {...m('shift', { x: 1.5, y: -1.5 })}>
      {cut(<path d="M21 3L3.5 10.3l7 3.2l3.2 7z" />, { near: [15, 5.5] })}
      <path d="M21 3L10.5 13.5" />
    </g>
  </>
));
