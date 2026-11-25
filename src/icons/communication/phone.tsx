import { icon } from '../../icon.js';

/** Rings. */
export default icon((m, cut) => (
  <>
    {cut(
      <path
        d="M6 3.5h3l1.8 4.5l-2.3 1.4a11.5 11.5 0 0 0 6.1 6.1l1.4 -2.3l4.5 1.8v3a2 2 0 0 1 -2 2C10.3 19.6 4.4 13.7 4 5.5a2 2 0 0 1 2 -2z"
        {...m('shake', { r: 12 })}
      />,
      { near: [4.5, 8] },
    )}
  </>
));
