/**
 * `@eightmile/icons`: Eight Mile's icons. The icons themselves are imported by segment, from
 * `@eightmile/icons/dynamic`, `/static` or `/cropped`; this entry holds what makes and describes
 * them. The list of icons is `@eightmile/icons/manifest`.
 */
export { icon } from './icon.js';
export type { Draw, IconSource } from './icon.js';
export { createIcon } from './create.js';
export { SEGMENTS } from './render.js';
export type { Icon, IconProps, Segment } from './render.js';
export { m, MOTIONS } from './motion.js';
export type { Motion, MotionName, MotionOptions, MotionProps } from './motion.js';
export { cut } from './cut.js';
export type { Cut, CutOptions } from './cut.js';
export { GROUPS } from './groups.js';
export type { Group } from './groups.js';
