import { icon } from '../../icon.js';

/** Two stops and the winding road between them; the road redraws from the start. */
export default icon((m, cut) => (
  <>
    <circle cx="6" cy="19" r="2" />
    <circle cx="18" cy="5" r="2" />
    {cut(<path d="M8 19h7.5a3.5 3.5 0 0 0 0 -7h-7a3.5 3.5 0 0 1 0 -7h7.5" {...m('draw')} />, {
      near: [14.5, 12],
    })}
  </>
));
