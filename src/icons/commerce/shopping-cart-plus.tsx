import { icon } from '../../icon.js';

/** Rolls forward. */
export default icon((m, cut) => (
  <>
    <g {...m('hop', { x: 1.5, y: 0, r: -3, o: [12, 20] })}>
      {cut(
        <path d="M3 4h2l2.1 10.2a1.5 1.5 0 0 0 1.5 1.3h8.6a1.5 1.5 0 0 0 1.5 -1.2L20 7.5H5.7" />,
        { near: [13.5, 7.5] },
      )}
      <circle cx="9" cy="19.5" r="1.3" />
      <circle cx="17" cy="19.5" r="1.3" />
      <path d="M10.5 11h5M13 8.5v5" />
    </g>
  </>
));
