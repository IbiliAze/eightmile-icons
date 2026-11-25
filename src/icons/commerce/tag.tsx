import { icon } from '../../icon.js';

/** Swings on its hole. */
export default icon((m, cut) => (
  <>
    <g {...m('swing', { r: 10, o: [8, 8] })}>
      {cut(
        <path d="M3.5 5.5a2 2 0 0 1 2 -2h5.2a2 2 0 0 1 1.4 .6l8.3 8.3a2 2 0 0 1 0 2.8l-5.3 5.3a2 2 0 0 1 -2.8 0l-8.2 -8.3a2 2 0 0 1 -.6 -1.4z" />,
        { near: [16, 8] },
      )}
      <circle cx="8" cy="8" r="1.5" />
    </g>
  </>
));
