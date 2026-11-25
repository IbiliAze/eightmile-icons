import { icon } from '../../icon.js';

/** Its bands redraw from the top. */
export default icon((m, cut) => (
  <>
    {cut(<path d="M3.5 4h17l-6 16h-5z" />, { near: [17.5, 4] })}
    <path d="M5.6 9.5h12.8" {...m('draw')} />
    <path d="M7.6 15h8.8" {...m('draw', { d: 90 })} />
  </>
));
