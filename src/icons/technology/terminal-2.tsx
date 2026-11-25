import { icon } from '../../icon.js';

/** The prompt nudges on and the cursor blinks. */
export default icon((m, cut) => (
  <>
    {cut(<rect x="3" y="4" width="18" height="16" rx="2.5" />, { near: [17, 4] })}
    <path d="M7 9.5l3 2.5l-3 2.5" {...m('shift', { x: 1 })} />
    <path d="M12.5 15h4.5" {...m('blink', { o: [14.75, 15], d: 80 })} />
  </>
));
