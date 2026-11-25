import { icon } from '../../icon.js';

/** The big star swells and the small one turns. */
export default icon((m, cut) => (
  <>
    {cut(
      <path
        d="M10 6c.6 3.6 2.4 5.4 6 6c-3.6 .6 -5.4 2.4 -6 6c-.6 -3.6 -2.4 -5.4 -6 -6c3.6 -.6 5.4 -2.4 6 -6z"
        {...m('pop', { s: 1.15, o: [10, 12] })}
      />,
      { near: [12, 10] },
    )}
    <path
      d="M18 3c.3 1.5 .8 2 2.3 2.3c-1.5 .3 -2 .8 -2.3 2.3c-.3 -1.5 -.8 -2 -2.3 -2.3c1.5 -.3 2 -.8 2.3 -2.3z"
      {...m('spin', { r: 90, o: [18, 5.3], d: 80 })}
    />
    <path d="M18.5 17.5h.01" {...m('pop', { s: 1.6, o: [18.5, 17.5], d: 160 })} />
  </>
));
