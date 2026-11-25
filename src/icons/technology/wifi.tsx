import { icon } from '../../icon.js';

/** The signal goes out again, ring by ring. */
export default icon((m, cut) => (
  <>
    <path d="M12 18.5h.01" />
    <path d="M9.2 15.3a4 4 0 0 1 5.6 0" {...m('draw')} />
    <path d="M6.4 12.5a8 8 0 0 1 11.2 0" {...m('draw', { d: 80 })} />
    {cut(<path d="M3.6 9.7a12 12 0 0 1 16.8 0" {...m('draw', { d: 160 })} />, {
      near: [13.5, 6.5],
    })}
  </>
));
