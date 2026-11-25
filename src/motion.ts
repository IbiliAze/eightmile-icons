import type { CSSProperties } from 'react';

/**
 * The motions `motion.css` defines. Each runs while the icon's control (a button, link, tab, menu
 * item, or anything marked `data-icon-trigger`) is hovered or has keyboard focus, and never under
 * `prefers-reduced-motion`.
 *
 * - `shift` holds: the part eases to its offset and stays there until the pointer leaves, then
 *   eases back. For anything with a direction (an arrow, a lid, a shackle).
 * - The rest are gestures, played once from rest and back to rest, so leaving half-way strands
 *   nothing: `hop` goes to the offset and springs back; `pop` is a hop that defaults to a small lift
 *   and swell; `spin` turns by `r` (default a full turn), which must be a symmetry of the part,
 *   since it snaps back to 0; `swing` is a damped pendulum of `r` (default 12°); `shake` is a quick,
 *   decaying wobble of `r` (default 8°) and `x`; `draw` redraws the stroke from its start; `blink`
 *   squeezes the part flat and opens it again.
 */
export const MOTIONS = ['shift', 'hop', 'pop', 'spin', 'swing', 'shake', 'draw', 'blink'] as const;

export type MotionName = (typeof MOTIONS)[number];

export interface MotionOptions {
  /** Offset in viewBox units. */
  x?: number;
  y?: number;
  /** Rotation in degrees. */
  r?: number;
  /** Scale factor. */
  s?: number;
  /** Delay in ms, to stagger parts. */
  d?: number;
  /** The point the part turns and scales about, in viewBox units. Defaults to the centre. */
  o?: readonly [number, number];
}

/** What a moving part carries: the motion's name, its offsets as custom properties, its pivot. */
export interface MotionProps {
  'data-m'?: MotionName;
  style?: CSSProperties;
  pathLength?: number;
}

export type Motion = (motion: MotionName, options?: MotionOptions) => MotionProps;

/**
 * The props that make an element of a drawing move: `<path d="…" {...m('shift', { y: -2 })} />`.
 * A `draw` part also gets `pathLength={1}`, so the dash that redraws it is the length of the path
 * whatever its shape.
 */
export const m: Motion = (motion, { x, y, r, s, d, o = [12, 12] } = {}) => {
  const style: Record<string, string> = { transformOrigin: `${o[0]}px ${o[1]}px` };
  if (x !== undefined) style['--emi-x'] = `${x}px`;
  if (y !== undefined) style['--emi-y'] = `${y}px`;
  if (r !== undefined) style['--emi-r'] = `${r}deg`;
  if (s !== undefined) style['--emi-s'] = `${s}`;
  if (d !== undefined) style['--emi-d'] = `${d}ms`;
  return {
    'data-m': motion,
    style: style as CSSProperties,
    ...(motion === 'draw' && { pathLength: 1 }),
  };
};

/** The motion helper the still segments draw with: it marks nothing, so nothing moves. */
export const still: Motion = () => ({});
