import { icon } from '../../icon.js';

/** A receipt in manat; the sign pops. */
export default icon((m, cut) => (
  <>
    {cut(
      <path d="M5 20.5V5a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v15.5l-2.33 -1.5l-2.34 1.5l-2.33 -1.5l-2.33 1.5l-2.34 -1.5z" />,
      { near: [19, 6.5] },
    )}
    <g {...m('pop', { s: 1.15, o: [12, 12] })}>
      <path d="M8.3 15.5v-2a3.7 3.7 0 0 1 7.4 0v2" />
      <path d="M12 7.5v8" />
    </g>
  </>
));
