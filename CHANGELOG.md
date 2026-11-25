# Changelog

All notable changes to `@eightmile/icons`. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow
[Semantic Versioning](https://semver.org/).

## [Unreleased]

### Changed

- The gallery is a page that follows the viewer's light or dark setting. Controls on the page
  switch the segment and freeze every motion. It can be published as it is, and the query
  parameters still work for headless screenshots.

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
