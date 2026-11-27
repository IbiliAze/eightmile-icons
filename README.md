# @eightmile/icons

Eight Mile's icons: 192 of them, in 15 groups. Each comes in three segments, and each segment
exports it under the same name, so changing segment means changing the import path.

| Segment     | What it is                                                                      | Import from                |
| ----------- | ------------------------------------------------------------------------------- | -------------------------- |
| **dynamic** | Its parts move when its control is hovered or focused: a lid lifts, a cog turns | `@eightmile/icons/dynamic` |
| **static**  | The same drawing, still                                                         | `@eightmile/icons/static`  |
| **cropped** | The still drawing with its strokes broken by one or two soft cuts               | `@eightmile/icons/cropped` |

Every icon is drawn on a 24-unit grid with round caps and joins. Its props are the same as
`@tabler/icons-react`'s, and so are its names wherever Tabler has the same icon.

## Install

The package is published to the package registry of the GitLab project
[`projects4833423/eightmile-icons`](https://gitlab.com/projects4833423/eightmile-icons), which
anyone can pull from without a token. Point the `@eightmile` scope at it.

**Yarn 4**, in `.yarnrc.yml`:

```yaml
npmScopes:
  eightmile:
    npmRegistryServer: 'https://gitlab.com/api/v4/projects/89463540/packages/npm/'
    # GitLab's package metadata carries no publish times. Yarn's default age gate (one day)
    # treats that as quarantined forever, so turn the gate off for this scope.
    npmMinimalAgeGate: 0
```

**npm, pnpm or Yarn 1**, in `.npmrc`:

```ini
@eightmile:registry=https://gitlab.com/api/v4/projects/89463540/packages/npm/
```

pnpm 11 gates new releases in the same way. Add `@eightmile/*` to `minimumReleaseAgeExclude` in
`pnpm-workspace.yaml`.

Then pin a version:

```json
"@eightmile/icons": "0.1.0"
```

## Use

```tsx
import { IconTrash } from '@eightmile/icons/dynamic';
import { IconMail } from '@eightmile/icons/static';

<Button leftSection={<IconTrash size={17} stroke={1.9} />}>Delete</Button>
<IconMail size={20} title="Email" />
```

The dynamic segment moves through one stylesheet. Import it once, globally:

```ts
import '@eightmile/icons/motion.css';
```

| Prop        | Default          |                                                                                              |
| ----------- | ---------------- | -------------------------------------------------------------------------------------------- |
| `size`      | `24`             | Width and height; a number is px                                                             |
| `stroke`    | `2`              | Line width in grid units. A brand mark is filled and ignores it                              |
| `color`     | `'currentColor'` | The lines, or a brand mark's fill                                                            |
| `title`     |                  | Names the icon to a screen reader. Without it, or an `aria-label`, the icon is `aria-hidden` |
| (any other) |                  | Passed to the `svg`: `className`, `style`, `data-*`…                                         |

Every icon renders `class="emi-icon"`, `data-icon="<name>"` (kebab-case, a stable test hook) and
`data-segment`. No icon has a hook or a `'use client'`, so all three segments render in React
Server Components.

### When a dynamic icon moves

A dynamic icon's parts move while its **control** is hovered or has keyboard focus. These are
controls:

- `a`, `button` and `label`;
- `summary`;
- anything with the role `button`, `tab`, `menuitem` or `option`;
- anything marked `data-icon-trigger`.

An icon that sits in no control stays still, and so does one in a disabled control (`:disabled`,
`data-disabled`, `aria-disabled="true"`). Nothing moves under `prefers-reduced-motion: reduce`.
A motion lasts about half a second, on a damped spring.

### The cropped segment

Each cut is a gap of about 3 grid units with soft (round) ends. It sits on the icon's dominant
outline, towards the upper right wherever the drawing allows, so the set shares one rhythm.

Some icons are never cut:

- **Brand marks** are official artwork, so a brand's cropped form is its static one.
- **Icons with no stroke long enough to cut,** such as a grid of dots or a dashed circle, have
  nothing to cut. A dashed circle's own gaps are its breaks.

## Groups

Arrows, Actions, Alerts, Communication, Content, Commerce, Data, Design, People, Places, Security,
System, Technology, Time and Brands. The list of icons, with each one's group, is importable:

```ts
import { ICONS } from '@eightmile/icons/manifest'; // [{ name, export, group, brand }, …]
import { GROUPS } from '@eightmile/icons';
```

## Developing

```bash
npm ci
npm test          # builds, then 1,900-odd tests over every icon in every segment
npm run gallery   # writes gallery.html: every icon, grouped, its three segments side by side
```

The gallery takes these query parameters:

- `?segment=cropped` shows one segment, larger.
- `?group=arrows,actions` shows only those groups.
- `?only=Trash,Bell` shows only those icons.
- `?dark` switches to the dark scheme.
- `?frame=0.35` freezes every motion 35 % of the way in.

To add or change an icon, follow [`.claude/skills/add-icon`](.claude/skills/add-icon/SKILL.md).
To publish a version, follow [`.claude/skills/release`](.claude/skills/release/SKILL.md).

## Licence

MIT, for the drawings. The brand marks are their owners' trademarks; see [NOTICE](NOTICE).
