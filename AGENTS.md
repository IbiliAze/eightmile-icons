# eightmile-icons — conventions

`@eightmile/icons`: Eight Mile's icons, published to this GitLab project's package registry and
mirrored on GitHub. Every icon is one drawing, rendered in three segments: **dynamic** (parts
move when the icon's control is hovered or focused), **static** (still) and **cropped** (still,
with its strokes broken). `docs/adr/` says why it is built this way.

## Layout

| Path                              | What                                                                          |
| --------------------------------- | ----------------------------------------------------------------------------- |
| `src/icons/<group>/<name>.tsx`    | One drawing per icon. The folder is its group; the file name is its name      |
| `src/icon.ts`                     | `icon()`, the default export of every drawing                                 |
| `src/render.tsx`                  | Makes one segment of an icon: the svg, its props, `data-icon`                 |
| `src/segments/`                   | The three segments' factories; each imports only what it draws with           |
| `src/motion.ts`, `src/motion.css` | `m()`, which marks a moving part, and the CSS that moves it                   |
| `src/cut.ts`, `src/geometry.ts`   | `cut()`, which breaks a stroke in the cropped segment, and its measuring      |
| `src/groups.ts`                   | The groups, in gallery order                                                  |
| `scripts/generate.mjs`            | Writes the per-icon segment modules, the barrels and the manifest into `dist` |
| `scripts/gallery.mjs`             | Writes `gallery.html`, the review aid                                         |

`src` holds only hand-written code. The entry points consumers import are generated into `dist`
by `npm run build` and never committed.

## Commands

```bash
npm ci
npm run typecheck     # source and tests
npm test              # builds, then every icon in every segment, plus the dist contract
npm run gallery       # builds, then gallery.html
npm run format:check
```

## Rules

These are not preferences. Each has a test.

1. **One drawing, three segments.** A drawing is `export default icon((m, cut) => <>…</>)`. It
   imports nothing but `icon`: the helpers arrive as arguments, real in their own segment and
   no-ops in the others. That is what keeps motion out of the still segments and cuts out of
   all but cropped. A drawing has no hook and no `'use client'`; every icon renders on a server.
2. **Every icon moves in the dynamic segment.** At least one part carries `m(...)`, with a
   motion `motion.css` defines. Every rule that moves anything sits under
   `prefers-reduced-motion: no-preference`, and nothing moves inside a disabled control.
3. **Every icon is cut in the cropped segment,** with two exceptions:
   - A brand mark is official artwork: it is never cut, and its cropped markup is its static markup.
   - An icon with no stroke long enough to cut. A cut takes 11 units of one stroke: the 3-unit gap,
     a unit under each round cap, and a 3-unit piece either side. Dots are shorter, and so are the
     dashes of a dashed circle, whose own gaps already break it. Each subpath is its own stroke.

   A cut goes on one shape element with a single drawing subpath, never on a `g`. Each gap is
   3 units at stroke 2. Each piece of stroke it leaves is at least 3 units, and no gap reaches an
   open stroke's end. `planCut` reports any breach, and the tests require none.

4. **Names follow Tabler** where Tabler has the icon (`IconDeviceMobile`, `IconCoinPound`), so
   moving off `@tabler/icons-react` is an import path. The export is `Icon` plus the
   PascalCase of the file name; `data-icon` is the file name.
5. **One module per icon per segment,** generated, each importing its segment's factory and never
   the package root, so a bundler drops every icon a page does not import.
6. **Every coordinate stays inside the 24-unit box,** give or take the stroke.

## Drawing

Read `.claude/skills/add-icon` before drawing. It covers the grid, the motions, where a cut goes,
and how to review in the gallery. Brand marks come unaltered from simple-icons (CC0), scaled to
84 % about the centre; `NOTICE` names their owners.

## Conventions

- **Single quotes, 2-space indent, 100 columns, trailing commas.** Prettier enforces it.
- **Comments say why.** A drawing's doc comment says what moves, in one sentence.
- **Releases come from a tag.** The pipeline publishes `v<version>` from the tag's own tested
  build. Nothing is published by hand. See `.claude/skills/release`.
- **`CHANGELOG.md` is updated in the same commit as the change,** under **Unreleased**.
- **Two remotes.** `origin` pushes to GitHub and GitLab; check both after pushing.
