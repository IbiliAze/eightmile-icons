---
name: add-icon
description: Draw a new icon, or change an icon's drawing, its hover motion, its cut or its group, in @eightmile/icons. Use when a consumer needs an icon the package does not have, when an icon reads badly at small sizes, or when asked to change how an icon moves or where it is cut.
---

# Draw or change an icon

## Before you start (read, in order)

1. [`AGENTS.md`](../../../AGENTS.md): the six rules, each held by a test.
2. [ADR 0001](../../../docs/adr/0001-one-drawing-three-segments.md): why one drawing makes three
   segments, and how a cut is measured.
3. [`src/motion.ts`](../../../src/motion.ts) for the motions, and
   [`src/motion.css`](../../../src/motion.css) for what each does.
4. Three drawings, from simple to involved:
   - [`arrows/arrow-left`](../../../src/icons/arrows/arrow-left.tsx): one `shift`, the shaft cut in
     the middle;
   - [`actions/trash`](../../../src/icons/actions/trash.tsx): a lid lifting about its own pivot;
   - [`communication/bell`](../../../src/icons/communication/bell.tsx): two parts on one motion,
     the second delayed.

## Steps

1. **Name it, and pick its group.**
   - The file is `src/icons/<group>/<kebab-name>.tsx`.
   - The export is `Icon<PascalName>`. A digit gets its own segment: `clock-hour-4` →
     `IconClockHour4`.
   - Use Tabler's name if Tabler has the icon. Consumers moving off Tabler then change only an
     import path.
   - The group is a folder listed in `src/groups.ts`. Add a group there, with its label, only for
     icons that fit none of the others: Food joins with its first icon.
2. **Draw it on the 24-unit grid,** at the default stroke of 2. The svg sets round caps and joins.
   - **Live area.** Keep to 2–22 and let nothing pass 24.
   - **Proportions.** Circles are r 9 about the centre. Boxes are about 16 square with r 2. Arrows
     are 14 long.
   - **Dots.** A dot is `<path d="M12 8h.01" />`. A dot that must read at 14px, as in a grid, is
     `<circle r="1" />`.
   - **Brand marks.** Only a brand mark is filled (`icon(…, { fill: true })`). It is the brand's
     own path from simple-icons, unaltered and scaled to 84 % about the centre:
     `transform="translate(1.92 1.92) scale(0.84)"`. Its doc comment names the simple-icons
     version. Add its owner to `NOTICE`.
   - **Imports.** The module imports only `icon` from `../../icon.js`, and has no hook and no
     `'use client'`.
3. **Choose what moves.** Every icon has at least one part with `{...m(motion, options)}`. Wrap
   several elements in a `<g>` to move them together. Pick the motion by what the icon means:
   - **`shift`** holds while hovered. Use it for anything with a direction: arrows, chevrons, a
     lid, a shackle, a page feeding out.
   - **`hop`** or **`pop`** for an object answering the pointer: a hop, a tilt, a swell.
   - **`spin`** for something that turns. The angle must be a symmetry of the part, because it
     snaps back: 360 for a refresh, 90 for a four-way cog, 180 for a pair of arrows.
   - **`swing`** for something hanging or rocking (a bag, a bell), about its pivot.
   - **`shake`** for a warning, a refusal, a ring, a buzz.
   - **`draw`** to redraw a stroke: a tick, a chart line, a signal's arcs. Put it on a `path`,
     `line`, `circle` or `rect`, not on a `g`.
   - **`blink`** for an eye, a light, a cursor, a coin flipping.
4. **Set the pivot and the offsets.**
   - `o: [x, y]` is the pivot in grid units: the hinge of a lid, the handle of a bag, the centre
     of a cog. It defaults to the centre of the box.
   - Offsets of 1–2 units and turns of 6–15° read as soft at 18px. More looks like a glitch.
   - `d` staggers parts by 50–90ms.
5. **Cut it.** Wrap the stroke to break in `cut()`: `{cut(<circle cx="12" cy="12" r="9" />, { near: [18.4, 5.6] })}`.
   - **Which stroke.** The dominant outline, usually the longest. It must be a single shape
     element with one drawing subpath. Split `M5 12h14M12 5v14` into two paths, and move a
     motion that was on the joined path onto a `g` around them.
   - **Where.** `near` is a point; the gap centres on the outline point nearest it.
     - Prefer the upper right of the shape, on a straight run or the shoulder of a curve.
     - Keep it away from corners, where a gap only shortens the corner.
     - Keep it away from where another part touches.
     - On an arrow, cut the shaft, not near the head; on a chevron, cut the vertex; on a letter,
       cut where the letter still reads: the C's back, the A's shoulder, never the P's bowl.
   - **How wide.** The default gap of 3 is right almost everywhere. Use `gap: 2` on a small ring,
     such as a cog's hub.
   - **What is reported.** `planCut` reports a piece under 3 units, a gap reaching an open
     stroke's end, a `near` more than 1.5 from the outline, or a shape it cannot cut. The tests
     require none.
   - **What is never cut.** A brand mark, and an icon with no stroke of 11 units, the least a cut
     takes: one made only of dots, or of dashes, as the dashed circle is. The test measures each
     subpath of a path as its own stroke, so a long stroke can't pass uncut behind a short one.
     Don't break a stroke into dashes to dodge a cut; draw dashes only where the icon means them.
6. **Look at it.** Run `npm run gallery` and open `gallery.html`.
   - `?only=Kite` shows just that icon, with its three segments side by side.
   - `?segment=cropped` judges the cut at 52px. Then check that it still reads as a gap, not a
     stray dot, at 18 and 14.
   - `?frame=0.35` freezes every motion 35 % in. The icon must still mean the same thing mid-motion.
   - `?dark` shows the dark scheme.

   For a headless look, render it to a PNG:
   `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --force-device-scale-factor=2 --screenshot=out.png --window-size=1000,400 "file://$PWD/gallery.html?only=Kite"`

7. **Test.** `npm test` builds, then checks the icon:
   - name, group and box;
   - its moving part;
   - that the still segments are clean;
   - its cut, including the length against an independent measure;
   - the dist contract.
8. **Record it.** Add the icon under **Unreleased** in `CHANGELOG.md`, in the same commit.

## Pitfalls

- **A part's own `transform` attribute is overridden** by the motion's CSS transform. Put a
  static transform on an inner `<g>`, as the brand marks do.
- **`cut()` on a `<g>` is refused.** `stroke-dasharray` is inherited and `pathLength` is not, so
  every child would be dashed against the wrong length.
- **A new motion** goes in `MOTIONS`, then in `motion.css`, inside the
  `prefers-reduced-motion: no-preference` block with the host selector. Its keyframe must start
  and end at rest; a gesture that ends away from rest snaps when the animation is removed.
- **Moving a stroke moves its gap.** If an edit puts `near` further than 1.5 from the outline, the
  tests say so. Re-place it rather than widening the tolerance.

## Done when

```bash
npm run format:check && npm run typecheck && npm test
```

The icon is in the gallery, reads at 14 and 18px in both schemes and all three segments, and
moves when its card is hovered and when it is tabbed to.
