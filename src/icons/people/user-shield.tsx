import { icon } from '../../icon.js';

/** The shield lifts. */
export default icon((m, cut) => (
  <>
    {cut(<circle cx="10" cy="7.5" r="4" />, { near: [12.8, 4.7] })}
    <path d="M3.5 20.5v-1a5 5 0 0 1 5 -5h3" />
    <path
      d="M18 13c1.21 .79 2.33 1.17 3.5 1.17c0 3.27 -1.17 5.69 -3.5 7.23c-2.33 -1.54 -3.5 -3.96 -3.5 -7.23c1.17 0 2.29 -.38 3.5 -1.17z"
      {...m('pop', { o: [18, 17.2] })}
    />
  </>
));
