import { icon } from '../../icon.js';

/** The two letters hop in turn. */
export default icon((m, cut) => (
  <>
    <path d="M3 19l4 -12l4 12M4.6 14.5h4.8" {...m('hop', { y: -1.4 })} />
    <g {...m('hop', { y: -1.4, d: 80 })}>
      {cut(<circle cx="17" cy="16" r="3" />, { near: [17.5, 13] })}
      <path d="M20 13v6" />
    </g>
  </>
));
