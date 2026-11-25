import type { IconSource } from '../icon.js';
import { m } from '../motion.js';
import { renderIcon, type Icon } from '../render.js';
import { uncut } from '../uncut.js';

/** The segment whose parts move while the icon's control is hovered or focused. */
export const dynamicIcon = (source: IconSource, name: string): Icon =>
  renderIcon(source, name, 'dynamic', m, uncut);
