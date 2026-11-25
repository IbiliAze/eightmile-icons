import { icon } from '../../icon.js';

/** A reserved sign on its stand; it wobbles. */
export default icon((m, cut) => (
  <>
    <g {...m('swing', { r: 7, o: [12, 20] })}>
      {cut(<rect x="4" y="4" width="16" height="9" rx="2" />, { near: [16.5, 4] })}
      <path d="M8.5 8.5h7" />
      <path d="M12 13v7" />
    </g>
    <path d="M8 20h8" />
  </>
));
