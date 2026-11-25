# 2. Published to this project's GitLab registry, which anyone can pull from

Date: 2026-11-25
Status: Accepted

## Context

The package is consumed by projects that install differently:

- tradeops2: Yarn 4, GitLab CI, and one Docker image per tenant;
- ticketops-api: pnpm 11;
- acs-ui: Yarn 1.

Eight Mile's shared packages so far (`@ticketops/chat`, `@acs/chat`) come from a GitLab
project's private npm registry. Each consumer then carries a job-token allowlist entry, a BuildKit
secret in its Dockerfile, and a token line in each developer's `~/.npmrc`.

This project sits in a private group, so it must be private too. Its source is public on GitHub
all the same.

## Decision

**Versions are published to this project's own npm registry from tag pipelines, and the registry
is set so that anyone can pull from it.**

- **Anonymous pulls.** `package_registry_access_level` is `public`: "Allow anyone to pull from
  package registry". Consumers point the `@eightmile` scope at
  `https://gitlab.com/api/v4/projects/89463540/packages/npm/` and need no token anywhere: no CI
  allowlist, no build secret, no `~/.npmrc` line. The source is public on GitHub, so nothing is
  given away that was not already public.
- **Published only from a tag.** A `v<version>` tag runs the pipeline:
  - `test` runs format, types and tests, and builds;
  - `publish` checks that the tag equals the package version, then publishes that job's tested
    `dist` with the job's own `CI_JOB_TOKEN`.

  There is no stored token and no publishing by hand. GitLab refuses a version it already holds,
  so a version is published once.

- **Consumers turn off their age gate for the scope.** GitLab's package metadata carries no
  publish times. Yarn 4.18's default one-day `npmMinimalAgeGate` reads that as "too new" forever,
  so it refuses every version. Yarn consumers set `npmMinimalAgeGate: 0` under the scope. pnpm 11
  consumers add `@eightmile/*` to `minimumReleaseAgeExclude`. The gate exists to give the public
  registry time to pull a malicious release; for a registry only this project's pipeline
  publishes to, it adds nothing.
- **Exact pins.** Consumers pin an exact version, so a lockfile's checksum always names one
  tarball.

## Consequences

- Installing the package needs gitlab.com to be reachable: every consumer's CI and image build
  already reach it for their own code.
- Anyone can download the published package, which is the point of the MIT licence.
- `yarn npm audit` sends package names to npmjs.org, and it would ask GitLab about this one on
  every run. Consumers exclude `@eightmile/*` from it; the package has no runtime dependencies to
  audit.
- `@eightmile` is not claimed on npmjs.org. GitLab forwards a request for an `@eightmile` package
  it doesn't hold to npmjs.org. That's no risk to a pinned install, whose checksum is in its
  lockfile, but it would be to a future `@eightmile/*` name before its first publish. Claiming the
  scope, or turning forwarding off for the group, closes it.

## Alternatives considered

- **A private registry with tokens, as `@ticketops/chat` has.** Every consumer would carry token
  plumbing in its CI, its images and every developer's machine, to protect source that is public
  anyway.
- **A git dependency on the GitHub repository.** No registry, but every install would clone the
  repo and build it, with its dev dependencies, inside every image build. And each of Yarn 4,
  pnpm and Yarn 1 runs a dependency's build step differently.
- **npmjs.org.** It would need an npm organisation, and it would make this the one Eight Mile
  package that is not served from GitLab.
