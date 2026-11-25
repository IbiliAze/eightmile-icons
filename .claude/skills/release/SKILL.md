---
name: release
description: Publish a new version of @eightmile/icons to the GitLab package registry and push it to both remotes. Use when asked to release, publish, tag or bump the package, or when a consumer needs icons that are on main but not yet published.
---

# Release a version

A version is published by its tag's pipeline, never by hand. The registry refuses a version it
already holds, so each number is spent once: make sure `main` is right first.

## Steps

1. **Check `main` is clean and green.**

   ```bash
   git status --short && npm run format:check && npm run typecheck && npm test
   ```

2. **Pick the version.**
   - patch: a drawing, motion or cut fixed;
   - minor: icons added, or a group;
   - major: an icon removed or renamed, a prop changed, or anything a consumer's code would
     notice.

   Before 1.0 a breaking change is a minor.

3. **Bump and record.**
   - Set `"version"` in `package.json`, then run `npm install --package-lock-only` so the lockfile
     agrees.
   - In `CHANGELOG.md`, move **Unreleased** under a new `## [x.y.z] - YYYY-MM-DD` heading and leave
     an empty **Unreleased** above it.
   - Commit both: `Release vX.Y.Z`.
4. **Tag and push to both remotes.** `origin` pushes to GitHub and to GitLab:

   ```bash
   git tag vX.Y.Z && git push origin main vX.Y.Z
   git ls-remote origin refs/tags/vX.Y.Z && git ls-remote gitlab refs/tags/vX.Y.Z
   ```

5. **Watch the pipeline.** The tag runs `test`, then `publish`.

   ```bash
   glab ci status --repo projects4833423/eightmile-icons --branch vX.Y.Z
   ```

   If `publish` fails on "package is A, tag is B", the tag does not match `package.json`. Delete
   the tag on both remotes, fix the version, and tag again. That is safe, because nothing was
   published.

6. **Check an anonymous fetch,** with no token, as a consumer's build does:

   ```bash
   curl -sf https://gitlab.com/api/v4/projects/89463540/packages/npm/@eightmile%2Ficons | python3 -c "import json,sys; print(sorted(json.load(sys.stdin)['versions']))"
   ```

7. **Bump the consumers that want it.** Each pins an exact version. After `yarn up`, check its
   lockfile resolves the new version from GitLab.
