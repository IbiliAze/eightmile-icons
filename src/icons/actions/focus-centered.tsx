import { icon } from '../../icon.js';

/** The corners close in on the centre. */
export default icon((m, cut) => (
  <>
    <path
      d="M3 7V5a2 2 0 0 1 2 -2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1 -2 2h-2M7 21H5a2 2 0 0 1 -2 -2v-2"
      {...m('hop', { y: 0, s: 0.86 })}
    />
    {cut(<circle cx="12" cy="12" r="2" />, { near: [13.4, 10.6], gap: 2 })}
  </>
));
