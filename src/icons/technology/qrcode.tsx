import { icon } from '../../icon.js';

/** Its three corner marks blink in turn. */
export default icon((m, cut) => (
  <>
    {cut(
      <rect x="4" y="4" width="6" height="6" rx="1" {...m('hop', { y: 0, s: 0.75, o: [7, 7] })} />,
      { near: [9.5, 4] },
    )}
    <rect
      x="14"
      y="4"
      width="6"
      height="6"
      rx="1"
      {...m('hop', { y: 0, s: 0.75, o: [17, 7], d: 80 })}
    />
    <rect
      x="4"
      y="14"
      width="6"
      height="6"
      rx="1"
      {...m('hop', { y: 0, s: 0.75, o: [7, 17], d: 160 })}
    />
    <path d="M14 14h3M14 14v3M17 17h3v3M20 14h.01M14 20h.01" />
  </>
));
