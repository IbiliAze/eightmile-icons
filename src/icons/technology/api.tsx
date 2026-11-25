import { icon } from '../../icon.js';

/** Its letters hop in turn. */
export default icon((m, cut) => (
  <>
    <g {...m('hop', { y: -1.4 })}>
      {cut(<path d="M3 16v-5.5a2.75 2.75 0 0 1 5.5 0V16" />, { near: [8.4, 9.9] })}
      <path d="M3 13.5h5.5" />
    </g>
    <path d="M11.5 16V8h2.75a2.25 2.25 0 0 1 0 4.5h-2.75" {...m('hop', { y: -1.4, d: 60 })} />
    <path d="M19.5 8v8" {...m('hop', { y: -1.4, d: 120 })} />
  </>
));
