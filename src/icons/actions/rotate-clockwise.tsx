import { icon } from '../../icon.js';

/** Turns once. */
export default icon((m, cut) => (
  <>
    <g {...m('spin')}>
      {cut(<path d="M15.75 18.5A7.5 7.5 0 1 1 18.5 8.25" />, { near: [6.7, 6.7] })}
      <path d="M15.4 7.42L18.5 8.25L19.32 5.16" />
    </g>
  </>
));
