// Writes gallery.html: every icon, group by group, in its three segments side by side, each in a
// button so hovering or tabbing to a card plays the dynamic one's motion. It reads the built
// `dist`, so `npm run gallery` builds first.
//
// The page is a fragment, with no html, head or body of its own: a browser opens it as it is,
// and it can be published as a page that wraps it. The controls on the page switch the segment
// and freeze the motion. For headless screenshots, the same switches take query parameters:
//
//   gallery.html?segment=cropped            one segment only, larger
//   gallery.html?group=arrows,actions       only those groups
//   gallery.html?only=Trash,Bell            only those icons
//   gallery.html?frame=0.35                 every motion frozen 35 % in
//   gallery.html?dark                       the dark scheme
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const load = path => import(pathToFileURL(join(root, 'dist', path)).href);
const [{ GROUPS }, { ICONS }, dynamic, still, cropped, pkg] = await Promise.all([
  load('groups.js'),
  load('manifest.js'),
  load('dynamic/index.js'),
  load('static/index.js'),
  load('cropped/index.js'),
  import(pathToFileURL(join(root, 'package.json')).href, { with: { type: 'json' } }),
]);
const SEGMENTS = { dynamic, static: still, cropped };
const motionCss = readFileSync(join(root, 'dist/motion.css'), 'utf8');
const render = (Icon, props) => renderToStaticMarkup(h(Icon, props));
const version = pkg.default.version;

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

const groups = GROUPS.map(group => ({
  ...group,
  members: ICONS.filter(entry => entry.group === group.id),
})).filter(group => group.members.length > 0);

const sections = groups
  .map(
    group => `<section data-group="${group.id}" id="${group.id}">
  <h2>${group.label} <span>${group.members.length}</span></h2>
  <div class="grid">
  ${group.members.map(card).join('\n  ')}
  </div>
</section>`,
  )
  .join('\n');

const segmentButton = (value, label) =>
  `<button type="button" class="seg" data-set-segment="${value}" aria-pressed="false">${label}</button>`;

const html = `<meta charset="utf-8">
<title>Eight Mile Icons</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap">
<style id="motion">${motionCss}</style>
<style>
  /* Eight Mile's own ground: porcelain and amber ink in light, espresso and amber in dark. Cards are
     the sheets the icons sit on; the three segments share one card so they can be compared. */
  :root {
    --bg: #f6f1e8; --card: #fffdf8; --ink: #1d150c; --mist: #4f4437; --quiet: #6b5f50;
    --line: #e6dccc; --accent: #8a5300; --amber: #ffa800; --on-amber: #1d150c;
    --face: 'Outfit', ui-sans-serif, system-ui, sans-serif;
    --mono: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme='light']) {
      --bg: #120d07; --card: #1c150d; --ink: #f5efe3; --mist: #d9ccb8; --quiet: #b3a48e;
      --line: #33281b; --accent: #ffa800; --amber: #ffa800; --on-amber: #140e05; color-scheme: dark;
    }
  }
  :root[data-theme='dark'] {
    --bg: #120d07; --card: #1c150d; --ink: #f5efe3; --mist: #d9ccb8; --quiet: #b3a48e;
    --line: #33281b; --accent: #ffa800; --amber: #ffa800; --on-amber: #140e05; color-scheme: dark;
  }
  * { box-sizing: border-box; }
  body {
    background: var(--bg); color: var(--ink); font: 14px/1.45 var(--face);
    padding-left: max(16px, env(safe-area-inset-left, 0px));
    padding-right: max(16px, env(safe-area-inset-right, 0px));
    padding-block: 28px 56px;
  }
  .wrap { max-width: 1440px; margin: 0 auto; }
  header { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 16px 32px; }
  h1 { font-size: 26px; font-weight: 700; margin: 0; text-wrap: balance; }
  .lede { margin: 6px 0 0; color: var(--mist); max-width: 62ch; }
  .meta { font: 12px var(--mono); color: var(--quiet); letter-spacing: 0.04em; margin-top: 8px; }
  .controls { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
  .segments { display: inline-flex; padding: 3px; border: 1px solid var(--line); border-radius: 999px; background: var(--card); }
  .seg, .freeze {
    font: 600 13px var(--face); color: var(--mist); background: none; border: 0; border-radius: 999px;
    padding: 7px 14px; cursor: pointer;
  }
  .seg[aria-pressed='true'] { background: var(--amber); color: var(--on-amber); }
  .freeze { border: 1px solid var(--line); background: var(--card); }
  .freeze[aria-pressed='true'] { border-color: var(--accent); color: var(--accent); }
  .seg:focus-visible, .freeze:focus-visible, .cell:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  nav.groups { display: flex; flex-wrap: wrap; gap: 6px 14px; margin: 22px 0 4px; font-size: 13px; }
  nav.groups a { color: var(--quiet); text-decoration: none; }
  nav.groups a:hover { color: var(--accent); }
  h2 { font-size: 16px; font-weight: 700; margin: 30px 0 12px; }
  h2 span { color: var(--quiet); font-weight: 400; font-variant-numeric: tabular-nums; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(212px, 1fr)); gap: 10px; }
  .cell {
    display: flex; flex-direction: column; align-items: center; gap: 6px; min-width: 0;
    padding: 12px 8px 10px; border: 1px solid var(--line); border-radius: 14px;
    background: var(--card); color: var(--ink); cursor: pointer; font: inherit;
  }
  .cell:hover, .cell.hot { border-color: var(--accent); color: var(--accent); }
  .cols { display: flex; gap: 10px; }
  .col { display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .small { display: flex; align-items: center; gap: 6px; min-height: 18px; }
  .tag { font: 10px var(--mono); color: var(--quiet); letter-spacing: 0.06em; text-transform: uppercase; }
  .name { color: var(--quiet); font-size: 12px; }
  body[data-segment] .col:not([data-active]) { display: none; }
  body[data-segment] .grid { grid-template-columns: repeat(auto-fill, minmax(116px, 1fr)); }
  body[data-segment] .big svg { width: 52px; height: 52px; }
  body[data-segment] .tag { display: none; }
  footer { margin-top: 36px; color: var(--quiet); font-size: 12px; }
</style>
<div class="wrap">
<header>
  <div>
    <h1>Eight Mile Icons</h1>
    <p class="lede">Every icon in its three segments: <strong>dynamic</strong>, whose parts move when its button is hovered or focused; <strong>static</strong>; and <strong>cropped</strong>, broken by soft cuts. Hover or tab to a card to play its motion. Sizes 40, 18 and 14.</p>
    <p class="meta">@eightmile/icons ${version} &middot; ${ICONS.length} icons &middot; ${groups.length} groups</p>
  </div>
  <div class="controls">
    <div class="segments" role="group" aria-label="Segment">
      ${segmentButton('', 'All three')}${segmentButton('dynamic', 'Dynamic')}${segmentButton('static', 'Static')}${segmentButton('cropped', 'Cropped')}
    </div>
    <button type="button" class="freeze" aria-pressed="false">Freeze motion</button>
  </div>
</header>
<nav class="groups" aria-label="Groups">${groups.map(group => `<a href="#${group.id}">${group.label}</a>`).join('')}</nav>
${sections}
<footer>Brand marks are their owners' trademarks and are never cut; icons made only of dots have nothing to cut.</footer>
</div>
<script>
  const q = new URLSearchParams(location.search);
  const motion = document.getElementById('motion');
  const hostRule = ':where(:hover, :focus-visible)';
  const frozen = document.createElement('style');
  const pressed = (el, on) => el.setAttribute('aria-pressed', on ? 'true' : 'false');

  function setSegment(segment) {
    if (segment) document.body.dataset.segment = segment;
    else delete document.body.dataset.segment;
    document.querySelectorAll('.col').forEach(col => {
      if (col.dataset.col === segment) col.dataset.active = '';
      else delete col.dataset.active;
    });
    document.querySelectorAll('[data-set-segment]').forEach(b => pressed(b, b.dataset.setSegment === segment));
  }

  function freeze(at) {
    const on = at !== null;
    motion.textContent = on ? motion.textContent.replaceAll(hostRule, '.hot') : motion.textContent.replaceAll('.hot', hostRule);
    frozen.textContent = on
      ? '.emi-icon [data-m] { transition: none !important; animation-duration: 1s !important; animation-delay: ' + -at + 's !important; animation-play-state: paused !important; }'
      : '';
    if (on) document.head.append(frozen);
    document.querySelectorAll('.cell').forEach(cell => cell.classList.toggle('hot', on));
    pressed(document.querySelector('.freeze'), on);
  }

  document.querySelectorAll('[data-set-segment]').forEach(b => b.addEventListener('click', () => setSegment(b.dataset.setSegment)));
  document.querySelector('.freeze').addEventListener('click', e => freeze(e.currentTarget.getAttribute('aria-pressed') === 'true' ? null : 0.35));

  if (q.has('dark')) document.documentElement.dataset.theme = 'dark';
  setSegment(q.get('segment') || '');
  if (q.has('group')) {
    const keep = new Set(q.get('group').split(','));
    document.querySelectorAll('section').forEach(section => { if (!keep.has(section.dataset.group)) section.remove(); });
  }
  if (q.has('only')) {
    const only = new Set(q.get('only').split(','));
    document.querySelectorAll('.cell').forEach(cell => { if (!only.has(cell.dataset.name)) cell.remove(); });
    document.querySelectorAll('section').forEach(section => { if (!section.querySelector('.cell')) section.remove(); });
  }
  if (q.has('frame')) freeze(Number(q.get('frame') || 0.35));
</script>
`;

writeFileSync(join(root, 'gallery.html'), html);
console.log(`gallery.html: ${ICONS.length} icons in ${groups.length} groups`);
