import { icon } from '../../icon.js';

/** An invoice: a page whose lines and total write themselves in. */
export default icon((m, cut) => (
  <>
    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
    {cut(<path d="M17 21H7a2 2 0 0 1 -2 -2V5a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />, {
      near: [16.5, 5.5],
    })}
    <path d="M9 7h1" {...m('draw')} />
    <path d="M9 12h6" {...m('draw', { d: 60 })} />
    <path d="M13 16h2" {...m('draw', { d: 120 })} />
  </>
));
