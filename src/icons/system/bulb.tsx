import { icon } from '../../icon.js';

/** Lights up. */
export default icon((m, cut) => (
  <>
    <g {...m('pop', { s: 1.08, y: -0.5 })}>
      {cut(<path d="M9.5 16a6.5 6.5 0 1 1 5 0v1.5h-5z" />, { near: [16.5, 5.5] })}
    </g>
    <path d="M10 20.5h4" />
  </>
));
