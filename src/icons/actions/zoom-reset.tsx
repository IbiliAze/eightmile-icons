import { icon } from '../../icon.js';

/** The arrow in the glass turns once. */
export default icon((m, cut) => (
  <>
    <g {...m('spin', { o: [10.5, 10.5] })}>
      {cut(<path d="M14.23 5.18A6.5 6.5 0 1 1 6.32 5.52" />, { near: [17, 10] })}
      <path d="M6.06 8.51L6.32 5.52L3.33 5.26" />
    </g>
    <path d="M15.3 15.3L20 20" />
  </>
));
