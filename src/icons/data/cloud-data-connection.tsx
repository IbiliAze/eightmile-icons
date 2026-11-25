import { icon } from '../../icon.js';

/** The cloud floats up. */
export default icon((m, cut) => (
  <>
    {cut(
      <path
        d="M7 13A3 3 0 1 1 7.52 7.05A4.5 4.5 0 0 1 16.48 7.05A3 3 0 1 1 17 13z"
        {...m('hop', { y: -1.4 })}
      />,
      { near: [16, 13] },
    )}
    <path d="M12 13v3" />
    <circle cx="12" cy="18.5" r="2" />
    <path d="M3 18.5h7M14 18.5h7" />
  </>
));
