import { icon } from '../../icon.js';

/** The glass draws back. */
export default icon((m, cut) => (
  <>
    <g {...m('hop', { y: 0, s: 0.88, o: [10.5, 10.5] })}>
      {cut(<circle cx="10.5" cy="10.5" r="6.5" />, { near: [14.5, 5.5] })}
      <path d="M8 10.5h5" />
    </g>
    <path d="M15.3 15.3L20 20" />
  </>
));
