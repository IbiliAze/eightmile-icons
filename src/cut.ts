import { cloneElement, createElement, isValidElement, type ReactElement } from 'react';
import { isShape, locate, outline, rectPath, type Point } from './geometry.js';

export interface CutOptions {
  /**
   * Where each gap goes: centred on the point of the outline nearest to this one, in the element's
   * own units. Give several points for several gaps.
   */
  near: Point | readonly Point[];
  /** The gap a viewer sees at the default stroke of 2, in viewBox units. */
  gap?: number;
}

/** Cuts gaps into one shape element of a drawing, and returns the element to draw instead. */
export type Cut = (element: ReactElement, options: CutOptions) => ReactElement;

/** The visible gap when a drawing does not ask for another. */
export const GAP = 3;
/** The shortest a piece of stroke between gaps, or between a gap and an end, may be: shorter reads as a stray dot. */
export const MIN_DASH = 3;
/** Each round cap reaches half the stroke into a gap; gaps are sized for the default stroke. */
const CAP = 1;

const round = (n: number): number => Math.round(n * 1000) / 1000;

const points = (near: CutOptions['near']): readonly Point[] =>
  typeof near[0] === 'number' ? [near as Point] : (near as readonly Point[]);

export interface CutPlan {
  /** What `cut` draws: the element with its dash, or the element unchanged if it cannot be cut. */
  readonly element: ReactElement;
  /** Everything wrong with the cut. The tests hold every cut in the set to none. */
  readonly problems: readonly string[];
}

/**
 * Plans a cut. Each gap is `gap + 2` long along the outline, so that once the round caps on either
 * side have reached a unit into it, `gap` is what shows. `pathLength` is set to the outline's own
 * length, so the browser lays the pattern on its measure of the shape exactly where it was planned,
 * and a renderer that ignores `pathLength` still draws it nearly right.
 */
export const planCut = (element: ReactElement, { near, gap = GAP }: CutOptions): CutPlan => {
  const problems: string[] = [];
  if (!isValidElement(element) || !isShape(element.type)) {
    const name = isValidElement(element) ? String(element.type) : typeof element;
    return { element, problems: [`cut() wraps a shape element, not <${name}>`] };
  }
  const type = element.type;
  const props = element.props as Record<string, unknown>;
  const shape = outline(type, props);
  if (!shape) return { element, problems: [`cut() cannot measure <${type}>`] };
  if (shape.subpaths !== 1) {
    problems.push(`<${type}> has ${shape.subpaths} drawing subpaths; a cut needs exactly one`);
  }
  if (gap < 1.5) problems.push(`a gap of ${gap} is too narrow to read at 14px`);

  const length = shape.length;
  const span = gap + 2 * CAP;
  const centres = points(near)
    .map(target => {
      const { at, distance } = locate(shape, target);
      if (distance > 1.5) {
        problems.push(`[${target.join(', ')}] is ${round(distance)} from the <${type}>'s outline`);
      }
      return at;
    })
    .sort((a, b) => a - b);

  let dasharray: number[];
  let offset = 0;
  if (shape.closed) {
    // The pattern starts where the first gap ends and runs once round the shape.
    const starts = centres.map(at => at + span / 2);
    dasharray = starts.flatMap((start, k) => {
      const next = k + 1 < centres.length ? centres[k + 1]! : centres[0]! + length;
      return [next - span / 2 - start, span];
    });
    offset = (((length - starts[0]!) % length) + length) % length;
  } else {
    // An open stroke's pattern starts at its start and must not wrap: no gap may reach an end.
    dasharray = [];
    let from = 0;
    for (const at of centres) {
      dasharray.push(at - span / 2 - from, span);
      from = at + span / 2;
    }
    dasharray.push(length - from, length);
  }
  const dashes = dasharray.filter((_, k) => k % 2 === 0);
  if (dashes.some(dash => dash < MIN_DASH)) {
    problems.push(
      `a piece of the <${type}> between gaps or ends is under ${MIN_DASH} units (outline ${round(length)})`,
    );
  }

  // In thousandths, so that on a closed shape the rounded pattern sums to exactly the rounded
  // length: a pattern a hair short starts again before the seam and leaves a dot in a gap.
  const total = Math.round(length * 1000);
  const parts = dasharray.map(n => Math.max(0, Math.round(n * 1000)));
  if (shape.closed) {
    const rest = parts.slice(0, -2).reduce((sum, n) => sum + n, 0) + parts[parts.length - 1]!;
    parts[parts.length - 2] = Math.max(0, total - rest);
  }
  const cutProps = {
    pathLength: total / 1000,
    strokeDasharray: parts.map(n => n / 1000).join(' '),
    strokeDashoffset: Math.round(offset * 1000) / 1000,
  };
  if (type === 'rect') {
    const { x: _x, y: _y, width: _w, height: _h, rx: _rx, ry: _ry, ...rest } = props;
    return {
      element: createElement('path', { ...rest, d: rectPath(props), ...cutProps }),
      problems,
    };
  }
  return { element: cloneElement(element, cutProps), problems };
};

/** The cut the cropped segment draws with. */
export const cut: Cut = (element, options) => planCut(element, options).element;
