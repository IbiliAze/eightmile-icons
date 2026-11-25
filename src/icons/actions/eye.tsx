import { icon } from '../../icon.js';

/** Blinks. */
export default icon((m, cut) => (
  <>
    <g {...m('blink')}>
      {cut(
        <path d="M2.5 12c2.4 -4 5.6 -6 9.5 -6s7.1 2 9.5 6c-2.4 4 -5.6 6 -9.5 6s-7.1 -2 -9.5 -6z" />,
        { near: [17, 7.5] },
      )}
      <circle cx="12" cy="12" r="2.5" />
    </g>
  </>
));
