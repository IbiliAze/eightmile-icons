import { icon } from '../../icon.js';

/** The hands turn back. */
export default icon((m, cut) => (
  <>
    {cut(<path d="M3.5 12A8.5 8.5 0 1 1 7.75 19.36" />, { near: [17.5, 5.5] })}
    <path d="M1 9.5L3.5 12L6 9.5" />
    <path d="M12 7.5V12l3 2" {...m('spin', { r: -360 })} />
  </>
));
