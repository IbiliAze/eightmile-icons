import { icon } from '../../icon.js';

/** Tips and lifts, as if handed over. */
export default icon((m, cut) => (
  <>
    <g {...m('pop', { r: -8 })}>
      {cut(
        <path d="M6 5h12a2 2 0 0 1 2 2v2.5a2.5 2.5 0 0 0 0 5V17a2 2 0 0 1 -2 2H6a2 2 0 0 1 -2 -2v-2.5a2.5 2.5 0 0 0 0 -5V7a2 2 0 0 1 2 -2z" />,
        { near: [16.5, 5] },
      )}
      <path d="M15 7.5v1M15 11.5v1M15 15.5v1" />
    </g>
  </>
));
