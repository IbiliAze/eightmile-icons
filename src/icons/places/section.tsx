import { icon } from '../../icon.js';

/** A block of the bowl; its rows redraw from the pitch up. */
export default icon((m, cut) => (
  <>
    {cut(<path d="M3.21 5.47A27 27 0 0 1 20.79 5.47L16.07 19.18A12.5 12.5 0 0 0 7.93 19.18z" />, {
      near: [18, 4.5],
    })}
    <path d="M7.67 14.25A17.3 17.3 0 0 1 16.33 14.25" {...m('draw')} />
    <path d="M6.47 9.6A22.1 22.1 0 0 1 17.53 9.6" {...m('draw', { d: 90 })} />
  </>
));
