import { icon } from '../../icon.js';

/** A stadium seat; its back tips and springs upright. */
export default icon((m, cut) => (
  <>
    {cut(
      <path
        d="M7 3.5h10a1.5 1.5 0 0 1 1.5 1.5v6.5h-13V5A1.5 1.5 0 0 1 7 3.5z"
        {...m('hop', { y: 0, r: -10, o: [12, 11.5] })}
      />,
      { near: [15, 3.5] },
    )}
    <path d="M4 11.5h16v1.5a2 2 0 0 1 -2 2H6a2 2 0 0 1 -2 -2z" />
    <path d="M7 15v5.5M17 15v5.5M7 18.5h10" />
  </>
));
