import { icon } from '../../icon.js';

/** The cog turns. */
export default icon((m, cut) => (
  <>
    {cut(<circle cx="10" cy="7.5" r="4" />, { near: [12.8, 4.7] })}
    <path d="M3.5 20.5v-1a5 5 0 0 1 5 -5h3" />
    <g {...m('spin', { r: 60, o: [18, 18] })}>
      <circle cx="18" cy="18" r="2" />
      <path d="M18 15.3v-1.2M20.34 16.65l1.04 -.6M20.34 19.35l1.04 .6M18 20.7v1.2M15.66 19.35l-1.04 .6M15.66 16.65l-1.04 -.6" />
    </g>
  </>
));
