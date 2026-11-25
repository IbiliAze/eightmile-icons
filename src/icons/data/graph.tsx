import { icon } from '../../icon.js';

/** The line redraws itself. */
export default icon((m, cut) => (
  <>
    {cut(<path d="M4 4v16h16" />, { near: [4, 10] })}
    <path d="M7.5 15l3.5 -4l3 2.5l5 -6" {...m('draw')} />
  </>
));
