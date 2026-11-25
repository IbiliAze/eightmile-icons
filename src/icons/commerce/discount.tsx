import { icon } from '../../icon.js';

/** The per cent sign turns half a turn. */
export default icon((m, cut) => (
  <>
    {cut(<circle cx="12" cy="12" r="9" />, { near: [17.5, 4.5] })}
    <g {...m('spin', { r: 180 })}>
      <path d="M9 15l6 -6" />
      <path d="M9.2 9.2h.01M14.8 14.8h.01" />
    </g>
  </>
));
