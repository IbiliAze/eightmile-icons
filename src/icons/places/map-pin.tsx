import { icon } from '../../icon.js';

/** A map pin with its hole; it hops as a pin dropped on the map does, landing on its point. */
export default icon((m, cut) => (
  <>
    <g {...m('hop', { y: -2, o: [12, 21] })}>
      {cut(<path d="M12 21c-3.5 -3.6 -7 -7.1 -7 -11a7 7 0 0 1 14 0c0 3.9 -3.5 7.4 -7 11z" />, {
        near: [17.5, 5.5],
      })}
      <circle cx="12" cy="10" r="2.5" />
    </g>
  </>
));
