import { icon } from '../../icon.js';

/** Floats up. */
export default icon((m, cut) => (
  <>
    {cut(
      <path
        d="M7 18.5a3.5 3.5 0 1 1 .7 -6.9a5 5 0 0 1 9.6 0a3.5 3.5 0 1 1 -.3 6.9z"
        {...m('hop', { y: -1.4 })}
      />,
      { near: [17, 18.5] },
    )}
  </>
));
