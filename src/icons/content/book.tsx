import { icon } from '../../icon.js';

/** Lifts. */
export default icon((m, cut) => (
  <>
    <g {...m('pop', { y: -1.5, s: 1.04 })}>
      {cut(<path d="M3 5.5a8 8 0 0 1 9 1a8 8 0 0 1 9 -1V18a8 8 0 0 0 -9 1a8 8 0 0 0 -9 -1z" />, {
        near: [18, 4.5],
      })}
      <path d="M12 6.5V19" />
    </g>
  </>
));
