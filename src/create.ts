import type { IconSource } from './icon.js';
import type { Icon, Segment } from './render.js';
import { croppedIcon } from './segments/cropped.js';
import { dynamicIcon } from './segments/dynamic.js';
import { staticIcon } from './segments/static.js';

/**
 * One segment of an icon drawn outside the package: `createIcon(icon((m, cut) => …), 'kite',
 * 'dynamic')`. `name` is kebab-case and is what `data-icon` says.
 */
export const createIcon = (source: IconSource, name: string, segment: Segment): Icon => {
  if (segment === 'dynamic') return dynamicIcon(source, name);
  if (segment === 'static') return staticIcon(source, name);
  return croppedIcon(source, name);
};
