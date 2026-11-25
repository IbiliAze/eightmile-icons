import { icon } from '../../icon.js';

/** The cross turns a quarter. */
export default icon((m, cut) => (
  <>
    {cut(<path d="M12.4 19.2l-2.2 1.1v-8.4L4 4.5h16l-6.2 7.4v1.4" />, { near: [17, 4.5] })}
    <path d="M16.2 16.2l3.6 3.6M19.8 16.2l-3.6 3.6" {...m('shift', { r: 90, o: [18, 18] })} />
  </>
));
