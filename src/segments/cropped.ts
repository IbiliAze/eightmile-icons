import { cut } from '../cut.js';
import type { IconSource } from '../icon.js';
import { still } from '../motion.js';
import { renderIcon, type Icon } from '../render.js';
import { uncut } from '../uncut.js';

/** The still drawing with its strokes broken. A brand mark is official, so it is never cut. */
export const croppedIcon = (source: IconSource, name: string): Icon =>
  renderIcon(source, name, 'cropped', still, source.fill ? uncut : cut);
