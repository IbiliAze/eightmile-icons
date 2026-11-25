import { icon } from '../../icon.js';

/** The arrow rises. */
export default icon((m, cut) => (
  <>
    {cut(
      <path d="M8.5 17.5H7a3.5 3.5 0 1 1 .7 -6.9a5 5 0 0 1 9.6 0a3.5 3.5 0 1 1 -.3 6.9h-1.5" />,
      {
        near: [18.5, 10.5],
      },
    )}
    <g {...m('shift', { y: -1.5 })}>
      <path d="M12 21v-8" />
      <path d="M9 16l3 -3l3 3" />
    </g>
  </>
));
