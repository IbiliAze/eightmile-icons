/** A point in viewBox units. */
export type Point = readonly [number, number];

/**
 * A shape's outline as the browser strokes it: from the point its dash pattern starts at, in the
 * direction it is drawn. A closed outline does not repeat its first point.
 */
export interface Outline {
  readonly points: readonly Point[];
  readonly closed: boolean;
  /** Its length: exact for circles, ellipses and lines, from the flattened points otherwise. */
  readonly length: number;
  /** How many subpaths draw something. The browser restarts the dash pattern at each one. */
  readonly subpaths: number;
}

/** The shapes an outline can be taken from. */
export const SHAPES = ['path', 'circle', 'ellipse', 'line', 'rect', 'polyline', 'polygon'] as const;

export type Shape = (typeof SHAPES)[number];

export const isShape = (type: unknown): type is Shape =>
  typeof type === 'string' && (SHAPES as readonly string[]).includes(type);

const num = (value: unknown, fallback = 0): number => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && value.trim() !== '') return Number(value);
  return fallback;
};

const distance = (a: Point, b: Point): number => Math.hypot(b[0] - a[0], b[1] - a[1]);

/** The length of a polyline, with its closing segment when it is closed. */
export const polylineLength = (points: readonly Point[], closed: boolean): number => {
  let length = 0;
  for (let i = 1; i < points.length; i++) length += distance(points[i - 1]!, points[i]!);
  if (closed && points.length > 1) length += distance(points[points.length - 1]!, points[0]!);
  return length;
};

/**
 * A rect as the path SVG 2 defines for it: from (x + rx, y), clockwise, each corner an arc. Rects
 * are cut as paths, because WebKit draws a dashed rect's round caps wrongly at its corners.
 */
export const rectPath = (props: Record<string, unknown>): string => {
  const x = num(props['x']);
  const y = num(props['y']);
  const width = num(props['width']);
  const height = num(props['height']);
  const givenRx = props['rx'] === undefined ? undefined : num(props['rx']);
  const givenRy = props['ry'] === undefined ? undefined : num(props['ry']);
  const rx = Math.min(givenRx ?? givenRy ?? 0, width / 2);
  const ry = Math.min(givenRy ?? givenRx ?? 0, height / 2);
  const f = (n: number) => String(Math.round(n * 1000) / 1000);
  if (rx === 0 || ry === 0) {
    return `M${f(x)} ${f(y)}H${f(x + width)}V${f(y + height)}H${f(x)}Z`;
  }
  const arc = (ex: number, ey: number) => `A${f(rx)} ${f(ry)} 0 0 1 ${f(ex)} ${f(ey)}`;
  return [
    `M${f(x + rx)} ${f(y)}`,
    `H${f(x + width - rx)}`,
    arc(x + width, y + ry),
    `V${f(y + height - ry)}`,
    arc(x + width - rx, y + height),
    `H${f(x + rx)}`,
    arc(x, y + height - ry),
    `V${f(y + ry)}`,
    arc(x + rx, y),
    'Z',
  ].join('');
};

const NUMBER = /[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/y;

interface Subpath {
  points: Point[];
  closed: boolean;
}

/** The endpoint arc of SVG's `A` command, flattened (SVG 2, appendix B.2.4). */
const arcPoints = (
  x1: number,
  y1: number,
  rxIn: number,
  ryIn: number,
  rotation: number,
  large: boolean,
  sweep: boolean,
  x2: number,
  y2: number,
): Point[] => {
  if (x1 === x2 && y1 === y2) return [];
  let rx = Math.abs(rxIn);
  let ry = Math.abs(ryIn);
  if (rx === 0 || ry === 0) return [[x2, y2]];
  const phi = (rotation * Math.PI) / 180;
  const cos = Math.cos(phi);
  const sin = Math.sin(phi);
  const dx = (x1 - x2) / 2;
  const dy = (y1 - y2) / 2;
  const x1p = cos * dx + sin * dy;
  const y1p = -sin * dx + cos * dy;
  const lambda = (x1p * x1p) / (rx * rx) + (y1p * y1p) / (ry * ry);
  if (lambda > 1) {
    rx *= Math.sqrt(lambda);
    ry *= Math.sqrt(lambda);
  }
  const numerator = rx * rx * ry * ry - rx * rx * y1p * y1p - ry * ry * x1p * x1p;
  const denominator = rx * rx * y1p * y1p + ry * ry * x1p * x1p;
  const coefficient = (large === sweep ? -1 : 1) * Math.sqrt(Math.max(0, numerator / denominator));
  const cxp = (coefficient * rx * y1p) / ry;
  const cyp = (-coefficient * ry * x1p) / rx;
  const cx = cos * cxp - sin * cyp + (x1 + x2) / 2;
  const cy = sin * cxp + cos * cyp + (y1 + y2) / 2;
  const angle = (ux: number, uy: number, vx: number, vy: number) =>
    Math.atan2(ux * vy - uy * vx, ux * vx + uy * vy);
  const theta = angle(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry);
  let delta = angle((x1p - cxp) / rx, (y1p - cyp) / ry, (-x1p - cxp) / rx, (-y1p - cyp) / ry);
  if (!sweep && delta > 0) delta -= 2 * Math.PI;
  else if (sweep && delta < 0) delta += 2 * Math.PI;
  const steps = Math.max(4, Math.ceil(Math.abs(delta) / (Math.PI / 90)));
  const points: Point[] = [];
  for (let k = 1; k <= steps; k++) {
    const t = theta + (delta * k) / steps;
    points.push([
      cx + rx * Math.cos(t) * cos - ry * Math.sin(t) * sin,
      cy + rx * Math.cos(t) * sin + ry * Math.sin(t) * cos,
    ]);
  }
  points[points.length - 1] = [x2, y2];
  return points;
};

const cubicPoints = (p0: Point, c1: Point, c2: Point, p3: Point, steps = 48): Point[] => {
  const points: Point[] = [];
  for (let k = 1; k <= steps; k++) {
    const t = k / steps;
    const u = 1 - t;
    points.push([
      u * u * u * p0[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p3[0],
      u * u * u * p0[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p3[1],
    ]);
  }
  return points;
};

const quadPoints = (p0: Point, c: Point, p2: Point, steps = 32): Point[] => {
  const points: Point[] = [];
  for (let k = 1; k <= steps; k++) {
    const t = k / steps;
    const u = 1 - t;
    points.push([
      u * u * p0[0] + 2 * u * t * c[0] + t * t * p2[0],
      u * u * p0[1] + 2 * u * t * c[1] + t * t * p2[1],
    ]);
  }
  return points;
};

/** Path data, flattened into its subpaths. Throws on data a browser would reject. */
export const flattenPath = (d: string): Subpath[] => {
  let i = 0;
  const skip = () => {
    while (i < d.length && /[\s,]/.test(d[i]!)) i++;
  };
  const number = (): number => {
    skip();
    NUMBER.lastIndex = i;
    const match = NUMBER.exec(d);
    if (!match) throw new Error(`Expected a number at ${i} in "${d}"`);
    i = NUMBER.lastIndex;
    return Number(match[0]);
  };
  const flag = (): boolean => {
    skip();
    const c = d[i];
    if (c !== '0' && c !== '1') throw new Error(`Expected an arc flag at ${i} in "${d}"`);
    i++;
    return c === '1';
  };
  const atNumber = () => {
    skip();
    return i < d.length && /[\d.+-]/.test(d[i]!);
  };

  const subpaths: Subpath[] = [];
  let current: Subpath | undefined;
  let x = 0;
  let y = 0;
  let startX = 0;
  let startY = 0;
  let cubicControl: Point | undefined;
  let quadControl: Point | undefined;
  let previous = '';

  const open = () => {
    // A command straight after a closepath starts a new subpath where the closed one started.
    if (!current) throw new Error(`Path data must start with a moveto: "${d}"`);
    if (current.closed) {
      current = { points: [[startX, startY]], closed: false };
      subpaths.push(current);
    }
    return current;
  };
  const to = (points: Point[], nx: number, ny: number) => {
    open().points.push(...points);
    x = nx;
    y = ny;
  };

  for (;;) {
    skip();
    if (i >= d.length) break;
    let command = d[i]!;
    if (/[a-zA-Z]/.test(command)) i++;
    else if (previous && previous.toUpperCase() !== 'Z' && atNumber()) command = previous;
    else throw new Error(`Unexpected "${command}" at ${i} in "${d}"`);
    const relative = command !== command.toUpperCase();
    const ox = relative ? x : 0;
    const oy = relative ? y : 0;
    let nextCubic: Point | undefined;
    let nextQuad: Point | undefined;
    switch (command.toUpperCase()) {
      case 'M': {
        const nx = number() + ox;
        const ny = number() + oy;
        current = { points: [[nx, ny]], closed: false };
        subpaths.push(current);
        x = startX = nx;
        y = startY = ny;
        cubicControl = undefined;
        quadControl = undefined;
        // Further pairs after a moveto are linetos.
        previous = relative ? 'l' : 'L';
        continue;
      }
      case 'L': {
        const nx = number() + ox;
        const ny = number() + oy;
        to([[nx, ny]], nx, ny);
        break;
      }
      case 'H': {
        const nx = number() + ox;
        to([[nx, y]], nx, y);
        break;
      }
      case 'V': {
        const ny = number() + oy;
        to([[x, ny]], x, ny);
        break;
      }
      case 'C': {
        const c1: Point = [number() + ox, number() + oy];
        const c2: Point = [number() + ox, number() + oy];
        const end: Point = [number() + ox, number() + oy];
        to(cubicPoints([x, y], c1, c2, end), end[0], end[1]);
        nextCubic = c2;
        break;
      }
      case 'S': {
        const c1: Point = cubicControl
          ? [2 * x - cubicControl[0], 2 * y - cubicControl[1]]
          : [x, y];
        const c2: Point = [number() + ox, number() + oy];
        const end: Point = [number() + ox, number() + oy];
        to(cubicPoints([x, y], c1, c2, end), end[0], end[1]);
        nextCubic = c2;
        break;
      }
      case 'Q': {
        const c: Point = [number() + ox, number() + oy];
        const end: Point = [number() + ox, number() + oy];
        to(quadPoints([x, y], c, end), end[0], end[1]);
        nextQuad = c;
        break;
      }
      case 'T': {
        const c: Point = quadControl ? [2 * x - quadControl[0], 2 * y - quadControl[1]] : [x, y];
        const end: Point = [number() + ox, number() + oy];
        to(quadPoints([x, y], c, end), end[0], end[1]);
        nextQuad = c;
        break;
      }
      case 'A': {
        const rx = number();
        const ry = number();
        const rotation = number();
        const large = flag();
        const sweep = flag();
        const nx = number() + ox;
        const ny = number() + oy;
        to(arcPoints(x, y, rx, ry, rotation, large, sweep, nx, ny), nx, ny);
        break;
      }
      case 'Z': {
        open().closed = true;
        x = startX;
        y = startY;
        break;
      }
      default:
        throw new Error(`Unknown path command "${command}" in "${d}"`);
    }
    cubicControl = nextCubic;
    quadControl = nextQuad;
    previous = command;
  }
  return subpaths;
};

const ellipsePoints = (cx: number, cy: number, rx: number, ry: number, steps = 180): Point[] => {
  const points: Point[] = [];
  for (let k = 0; k < steps; k++) {
    const t = (2 * Math.PI * k) / steps;
    points.push([cx + rx * Math.cos(t), cy + ry * Math.sin(t)]);
  }
  return points;
};

const parsePoints = (value: unknown): Point[] => {
  const numbers = String(value ?? '')
    .trim()
    .split(/[\s,]+/)
    .filter(Boolean)
    .map(Number);
  const points: Point[] = [];
  for (let k = 0; k + 1 < numbers.length; k += 2) points.push([numbers[k]!, numbers[k + 1]!]);
  return points;
};

/** The outline of a shape element, from its type and props; `undefined` for anything else. */
export const outline = (type: unknown, props: Record<string, unknown>): Outline | undefined => {
  if (!isShape(type)) return undefined;
  switch (type) {
    case 'circle': {
      const r = num(props['r']);
      const points = ellipsePoints(num(props['cx']), num(props['cy']), r, r);
      return { points, closed: true, length: 2 * Math.PI * r, subpaths: 1 };
    }
    case 'ellipse': {
      const rx = num(props['rx']);
      const ry = num(props['ry']);
      const points = ellipsePoints(num(props['cx']), num(props['cy']), rx, ry);
      // Ramanujan's approximation, well inside a hundredth of a unit at icon sizes.
      const h = 3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (rx + 3 * ry));
      return { points, closed: true, length: Math.PI * h, subpaths: 1 };
    }
    case 'line': {
      const points: Point[] = [
        [num(props['x1']), num(props['y1'])],
        [num(props['x2']), num(props['y2'])],
      ];
      return { points, closed: false, length: polylineLength(points, false), subpaths: 1 };
    }
    case 'polyline':
    case 'polygon': {
      const points = parsePoints(props['points']);
      const closed = type === 'polygon';
      return { points, closed, length: polylineLength(points, closed), subpaths: 1 };
    }
    case 'rect':
    case 'path': {
      const d = type === 'rect' ? rectPath(props) : String(props['d'] ?? '');
      const drawing = flattenPath(d).filter(subpath => subpath.points.length > 1);
      const first = drawing[0] ?? { points: [], closed: false };
      return {
        points: first.points,
        closed: first.closed,
        length: polylineLength(first.points, first.closed),
        subpaths: drawing.length,
      };
    }
  }
};

/**
 * Where on an outline the point nearest `target` is: its distance along the outline from the
 * start, and how far `target` is from it.
 */
export const locate = (shape: Outline, target: Point): { at: number; distance: number } => {
  const { points, closed } = shape;
  const flat = polylineLength(points, closed);
  let best = { at: 0, distance: Infinity };
  let travelled = 0;
  const segments = closed ? points.length : points.length - 1;
  for (let k = 0; k < segments; k++) {
    const a = points[k]!;
    const b = points[(k + 1) % points.length]!;
    const abx = b[0] - a[0];
    const aby = b[1] - a[1];
    const span = Math.hypot(abx, aby);
    const t =
      span === 0
        ? 0
        : Math.min(
            1,
            Math.max(0, ((target[0] - a[0]) * abx + (target[1] - a[1]) * aby) / (span * span)),
          );
    const gap = Math.hypot(a[0] + abx * t - target[0], a[1] + aby * t - target[1]);
    if (gap < best.distance) best = { at: travelled + span * t, distance: gap };
    travelled += span;
  }
  // Positions are measured on the flattened points; scale them onto the exact length.
  return { at: flat === 0 ? 0 : (best.at * shape.length) / flat, distance: best.distance };
};
