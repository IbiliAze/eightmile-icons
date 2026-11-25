import { icon } from '../../icon.js';

/** The screen swells. */
export default icon((m, cut) => (
  <>
    {cut(
      <rect x="3" y="4" width="18" height="12" rx="2" {...m('pop', { s: 1.05, o: [12, 16] })} />,
      {
        near: [17, 4],
      },
    )}
    <path d="M12 16v4M8.5 20h7" />
  </>
));
