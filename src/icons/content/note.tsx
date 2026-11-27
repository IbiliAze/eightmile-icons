import { icon } from '../../icon.js';

/** Its corner folds up. */
export default icon((m, cut) => (
  <>
    {cut(<path d="M13.5 20H6a2 2 0 0 1 -2 -2V6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v7.5z" />, {
      near: [15.5, 4],
    })}
    <path d="M13.5 20v-5a1.5 1.5 0 0 1 1.5 -1.5h5" {...m('hop', { x: -0.8, y: -0.8 })} />
  </>
));
