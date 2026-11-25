import { icon } from '../../icon.js';

/** The rays turn. */
export default icon((m, cut) => (
  <>
    {cut(<circle cx="12" cy="12" r="3.5" />, { near: [14, 9] })}
    <path
      d="M18.3 12L20.3 12M16.45 16.45L17.87 17.87M12 18.3L12 20.3M7.55 16.45L6.13 17.87M5.7 12L3.7 12M7.55 7.55L6.13 6.13M12 5.7L12 3.7M16.45 7.55L17.87 6.13"
      {...m('spin', { r: 90 })}
    />
  </>
));
