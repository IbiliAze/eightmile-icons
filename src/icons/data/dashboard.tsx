import { icon } from '../../icon.js';

/** The needle swings. */
export default icon((m, cut) => (
  <>
    {cut(<path d="M6.34 20A9 9 0 1 1 17.66 20z" />, { near: [18.36, 6.64] })}
    <circle cx="12" cy="13" r="2" />
    <path d="M13.41 11.59L16.5 8.5" {...m('swing', { r: 20, o: [12, 13] })} />
  </>
));
