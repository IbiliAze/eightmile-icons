# Changelog

All notable changes to `@eightmile/icons`. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow
[Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.6.0] - 2026-11-27

### Added

- Wheelchair, under Tabler's name: an empty wheelchair facing right, for the seats a venue marks
  accessible (TicketOps' Show accessible seats switch and the seat card). It rolls forward on hover;
  the big wheel carries the cut, low on its right, clear of the frame that meets it. 196 icons in all.

## [0.5.0] - 2026-11-27

### Added

- BrandLinkedin, under Tabler's name: LinkedIn's own mark, unaltered, from simple-icons 10.4.0,
  the last release before LinkedIn had it removed there. It was the one TicketOps icon not carried
  over in 0.1.0, so TicketOps can now draw from this package alone. It pops on hover like the other
  brand marks. 195 icons in all.

## [0.4.0] - 2026-11-27

### Added

- LayoutSidebarLeftCollapse and LayoutSidebarLeftExpand, under Tabler's names, for the button that
  folds a dashboard's menu down to its icons and opens it out again (acs-ui and the ticketops
  dashboards). A panel with its sidebar's edge and a chevron; on hover the edge slides the way the
  sidebar goes and the chevron follows. 194 icons in all.

## [0.3.0] - 2026-11-27

### Added

- ShieldX and ShieldQuestion, beside ShieldCheck, so acs-ui's live map can say whether a reader would carry on if
  its server went down, would stop, or can't be told. The same shield and cut as ShieldCheck; the cross shakes as
  CircleX's does, and the question mark tilts as HelpCircle's does. 192 icons in all.

## [0.2.0] - 2026-11-27

### Added

- 27 icons, under Tabler's names, so that acs-ui can draw only from this package: Scan,
  TextScan2, FocusCentered, PlayerPlay, PlayerPause, PlayerStop, UserShield, Note, ExternalLink,
  DeviceCameraPhone, Cloud, AlertOctagon, Dashboard, TopologyStar3, Restore, PlugConnectedX,
  LayoutGrid, LayoutGridAdd, LayoutDashboard, LayersSubtract, Flag, FileText, ClockCheck,
  CircleX, CircleDashed, ArrowsMaximize and ArrowsMinimize. 190 icons in all.

### Changed

- The gallery is a page that follows the viewer's light or dark setting. Controls on the page
  switch the segment and freeze every motion. It can be published as it is, and the query
  parameters still work for headless screenshots.
- An icon is left uncut when no stroke in it is long enough to cut (11 units), not only when it
  is made of dots. This is what the tests already measured. CircleDashed is the first such icon
  that isn't dots: its dashes are too short, and its gaps are already its breaks. The test now
  measures every subpath of a path, so a long stroke drawn after a dot can no longer pass uncut.

## [0.1.0] - 2026-11-25

### Added

- 163 icons in 15 groups, each in three segments: **dynamic**, whose parts move when the icon's
  control is hovered or focused; **static**; and **cropped**, whose strokes are broken by soft
  cuts.
- 116 icons drawn for TicketOps, carried over with their motions. LinkedIn's mark is not one of
  them: LinkedIn had it removed from simple-icons.
- 47 new icons, among them Message, Phone, Send, ArrowRight, ArrowDown, BrandGithub, CoinPound,
  and the technology set Eight Mile's pages draw (Server, Database, Robot, GitBranch…).
- `@eightmile/icons/manifest`, listing every icon with its group.
- `gallery.html` (`npm run gallery`) for reviewing every icon in every segment.
- Published to the GitLab package registry of `projects4833423/eightmile-icons`, which anyone
  can pull from.
