import { icon } from '../../icon.js';

/** A list of rules on a clipboard: the lines are written out again, one after the other. */
export default icon((m, cut) => (
  <>
    {cut(
      <path d="M9 4H7a2 2 0 0 0 -2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2V6a2 2 0 0 0 -2 -2h-2" />,
      { near: [19, 7.5] },
    )}
    <rect x="9" y="2.5" width="6" height="3.5" rx="1" />
    <path d="M9 11h.01M9 14.5h.01M9 18h.01" />
    <path d="M11.5 11h4" {...m('draw')} />
    <path d="M11.5 14.5h4" {...m('draw', { d: 70 })} />
    <path d="M11.5 18h2.5" {...m('draw', { d: 140 })} />
  </>
));
