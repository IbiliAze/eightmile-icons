import { icon } from '../../icon.js';

/** The arrow pushes out. */
export default icon((m, cut) => (
  <>
    {cut(<ellipse cx="11" cy="6" rx="7" ry="3" />, { near: [13.5, 3] })}
    <path d="M4 6v12c0 1.66 3.13 3 7 3h1" />
    <path d="M18 6v5.5" />
    <path d="M4 12c0 1.66 3.13 3 7 3c1 0 2 -.1 2.9 -.3" />
    <g {...m('shift', { x: 1.5 })}>
      <path d="M15 18.5h6" />
      <path d="M18.5 16l2.5 2.5l-2.5 2.5" />
    </g>
  </>
));
