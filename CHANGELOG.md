# Changelog

All notable changes to `@eightmile/icons`. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow
[Semantic Versioning](https://semver.org/).

## [Unreleased]

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
