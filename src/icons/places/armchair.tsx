import { icon } from '../../icon.js';

/** Sinks a little, as if sat in. */
export default icon((m, cut) => (
  <>
    <g {...m('hop', { y: 0.8, s: 0.94, o: [12, 20] })}>
      <path d="M6 11V8a3 3 0 0 1 3 -3h6a3 3 0 0 1 3 3v3" />
      {cut(
        <path d="M4 13a2 2 0 1 1 4 0v1h8v-1a2 2 0 1 1 4 0v4a1 1 0 0 1 -1 1H5a1 1 0 0 1 -1 -1z" />,
        { near: [12.5, 14] },
      )}
      <path d="M6 18v2M18 18v2" />
    </g>
  </>
));
