import { icon } from '../../icon.js';

/** The cloud is struck through again. */
export default icon((m, cut) => (
  <>
    {cut(<path d="M8.7 8.1a5 5 0 0 1 8.6 3.5a3.5 3.5 0 0 1 2.9 5.6" />, { near: [15, 7.5] })}
    <path d="M16.8 18.5H7a3.5 3.5 0 0 1 -.3 -6.9" />
    <path d="M3 3l18 18" {...m('draw')} />
  </>
));
