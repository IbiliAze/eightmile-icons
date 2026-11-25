import { icon } from '../../icon.js';

/** Its corner folds down. */
export default icon((m, cut) => (
  <>
    {cut(<path d="M14 3.5H7a2 2 0 0 0 -2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2V8.5z" />, {
      near: [16.5, 6],
    })}
    <path d="M14 3.5v3a2 2 0 0 0 2 2h3" {...m('hop', { x: -0.8, y: 0.8, o: [16.5, 6] })} />
  </>
));
