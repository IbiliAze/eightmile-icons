// Writes gallery.html: every icon, group by group, in its three segments side by side, each in a
// button so hovering a card plays the dynamic one's motion. It reads the built `dist`, so
// `npm run gallery` builds first.
//
//   gallery.html?dark                       the dark scheme
//   gallery.html?segment=cropped            one segment only, larger
//   gallery.html?group=arrows,actions       only those groups
//   gallery.html?only=Trash,Bell            only those icons
//   gallery.html?frame=0.35                 every motion frozen 35 % in (for screenshots)
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const load = path => import(pathToFileURL(join(root, 'dist', path)).href);
const [{ GROUPS }, { ICONS }, dynamic, still, cropped] = await Promise.all([
  load('groups.js'),
  load('manifest.js'),
  load('dynamic/index.js'),
  load('static/index.js'),
  load('cropped/index.js'),
]);
const SEGMENTS = { dynamic, static: still, cropped };
const motionCss = readFileSync(join(root, 'dist/motion.css'), 'utf8');
const render = (Icon, props) => renderToStaticMarkup(h(Icon, props));

const column = (segment, entry) => {
  const Icon = SEGMENTS[segment][entry.export];
  return `<span class="col" data-col="${segment}">
      <span class="big">${render(Icon, { size: 40, stroke: 1.8 })}</span>
      <span class="small">${render(Icon, { size: 18 })}${render(Icon, { size: 14 })}</span>
      <span class="tag">${segment}</span>
    </span>`;
};

const card =
  entry => `<button class="cell" type="button" title="${entry.export}" data-name="${entry.export.slice(4)}">
    <span class="cols">${Object.keys(SEGMENTS)
      .map(segment => column(segment, entry))
      .join('')}</span>
    <span class="name">${entry.export.slice(4)}</span>
  </button>`;

const sections = GROUPS.map(group => {
  const members = ICONS.filter(entry => entry.group === group.id);
  if (members.length === 0) return '';
  return `<section data-group="${group.id}">
  <h2>${group.label} <span>${members.length}</span></h2>
  <div class="grid">
  ${members.map(card).join('\n  ')}
  </div>
</section>`;
}).join('\n');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Eight Mile icons</title>
<style id="motion">${motionCss}</style>
<style>
  :root { --bg: #f7f4ee; --card: #fffdf9; --ink: #1d150c; --muted: #6b5f50; --line: #e7dfd2; --accent: #8a5300; }
  :root[data-theme='dark'] { --bg: #120d07; --card: #1c150d; --ink: #f5efe3; --muted: #b3a48e; --line: #2e2418; --accent: #ffa800; }
  * { box-sizing: border-box; }
  body { margin: 0; padding: 28px 20px 56px; background: var(--bg); color: var(--ink); font: 13px/1.4 system-ui, sans-serif; }
  h1 { font-size: 20px; margin: 0 0 4px; }
  p { margin: 0 0 24px; color: var(--muted); max-width: 70ch; }
  h2 { font-size: 15px; margin: 28px 0 12px; }
  h2 span { color: var(--muted); font-weight: 400; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(212px, 1fr)); gap: 10px; }
  .cell { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 12px 8px 10px; border: 1px solid var(--line);
    border-radius: 12px; background: var(--card); color: var(--ink); cursor: pointer; font: inherit; }
  .cell:hover, .cell:focus-visible, .cell.hot { border-color: var(--accent); color: var(--accent); outline: none; }
  .cols { display: flex; gap: 10px; }
  .col { display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .small { display: flex; align-items: center; gap: 6px; min-height: 18px; }
  .tag { font-size: 10px; color: var(--muted); letter-spacing: .04em; }
  .name { color: var(--muted); font-size: 12px; }
  body[data-segment] .col:not([data-active]) { display: none; }
  body[data-segment] .grid { grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); }
  body[data-segment] .big svg { width: 52px; height: 52px; }
</style>
</head>
<body>
<h1>Eight Mile icons — ${ICONS.length}</h1>
<p>Every icon in its three segments: dynamic, static and cropped. Hover or tab to a card to play the dynamic one's motion.
Sizes 40, 18 and 14.</p>
${sections}
<script>
  const q = new URLSearchParams(location.search);
  if (q.has('dark')) document.documentElement.dataset.theme = 'dark';
  if (q.has('segment')) {
    document.body.dataset.segment = q.get('segment');
    document.querySelectorAll('.col[data-col="' + q.get('segment') + '"]').forEach(col => (col.dataset.active = ''));
  }
  if (q.has('group')) {
    const groups = new Set(q.get('group').split(','));
    document.querySelectorAll('section').forEach(section => { if (!groups.has(section.dataset.group)) section.remove(); });
  }
  if (q.has('only')) {
    const only = new Set(q.get('only').split(','));
    document.querySelectorAll('.cell').forEach(cell => { if (!only.has(cell.dataset.name)) cell.remove(); });
    document.querySelectorAll('section').forEach(section => { if (!section.querySelector('.cell')) section.remove(); });
  }
  if (q.has('frame')) {
    const style = document.getElementById('motion');
    style.textContent = style.textContent.replaceAll(':where(:hover, :focus-visible)', '.hot');
    const frozen = document.createElement('style');
    frozen.textContent = '.emi-icon [data-m] { transition: none !important; animation-duration: 1s !important; ' +
      'animation-delay: ' + -Number(q.get('frame') || 0.35) + 's !important; animation-play-state: paused !important; }';
    document.head.append(frozen);
    document.querySelectorAll('.cell').forEach(cell => cell.classList.add('hot'));
  }
</script>
</body>
</html>
`;

writeFileSync(join(root, 'gallery.html'), html);
console.log(`gallery.html: ${ICONS.length} icons in ${GROUPS.length} groups`);
