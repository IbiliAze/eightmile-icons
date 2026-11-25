import { icon } from '../../icon.js';

/** Turns once. */
export default icon((m, cut) => (
  <>
    <g {...m('spin')}>
      {cut(<path d="M4.95 9.43A7.5 7.5 0 0 1 18.8 8.83" />, { near: [8.8, 5.2] })}
      <path d="M15.79 7.74L18.8 8.83L19.89 5.82" />
      <path d="M19.05 14.57A7.5 7.5 0 0 1 5.2 15.17M8.21 16.26L5.2 15.17L4.11 18.18" />
    </g>
  </>
));
