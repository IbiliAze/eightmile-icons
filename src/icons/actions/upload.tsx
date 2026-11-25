import { icon } from '../../icon.js';

/** The arrow rises. */
export default icon((m, cut) => (
  <>
    {cut(<path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />, { near: [16.5, 20] })}
    <path d="M12 15V4M7.5 8.5L12 4l4.5 4.5" {...m('shift', { y: -1.5 })} />
  </>
));
