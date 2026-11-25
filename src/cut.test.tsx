import { createElement, type ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { GAP, MIN_DASH, cut, planCut } from './cut.js';
import { flattenPath, locate, outline, rectPath } from './geometry.js';

const dashes = (element: ReactElement) => {
  const props = element.props as Record<string, unknown>;
  return {
    pathLength: props['pathLength'] as number,
    array: String(props['strokeDasharray']).split(' ').map(Number),
    offset: props['strokeDashoffset'] as number,
  };
};

/**
 * The stretches of the outline a dash pattern leaves empty, as [start, end) positions measured from
 * where the outline starts. One that straddles the start of a closed shape runs past its length.
 */
const gapsOf = (element: ReactElement): [number, number][] => {
  const { pathLength, array, offset } = dashes(element);
  const gaps: [number, number][] = [];
  let position = -offset;
  for (let lap = 0; lap < 3; lap++) {
    for (let k = 0; k < array.length; k++) {
      const next = position + array[k]!;
      if (k % 2 === 1) gaps.push([position, next]);
      position = next;
    }
  }
  return gaps.filter(([a, b]) => b > 0 && a < pathLength);
};

describe('outline', () => {
  it('measures a circle exactly, from 3 o’clock, clockwise', () => {
    const circle = outline('circle', { cx: 12, cy: 12, r: 9 })!;
    expect(circle.length).toBeCloseTo(2 * Math.PI * 9, 10);
    expect(circle.closed).toBe(true);
    expect(locate(circle, [21, 12]).at).toBeCloseTo(0, 6);
    // The positive angle runs down the screen first.
    expect(locate(circle, [12, 21]).at).toBeCloseTo(circle.length / 4, 2);
  });

  it('draws a rect as the path SVG defines for it, from its top edge', () => {
    expect(rectPath({ x: 4, y: 4, width: 16, height: 16, rx: 2 })).toBe(
      'M6 4H18A2 2 0 0 1 20 6V18A2 2 0 0 1 18 20H6A2 2 0 0 1 4 18V6A2 2 0 0 1 6 4Z',
    );
    expect(rectPath({ x: 4, y: 5, width: 10, height: 8 })).toBe('M4 5H14V13H4Z');
    const rect = outline('rect', { x: 4, y: 4, width: 16, height: 16, rx: 2 })!;
    expect(rect.length).toBeCloseTo(4 * 12 + 2 * Math.PI * 2, 2);
  });

  it('reads relative and absolute commands, repeats, and an arc with packed flags', () => {
    const [subpath] = flattenPath('m2 2 4 0v4H2z');
    expect(subpath!.points).toEqual([
      [2, 2],
      [6, 2],
      [6, 6],
      [2, 6],
    ]);
    expect(subpath!.closed).toBe(true);
    const arc = flattenPath('M3 12a9 9 0 1018 0')[0]!;
    expect(arc.points.at(-1)).toEqual([21, 12]);
  });

  it('counts a moveto with nothing drawn as no subpath, as Tabler’s circle idiom has', () => {
    const idiom = outline('path', { d: 'M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0' })!;
    expect(idiom.subpaths).toBe(1);
    expect(idiom.length).toBeCloseTo(2 * Math.PI * 3, 1);
    expect(outline('path', { d: 'M4 6h16M4 12h16' })!.subpaths).toBe(2);
  });

  it('reflects the previous control point for S and T', () => {
    const smooth = flattenPath('M0 0C0 4 4 4 4 0S8 -4 8 0')[0]!;
    const explicit = flattenPath('M0 0C0 4 4 4 4 0C4 -4 8 -4 8 0')[0]!;
    expect(smooth.points).toEqual(explicit.points);
  });

  it('is undefined for anything but a shape', () => {
    expect(outline('g', {})).toBeUndefined();
  });
});

describe('planCut', () => {
  const circle = createElement('circle', { cx: 12, cy: 12, r: 9 });

  it('centres a gap of the default width plus the caps on the nearest point of the outline', () => {
    const { element, problems } = planCut(circle, { near: [21, 12] });
    expect(problems).toEqual([]);
    const length = 2 * Math.PI * 9;
    const { pathLength, array } = dashes(element);
    expect(pathLength).toBeCloseTo(length, 2);
    expect(array.reduce((sum, n) => sum + n, 0)).toBeCloseTo(pathLength, 6);
    // The gap straddles the start, so it is the one that runs past the end.
    const gap = gapsOf(element).find(([a, b]) => a < length && b > length);
    expect(gap![1] - gap![0]).toBeCloseTo(GAP + 2, 2);
    expect((gap![0] + gap![1]) / 2).toBeCloseTo(length, 1);
  });

  it('cuts several gaps, each where it was asked for', () => {
    const { element, problems } = planCut(circle, {
      near: [
        [12, 21],
        [3, 12],
      ],
      gap: 2,
    });
    expect(problems).toEqual([]);
    const centres = gapsOf(element).map(([a, b]) => (a + b) / 2);
    const quarter = (2 * Math.PI * 9) / 4;
    expect(centres[0]).toBeCloseTo(quarter, 1);
    expect(centres[1]).toBeCloseTo(2 * quarter, 1);
  });

  it('never lets an open stroke’s gap reach its ends', () => {
    const line = createElement('path', { d: 'M4 12h16' });
    const fine = planCut(line, { near: [12, 12] });
    expect(fine.problems).toEqual([]);
    // x = 12 is 8 units along the line from x = 4.
    expect(gapsOf(fine.element)[0]).toEqual([5.5, 10.5]);
    const tooNear = planCut(line, { near: [19, 12] });
    expect(tooNear.problems.join()).toContain(`under ${MIN_DASH} units`);
  });

  it('cuts a rect as a path, so WebKit draws its corners right', () => {
    const rect = createElement('rect', { x: 4, y: 4, width: 16, height: 16, rx: 2 });
    const { element, problems } = planCut(rect, { near: [20, 12] });
    expect(problems).toEqual([]);
    expect(element.type).toBe('path');
    const props = element.props as Record<string, unknown>;
    expect(props['d']).toBe(rectPath({ x: 4, y: 4, width: 16, height: 16, rx: 2 }));
    expect(props).not.toHaveProperty('width');
  });

  it('keeps the element’s own props', () => {
    const part = createElement('path', { d: 'M4 12h16', 'data-m': 'shift', className: 'x' });
    expect(planCut(part, { near: [12, 12] }).element.props).toMatchObject({
      'data-m': 'shift',
      className: 'x',
    });
  });

  it('says what is wrong with a cut it cannot make', () => {
    expect(planCut(createElement('g'), { near: [12, 12] }).problems.join()).toContain(
      'a shape element',
    );
    expect(
      planCut(createElement('path', { d: 'M4 6h16M4 12h16' }), { near: [12, 6] }).problems.join(),
    ).toContain('2 drawing subpaths');
    expect(planCut(circle, { near: [12, 12] }).problems.join()).toContain('from the');
    expect(planCut(circle, { near: [21, 12], gap: 1 }).problems.join()).toContain('too narrow');
  });

  it('renders as round numbers that the server and the browser agree on', () => {
    const markup = renderToStaticMarkup(cut(circle, { near: [18.4, 5.6] }));
    for (const [, value] of markup.matchAll(/(?:pathLength|stroke-dash\w+)="([^"]+)"/g)) {
      for (const n of value!.split(' ')) expect(n).toMatch(/^\d+(\.\d{1,3})?$/);
    }
  });
});
