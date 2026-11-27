import { icon } from '../../icon.js';

/** Flutters on its pole. */
export default icon((m, cut) => (
  <>
    {cut(
      <path
        d="M5 5a5 5 0 0 1 7 0a5 5 0 0 0 7 0v9a5 5 0 0 1 -7 0a5 5 0 0 0 -7 0z"
        {...m('swing', { r: 8, o: [5, 9.5] })}
      />,
      { near: [19, 8.5] },
    )}
    <path d="M5 21v-7" />
  </>
));
