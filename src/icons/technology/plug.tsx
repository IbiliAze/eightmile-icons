import { icon } from '../../icon.js';

/** Pushes in. */
export default icon((m, cut) => (
  <>
    <g {...m('shift', { y: -1.5 })}>
      <path d="M9.5 3v4.5M14.5 3v4.5" />
      {cut(<path d="M6.5 7.5h11V10a5.5 5.5 0 0 1 -11 0z" />, { near: [14.5, 7.5] })}
    </g>
    <path d="M12 15.5V21" />
  </>
));
