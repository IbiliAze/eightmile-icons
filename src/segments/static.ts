import type { IconSource } from '../icon.js';
import { still } from '../motion.js';
import { renderIcon, type Icon } from '../render.js';
import { uncut } from '../uncut.js';

/** The same drawing, still. */
export const staticIcon = (source: IconSource, name: string): Icon =>
  renderIcon(source, name, 'static', still, uncut);
