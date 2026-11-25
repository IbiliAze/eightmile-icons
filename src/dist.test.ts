import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { describe, expect, it } from 'vitest';
import { SEGMENTS } from './render.js';

/**
 * The package as a consumer gets it. `npm test` builds first, so `dist` is this source's own build;
 * the paths are computed so that typechecking a clean checkout does not need one.
 */
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const load = (path: string) => import(pathToFileURL(join(dist, path)).href) as Promise<unknown>;

interface Entry {
  name: string;
  export: string;
  group: string;
  brand: boolean;
}

describe('dist', async () => {
  const { ICONS } = (await load('manifest.js')) as { ICONS: Entry[] };
  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as {
    exports: Record<string, string | { types: string; default: string }>;
  };

  it('lists one entry per drawing', () => {
    const drawings = readdirSync(join(root, 'src/icons'), { recursive: true }).filter(file =>
      String(file).endsWith('.tsx'),
    );
    expect(ICONS.length).toBe(drawings.length);
  });

  it.each(SEGMENTS)('exports every icon from the %s barrel, and nothing else', async segment => {
    const barrel = (await load(`${segment}/index.js`)) as Record<string, unknown>;
    expect(Object.keys(barrel).sort()).toEqual(ICONS.map(entry => entry.export).sort());
    const files = readdirSync(join(dist, segment)).filter(file => /^Icon.*\.js$/.test(file));
    expect(files.sort()).toEqual(ICONS.map(entry => `${entry.export}.js`).sort());
  });

  it('resolves every path the package exports to a file it ships', () => {
    for (const [path, target] of Object.entries(pkg.exports)) {
      const targets = typeof target === 'string' ? [target] : [target.types, target.default];
      for (const file of targets) {
        const concrete = path.endsWith('/*') ? file.replace('*', ICONS[0]!.export) : file;
        expect(existsSync(join(root, concrete)), `${path} → ${concrete}`).toBe(true);
      }
    }
  });

  it('keeps each icon module apart, importing its segment directly and never the root', () => {
    for (const segment of SEGMENTS) {
      const text = readFileSync(join(dist, segment, `${ICONS[0]!.export}.js`), 'utf8');
      expect(text).toContain(`from '../segments/${segment}.js'`);
      expect(text).not.toContain("from '../index.js'");
      expect(text).toContain('/*#__PURE__*/');
    }
  });

  it('ships the motion stylesheet', () => {
    expect(readFileSync(join(dist, 'motion.css'), 'utf8')).toContain('@keyframes emi-hop');
  });
});
