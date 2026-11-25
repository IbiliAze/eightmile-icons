import { icon } from '../../icon.js';

/** The bubble swells and its lines are written out again. */
export default icon((m, cut) => (
  <>
    <g {...m('pop', { s: 1.06, y: -1 })}>
      {cut(
        <path d="M18 4a2.5 2.5 0 0 1 2.5 2.5v8a2.5 2.5 0 0 1 -2.5 2.5h-5l-5 3.5V17H6a2.5 2.5 0 0 1 -2.5 -2.5v-8A2.5 2.5 0 0 1 6 4z" />,
        { near: [16.5, 4] },
      )}
      <path d="M8 9h8" {...m('draw', { d: 90 })} />
      <path d="M8 12.5h5" {...m('draw', { d: 170 })} />
    </g>
  </>
));
