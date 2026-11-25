import { icon } from '../../icon.js';

/** Dips, as if pressed through. */
export default icon((m, cut) => (
  <>
    {cut(<path d="M4 4.5h16l-6.2 7.4v6.6l-3.6 1.8v-8.4z" {...m('hop', { y: 1.5 })} />, {
      near: [17, 4.5],
    })}
  </>
));
