import { icon } from '../../icon.js';

/** Shakes. */
export default icon((m, cut) => (
  <>
    <g {...m('shake', { r: 6, o: [12, 20] })}>
      {cut(
        <path d="M10.3 4.4L2.9 17.2a2 2 0 0 0 1.7 3h14.8a2 2 0 0 0 1.7 -3L13.7 4.4a2 2 0 0 0 -3.4 0z" />,
        { near: [15.5, 7.5] },
      )}
      <path d="M12 9.5v4M12 17h.01" />
    </g>
  </>
));
