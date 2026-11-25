import { icon } from '../../icon.js';

/** Swings from its handle. */
export default icon((m, cut) => (
  <>
    <g {...m('swing', { r: 8, o: [12, 4] })}>
      {cut(<path d="M5.5 8h13l.9 11.1a1.8 1.8 0 0 1 -1.8 1.9H6.4a1.8 1.8 0 0 1 -1.8 -1.9z" />, {
        near: [18.5, 11],
      })}
      <path d="M9 10.5V7a3 3 0 0 1 6 0v3.5" />
    </g>
  </>
));
