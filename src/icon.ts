import type { ReactNode } from 'react';
import type { Cut } from './cut.js';
import type { Motion } from './motion.js';

/**
 * A drawing on the 24-unit grid, written once for all three segments. `m` marks the parts that
 * move (it marks nothing in the still segments) and `cut` cuts the gaps of the cropped segment (it
 * returns its element untouched in the others).
 */
export type Draw = (m: Motion, cut: Cut) => ReactNode;

export interface IconSource {
  readonly draw: Draw;
  /** A filled brand mark rather than a stroked drawing. A brand mark is never cut. */
  readonly fill: boolean;
}

/** An icon's drawing, as its module's default export: `export default icon((m, cut) => <>…</>)`. */
export const icon = (draw: Draw, { fill = false }: { fill?: boolean } = {}): IconSource => ({
  draw,
  fill,
});
