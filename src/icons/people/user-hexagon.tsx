import { icon } from '../../icon.js';

/** The hexagon turns a sixth. */
export default icon((m, cut) => (
  <>
    {cut(
      <path
        d="M12 2.5L20.23 7.25L20.23 16.75L12 21.5L3.77 16.75L3.77 7.25z"
        {...m('spin', { r: 60 })}
      />,
      { near: [17.5, 6] },
    )}
    <circle cx="12" cy="10" r="2.7" />
    <path d="M8 17.6a4.6 4.6 0 0 1 8 0" />
  </>
));
