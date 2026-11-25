// Writes the package's entry points into `dist`, after `tsc` has compiled `src`: for every drawing in
// `src/icons/<group>/<name>.tsx`, one module per segment (`dist/<segment>/Icon<Name>.js` and its
// `.d.ts`), a barrel per segment, and `dist/manifest.js`, which lists them. One module per icon is
// what lets a consumer's bundler drop every icon it does not import; each imports its segment's
// factory directly, never the root entry. Then it copies `motion.css`.
//
// It fails on a folder that is not a group, a name that is not kebab-case, or a name used twice.
import { copyFileSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'src');
const dist = join(root, 'dist');

const { GROUPS } = await import(pathToFileURL(join(dist, 'groups.js')).href);
const { SEGMENTS, pascal } = await import(pathToFileURL(join(dist, 'render.js')).href);
const known = new Set(GROUPS.map(group => group.id));
const FACTORY = { dynamic: 'dynamicIcon', static: 'staticIcon', cropped: 'croppedIcon' };

const icons = [];
const seen = new Map();
for (const group of readdirSync(join(src, 'icons')).sort()) {
  if (!statSync(join(src, 'icons', group)).isDirectory()) continue;
  if (!known.has(group)) {
    throw new Error(`src/icons/${group} is not a group; add it to src/groups.ts or move its icons`);
  }
  for (const file of readdirSync(join(src, 'icons', group)).sort()) {
    if (!file.endsWith('.tsx')) continue;
    const name = file.slice(0, -'.tsx'.length);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) throw new Error(`${group}/${file}: not kebab-case`);
    if (seen.has(name)) throw new Error(`"${name}" is in both ${seen.get(name)} and ${group}`);
    seen.set(name, group);
    const { default: source } = await import(
      pathToFileURL(join(dist, 'icons', group, `${name}.js`)).href
    );
    if (typeof source?.draw !== 'function') {
      throw new Error(`${group}/${file} must default-export icon(...)`);
    }
    icons.push({ name, group, exportName: `Icon${pascal(name)}`, brand: source.fill === true });
  }
}
icons.sort((a, b) => a.exportName.localeCompare(b.exportName));

for (const segment of SEGMENTS) {
  const dir = join(dist, segment);
  mkdirSync(dir, { recursive: true });
  for (const { name, group, exportName } of icons) {
    writeFileSync(
      join(dir, `${exportName}.js`),
      `import drawing from '../icons/${group}/${name}.js';\n` +
        `import { ${FACTORY[segment]} } from '../segments/${segment}.js';\n` +
        `export const ${exportName} = /*#__PURE__*/ ${FACTORY[segment]}(drawing, '${name}');\n`,
    );
    writeFileSync(
      join(dir, `${exportName}.d.ts`),
      `import type { Icon } from '../render.js';\nexport declare const ${exportName}: Icon;\n`,
    );
  }
  const barrel = icons
    .map(({ exportName }) => `export { ${exportName} } from './${exportName}.js';\n`)
    .join('');
  writeFileSync(join(dir, 'index.js'), barrel);
  writeFileSync(join(dir, 'index.d.ts'), barrel);
}

const entries = icons
  .map(
    ({ name, group, exportName, brand }) =>
      `  { name: '${name}', export: '${exportName}', group: '${group}', brand: ${brand} },\n`,
  )
  .join('');
writeFileSync(join(dist, 'manifest.js'), `export const ICONS = [\n${entries}];\n`);
writeFileSync(
  join(dist, 'manifest.d.ts'),
  `import type { Group } from './groups.js';\n` +
    `export type IconName =\n${icons.map(({ name }) => `  | '${name}'`).join('\n')};\n` +
    `export interface IconEntry {\n` +
    `  /** Kebab-case, as \`data-icon\` says it. */\n  readonly name: IconName;\n` +
    `  /** The export every segment has: \`import { IconTrash } from '@eightmile/icons/static'\`. */\n` +
    `  readonly export: \`Icon\${string}\`;\n  readonly group: Group;\n` +
    `  /** A filled brand mark, which is never altered: its cropped form is its static one. */\n` +
    `  readonly brand: boolean;\n}\n` +
    `export declare const ICONS: readonly IconEntry[];\n`,
);

copyFileSync(join(src, 'motion.css'), join(dist, 'motion.css'));
console.log(`${icons.length} icons × ${SEGMENTS.length} segments written to dist`);
