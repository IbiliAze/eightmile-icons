import { icon } from '../../icon.js';

/** Its lines are written in again, one after another. */
export default icon((m, cut) => (
  <>
    {cut(<path d="M14 3.5H7a2 2 0 0 0 -2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2V8.5z" />, {
      near: [16.5, 6],
    })}
    <path d="M14 3.5v3a2 2 0 0 0 2 2h3" />
    <path d="M9 9h1" {...m('draw')} />
    <path d="M9 12.5h6" {...m('draw', { d: 70 })} />
    <path d="M9 16h6" {...m('draw', { d: 140 })} />
  </>
));
