import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Children, createElement, isValidElement, type ReactElement, type ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { svgPathProperties } from 'svg-path-properties';
import { describe, expect, it } from 'vitest';
import { createIcon } from './create.js';
import { GAP, MIN_DASH, planCut, type CutOptions } from './cut.js';
import { flattenPath, isShape, outline, polylineLength, rectPath } from './geometry.js';
import { GROUPS } from './groups.js';
import { icon, type IconSource } from './icon.js';
import { m, MOTIONS, still } from './motion.js';
import { pascal, SEGMENTS, type Icon, type Segment } from './render.js';
import { uncut } from './uncut.js';

const here = dirname(fileURLToPath(import.meta.url));
const css = readFileSync(join(here, 'motion.css'), 'utf8');
const modules = import.meta.glob<IconSource>('./icons/*/*.tsx', { eager: true, import: 'default' });

interface Drawing {
  path: string;
  group: string;
  name: string;
  exportName: string;
  source: IconSource;
}

const drawings: Drawing[] = Object.entries(modules)
  .map(([path, source]) => {
    const [, group = '', name = ''] = /^\.\/icons\/([^/]+)\/([^/]+)\.tsx$/.exec(path) ?? [];
    return { path, group, name, exportName: `Icon${pascal(name)}`, source };
  })
  .sort((a, b) => a.name.localeCompare(b.name));
const table = drawings.map(drawing => [drawing.exportName, drawing] as const);

const segment = (drawing: Drawing, which: Segment): Icon =>
  createIcon(drawing.source, drawing.name, which);
const render = (icon: Icon, props: Record<string, unknown> = {}) =>
  renderToStaticMarkup(createElement(icon, props));

/** Every shape element a drawing draws, in order. */
const shapesOf = (node: ReactNode): ReactElement[] => {
  const shapes: ReactElement[] = [];
  const walk = (children: ReactNode) =>
    Children.forEach(children, child => {
      if (!isValidElement(child)) return;
      if (isShape(child.type)) shapes.push(child);
      else walk((child.props as { children?: ReactNode }).children);
    });
  walk(node);
  return shapes;
};

/** The cuts a drawing asks for, with what planCut makes of each. */
const cutsOf = (source: IconSource) => {
  const cuts: { element: ReactElement; options: CutOptions; problems: readonly string[] }[] = [];
  source.draw(still, (element, options) => {
    const plan = planCut(element, options);
    cuts.push({ element, options, problems: plan.problems });
    return plan.element;
  });
  return cuts;
};

/**
 * The length of every stroke a shape draws: each drawing subpath of a path, the outline of any
 * other shape. A path's later subpaths count too, so a long stroke can't hide behind a dot.
 */
const strokeLengths = (shape: ReactElement): number[] => {
  const props = shape.props as Record<string, unknown>;
  if (shape.type === 'path') {
    return flattenPath(String(props['d'] ?? ''))
      .filter(subpath => subpath.points.length > 1)
      .map(subpath => polylineLength(subpath.points, subpath.closed));
  }
  const shapeOutline = outline(shape.type, props);
  return shapeOutline === undefined ? [] : [shapeOutline.length];
};

/** Has a stroke long enough for a gap and a piece of stroke either side of it. */
const cuttable = (source: IconSource) =>
  shapesOf(source.draw(still, uncut)).some(shape =>
    strokeLengths(shape).some(length => length >= GAP + 2 + 2 * MIN_DASH),
  );

describe('the set', () => {
  it('holds every icon', () => {
    expect(drawings.length).toBeGreaterThanOrEqual(163);
  });

  it('files every icon in a group, under a kebab-case name used once', () => {
    const groups: readonly string[] = GROUPS.map(group => group.id);
    const names = new Set<string>();
    for (const { group, name } of drawings) {
      expect(groups).toContain(group);
      expect(name).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(names.has(name)).toBe(false);
      names.add(name);
    }
  });

  it.each(table)(
    '%s says its name and segment, and is named for it, in every segment',
    (exportName, drawing) => {
      for (const which of SEGMENTS) {
        const icon = segment(drawing, which);
        const markup = render(icon);
        expect(markup).toContain(`data-icon="${drawing.name}"`);
        expect(markup).toContain(`data-segment="${which}"`);
        expect(icon.displayName).toBe(exportName);
      }
    },
  );

  it.each(table)('%s stays inside the 24-unit box, give or take its stroke', (_, drawing) => {
    for (const which of SEGMENTS) {
      const markup = render(segment(drawing, which));
      // The brand marks are scaled about the centre from the official 24-unit artwork.
      const numbers = [
        ...[...markup.matchAll(/ (?:cx|cy|x|y|x1|y1|x2|y2)="(-?[\d.]+)"/g)].map(match =>
          Number(match[1]),
        ),
        ...[...markup.matchAll(/ d="([^"]+)"/g)].flatMap(match => absolutes(match[1] ?? '')),
      ];
      for (const n of numbers) {
        expect(n).toBeGreaterThanOrEqual(-0.5);
        expect(n).toBeLessThanOrEqual(24.5);
      }
    }
  });

  it.each(table)('%s imports only icon(), and has no hook or client boundary', (_, drawing) => {
    const text = readFileSync(join(here, drawing.path), 'utf8');
    const imports = [...text.matchAll(/^import .* from '([^']+)';$/gm)].map(match => match[1]);
    expect(imports).toEqual(['../../icon.js']);
    expect(text).not.toMatch(/['"]use client['"]/);
    expect(text).not.toMatch(/\buse[A-Z]\w*\(/);
  });
});

describe('the dynamic segment', () => {
  it.each(table)('%s has a part that moves, with a motion motion.css defines', (_, drawing) => {
    const used = [...render(segment(drawing, 'dynamic')).matchAll(/data-m="([a-z]+)"/g)].map(
      match => match[1],
    );
    expect(used.length).toBeGreaterThan(0);
    for (const motion of used) expect(MOTIONS).toContain(motion);
  });

  it.each(table)('%s is not cut', (_, drawing) => {
    expect(render(segment(drawing, 'dynamic'))).not.toContain('stroke-dasharray');
  });
});

describe('the static segment', () => {
  it.each(table)('%s neither moves nor is cut', (_, drawing) => {
    const markup = render(segment(drawing, 'static'));
    expect(markup).not.toContain('data-m=');
    expect(markup).not.toContain('stroke-dasharray');
    expect(markup).not.toContain('pathLength');
  });
});

describe('the cropped segment', () => {
  it.each(table)('%s does not move', (_, drawing) => {
    expect(render(segment(drawing, 'cropped'))).not.toContain('data-m=');
  });

  it.each(table)('%s is cut, unless a brand mark or no stroke is long enough', (_, drawing) => {
    const markup = render(segment(drawing, 'cropped'));
    if (drawing.source.fill) {
      // A brand mark is the brand's own artwork and is never altered.
      const still = render(segment(drawing, 'static'));
      expect(markup.replace('data-segment="cropped"', '')).toBe(
        still.replace('data-segment="static"', ''),
      );
    } else if (cuttable(drawing.source)) {
      expect(cutsOf(drawing.source).length).toBeGreaterThan(0);
      expect(markup).toContain('stroke-dasharray');
    } else {
      expect(cutsOf(drawing.source)).toEqual([]);
    }
  });

  it('counts every stroke of a path, so a long one drawn after a dot is still owed a cut', () => {
    const drawn = (d: string) => icon(() => createElement('path', { d }));
    expect(cuttable(drawn('M12 8h.01M5 12h14'))).toBe(true);
    expect(cuttable(drawn('M5 6h.01M5 12h.01M5 18h.01'))).toBe(false);
  });

  it.each(table)('%s has only cuts that plan cleanly', (_, drawing) => {
    for (const { problems } of cutsOf(drawing.source)) expect(problems).toEqual([]);
  });

  it.each(table)('%s measures what it cuts as a browser does', (_, drawing) => {
    for (const { element } of cutsOf(drawing.source)) {
      const props = element.props as Record<string, unknown>;
      const measured = outline(element.type, props)!.length;
      if (element.type === 'path' || element.type === 'rect') {
        const d = element.type === 'rect' ? rectPath(props) : String(props['d']);
        const reference = new svgPathProperties(d).getTotalLength();
        expect(Math.abs(measured - reference) / reference).toBeLessThan(0.01);
      }
    }
  });
});

describe('motion.css', () => {
  it.each(MOTIONS)('moves a %s part, only without reduced motion', motion => {
    const reduced = css.slice(css.indexOf('@media (prefers-reduced-motion: no-preference)'));
    expect(reduced).toContain(`[data-m='${motion}']`);
  });

  it('defines every keyframe a gesture names', () => {
    for (const [, name] of css.matchAll(/animation: (emi-[a-z]+)/g)) {
      expect(css).toContain(`@keyframes ${name} `);
    }
  });

  it('moves nothing a disabled control holds', () => {
    expect(css).toContain(":not(:disabled, [data-disabled], [aria-disabled='true'])");
  });
});

describe('createIcon', () => {
  const trash = drawings.find(drawing => drawing.name === 'trash')!;
  const brandX = drawings.find(drawing => drawing.name === 'brand-x')!;

  it('draws Tabler-sized and stroked by default, in the current colour', () => {
    const markup = render(segment(trash, 'static'));
    expect(markup).toMatch(
      /^<svg [^>]*width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"/,
    );
    expect(markup).toContain('class="emi-icon"');
  });

  it('takes size, stroke, colour, class and style as the Tabler icons do', () => {
    const markup = render(segment(trash, 'dynamic'), {
      size: 18,
      stroke: 2.2,
      color: 'red',
      className: 'ask',
      style: { float: 'right' },
    });
    expect(markup).toContain('width="18" height="18"');
    expect(markup).toContain('stroke="red" stroke-width="2.2"');
    expect(markup).toContain('class="emi-icon ask"');
    expect(markup).toContain('style="float:right"');
  });

  it('is hidden from a screen reader unless it is named', () => {
    const icon = segment(trash, 'cropped');
    expect(render(icon)).toContain('aria-hidden="true"');
    expect(render(icon)).not.toContain('role=');
    const titled = render(icon, { title: 'Delete' });
    expect(titled).toContain('role="img"');
    expect(titled).toContain('<title>Delete</title>');
    expect(titled).not.toContain('aria-hidden');
    expect(render(icon, { 'aria-label': 'Delete' })).toContain('role="img"');
  });

  it('fills a brand mark in the colour and strokes nothing', () => {
    const markup = render(segment(brandX, 'dynamic'), { color: '#000', stroke: 3 });
    expect(markup).toContain('fill="#000" stroke="none"');
    expect(markup).not.toContain('stroke-width');
  });

  it('renders children after the drawing', () => {
    expect(
      render(segment(trash, 'static'), { children: createElement('circle', { r: 1 }) }),
    ).toMatch(/<circle r="1"><\/circle><\/svg>$/);
  });
});

describe('m', () => {
  it('writes only the offsets it is given, and the origin', () => {
    expect(m('shift', { x: -2, r: 90, o: [4, 7] })).toEqual({
      'data-m': 'shift',
      style: { transformOrigin: '4px 7px', '--emi-x': '-2px', '--emi-r': '90deg' },
    });
    expect(m('hop', { y: 0, s: 0.7, d: 60 }).style).toEqual({
      transformOrigin: '12px 12px',
      '--emi-y': '0px',
      '--emi-s': '0.7',
      '--emi-d': '60ms',
    });
  });

  it('gives a part that redraws a path length of 1', () => {
    expect(m('draw')).toMatchObject({ 'data-m': 'draw', pathLength: 1 });
    expect(m('spin')).not.toHaveProperty('pathLength');
  });

  it('marks nothing in the still segments', () => {
    expect(still('shift', { x: 2 })).toEqual({});
  });
});

/** The absolute coordinates in path data: those of the upper-case commands, which is all this check needs. */
const absolutes = (d: string): number[] => {
  const out: number[] = [];
  for (const [, command = '', args = ''] of d.matchAll(/([A-Za-z])([^A-Za-z]*)/g)) {
    if (command !== command.toUpperCase() || command === 'Z') continue;
    const nums = (args.match(/-?(?:\d+\.?\d*|\.\d+)(?:e-?\d+)?/g) ?? []).map(Number);
    // An arc's radii and flags are not coordinates; only its end point is.
    out.push(...(command === 'A' ? nums.filter((_, i) => i % 7 >= 5) : nums));
  }
  return out;
};
