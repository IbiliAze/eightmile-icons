# 1. One drawing, three segments; groups are folders

Date: 2026-11-25
Status: Accepted

## Context

Eight Mile wants one icon library for its own site and for the products it builds, starting
with TicketOps and ACS. TicketOps already drew its own icons. Each is a hand drawing whose moving
parts carry their motion, so that a control's icon makes a small, soft gesture when the control
is hovered: a lid lifts, a cog turns. Some uses want an icon that stays still. Others want a
lighter, stylised one, the same drawing with its strokes broken by soft cuts. The set must also
be browsable in groups (Arrows, Content, Commerce…).

Three separately drawn sets would drift apart within weeks. A cut added by hand to a copy of a
drawing would not survive the next change to that drawing.

## Decision

**Every icon is one drawing. Each segment renders it with its own two helpers, and generated
modules expose each segment under the same names.**

- **The drawing.** A drawing is `icon((m, cut) => <>…</>)`:
  - `m(motion, options)` marks a moving part, as TicketOps did;
  - `cut(element, { near, gap? })` breaks one stroke;
  - the segment decides what each helper does.

  | Segment | `m`                                | `cut`               |
  | ------- | ---------------------------------- | ------------------- |
  | dynamic | marks the part (`data-m`, offsets) | returns the element |
  | static  | marks nothing                      | returns the element |
  | cropped | marks nothing                      | cuts                |

  The drawing imports nothing else. A part can't move in a still segment, and a cut can't appear
  outside cropped.

- **Evaluated once.** A segment evaluates its drawing once, when its module loads, and reuses
  the elements on every render. A drawing has no hook, so every segment renders in a Server
  Component.
- **How a cut works.** `cut` measures the element's outline in plain JS, with no DOM:
  - circles and ellipses by formula;
  - a rect as the path SVG defines for it;
  - a path by flattening it.

  It then sets `pathLength` to that length and centres each gap on the outline point nearest
  `near`. So a gap's size is in real units whatever the shape, and its place doesn't depend on
  where or which way the outline starts. The dash gap is the visible gap plus the stroke, because
  each round cap reaches half the stroke into it. That rounded end is what makes the cut soft.
  Numbers are rounded to thousandths, so the server's markup and the browser's agree.

- **Brand marks are never cut.** They are official artwork, so their cropped form is their static
  one.
- **Groups are folders.** `src/icons/<group>/<name>.tsx`. `src/groups.ts` lists the groups, and
  the generator refuses a folder that isn't one. A group is metadata (the manifest, the gallery),
  not an import path. The segment is the only import path, because swapping a segment is a real
  choice a page makes, while swapping a group is not.
- **One generated module per icon per segment, in `dist`.** After `tsc`,
  `scripts/generate.mjs` writes `dist/<segment>/Icon<Name>.js` and its `.d.ts`. Each imports its
  segment's factory directly, never the root entry. It also writes a re-export barrel per segment
  and a manifest of strings. That shape lets webpack, Turbopack and Next's
  `optimizePackageImports` keep only the icons a page uses. Nothing generated lives in `src`, so
  nothing in `src` goes stale.
- **TicketOps's drawings, conventions and names are kept.** The names are Tabler's wherever Tabler
  has the icon. The motion CSS is TicketOps's, renamed `emi-*`.

## Consequences

- A change to a drawing changes all three segments at once.
- A new icon means a motion and a cut to choose, as well as a drawing. The gallery shows the three
  side by side, and `planCut` reports a cut that is too near an end or leaves too short a piece.
- A gap's position comes from a point the drawing names. Moving the outline under it moves the
  gap with it, and a point left too far from the outline is reported.
- The visible gap is exact at stroke 2 and shifts with the stroke: 0.2 units wider at 1.8, 0.4
  narrower at 2.4. Exact gaps at every stroke would mean a cache per stroke for a difference
  nobody sees.
- Icons made only of dots (the grip and the grid) look the same in cropped as in static.

## Alternatives considered

- **Three hand-maintained sets.** No machinery, but three times the drawing and nothing to keep
  them alike.
- **One JSX tree cloned and rewritten per segment.** The drawing would read like TicketOps's. But
  rewriting fights React's frozen props, and it can't see inside a part drawn by a component.
- **Cuts as a CSS mask, or as dashes sized as a fraction of the shape.** A mask cuts square or
  scooped ends, not soft ones. A fraction gives a 9-unit gap on a circle and none on a chevron.
- **Generated sources committed to `src`.** Every new icon would add three generated files to a
  review, and a stale one would still compile.
