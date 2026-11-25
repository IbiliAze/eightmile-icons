import { icon } from '../../icon.js';

/** A text field; the cursor blinks. */
export default icon((m, cut) => (
  <>
    {cut(<path d="M13 7h6a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-6" />, { near: [21, 10.5] })}
    <path d="M6 7H5a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h1" />
    <path d="M9.5 4.5v15M7.5 4.5h4M7.5 19.5h4" {...m('blink')} />
  </>
));
