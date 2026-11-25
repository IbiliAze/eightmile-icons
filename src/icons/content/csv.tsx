import { icon } from '../../icon.js';

/** Its letters hop in turn. */
export default icon((m, cut) => (
  <>
    {cut(
      <path
        d="M7.8 9.5A2.3 2.3 0 0 0 3.5 10.6v2.8a2.3 2.3 0 0 0 4.3 1.1"
        {...m('hop', { y: -1.4 })}
      />,
      { near: [3.5, 12] },
    )}
    <path
      d="M13.6 9.6a1.6 1.6 0 0 0 -1.5 -1.1h-.9a1.8 1.8 0 0 0 0 3.6h.8a1.8 1.8 0 0 1 0 3.6h-.9a1.6 1.6 0 0 1 -1.5 -1.1"
      {...m('hop', { y: -1.4, d: 60 })}
    />
    <path d="M16.5 8.5l2.25 7l2.25 -7" {...m('hop', { y: -1.4, d: 120 })} />
  </>
));
