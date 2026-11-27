import { icon } from '../../icon.js';

/** The dashes turn an eighth; no dash is long enough to cut, so its gaps are its only breaks. */
export default icon(m => (
  <>
    <path
      d="M10.72 3.09A9 9 0 0 1 13.28 3.09M17.39 4.8A9 9 0 0 1 19.2 6.61M20.91 10.72A9 9 0 0 1 20.91 13.28M19.2 17.39A9 9 0 0 1 17.39 19.2M13.28 20.91A9 9 0 0 1 10.72 20.91M6.61 19.2A9 9 0 0 1 4.8 17.39M3.09 13.28A9 9 0 0 1 3.09 10.72M4.8 6.61A9 9 0 0 1 6.61 4.8"
      {...m('spin', { r: 45 })}
    />
  </>
));
