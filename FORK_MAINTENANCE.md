# Fork maintenance notes

Recorded maintenance baseline: 2026-10-24. This is a snapshot, not a promise that upstream or advisory data is still current.

- Upstream: [https://github.com/notionnext-org/NotionNext](https://github.com/notionnext-org/NotionNext)
- Integrated upstream commit: [`93a14f25570b39da856d40285bafe3d77e838753`](https://github.com/notionnext-org/NotionNext/commit/93a14f25570b39da856d40285bafe3d77e838753)
- Verified maintenance code commit: `19db649683fb40f6c8eb1e3cfcd4acecd0f224a0`
- Deployment branch: `main`

This fork preserves a personal search-indexing policy while following the upstream application. Public blog pages and search/private routes intentionally have different indexing behavior.

## Preserve these fork differences

| Paths | Intent |
| --- | --- |
| `lib/search-index-policy.js, __tests__/lib/search-index-policy.test.js` | Keep the shared indexing decision and regression tests. |
| `lib/utils/sitemap.xml.js, pages/sitemap.xml.js, __tests__/lib/sitemap.xml.test.js` | Keep the sitemap exclusions consistent with the indexing policy. |
| `components/SEO.js, middleware.ts, pages/_app.js` | Keep canonical/noindex/header behavior consistent; do not let an upstream template silently restore indexing of excluded pages. |
| `vercel.json` | Keep the existing deployment settings and version-bump ignore rule. Do not add skip markers merely to bypass release checks. |
| `.eslintrc.js` | Avoid registering the react-hooks plugin twice; the release lint correction is intentional. |

The upstream [deployment guide](DEPLOYMENT.md) and [maintainer runbook](docs/developer/MAINTAINER_RUNBOOK.en.md) describe broader platforms. This file records the fork-specific delta; platform examples do not override the current manifest/lockfile.

## Dependency and runtime baseline

Yarn 1.22.22 with `yarn.lock`; `.nvmrc` remains the upstream Node 22 line and `engines.node` is `>=22 <25`. Use a current security-patched runtime within that range. Maintenance was also tested with Node 24.22.1. Next is 15.5.28; this fork was not migrated to Next 16.

The targeted `**/@vercel/cli-config/zod` resolution removes the old Zod 4.1.11 runtime chain. The unrelated chromium-bidi development chain only declares Zod 3 compatibility and was not forced to Zod 4. Keep documentation builds and the application build as separate checks.

The manifest and committed lockfile are authoritative for exact dependency resolution. Review both direct and transitive changes; avoid mixing package managers.

## Resolution policy and removal conditions

| Scoped selection | Current declaration | Reason |
| --- | --- | --- |
| `axios` | `>=0.21.1` | Retain the reviewed security/compatibility resolution for this dependency family; do not replace all parent majors with a single version. |
| `esbuild` | `^0.25.0` | Retain the reviewed security/compatibility resolution for this dependency family; do not replace all parent majors with a single version. |
| `flatted` | `^3.4.2` | Retain the reviewed security/compatibility resolution for this dependency family; do not replace all parent majors with a single version. |
| `form-data` | `^4.0.6` | Retain the reviewed security/compatibility resolution for this dependency family; do not replace all parent majors with a single version. |
| `js-cookie` | `^3.0.7` | Retain the reviewed security/compatibility resolution for this dependency family; do not replace all parent majors with a single version. |
| `lodash` | `^4.18.1` | Retain the reviewed security/compatibility resolution for this dependency family; do not replace all parent majors with a single version. |
| `picomatch` | `^2.3.2` | Retain the reviewed security/compatibility resolution for this dependency family; do not replace all parent majors with a single version. |
| `qs` | `^6.15.2` | Retain the reviewed security/compatibility resolution for this dependency family; do not replace all parent majors with a single version. |
| `tmp` | `^0.2.6` | Retain the reviewed security/compatibility resolution for this dependency family; do not replace all parent majors with a single version. |
| `uuid` | `^11.1.1` | Retain the reviewed security/compatibility resolution for this dependency family; do not replace all parent majors with a single version. |
| `postcss` | `^8.5.29` | Retain the reviewed security/compatibility resolution for this dependency family; do not replace all parent majors with a single version. |
| `nanoid` | `^3.3.18` | Retain the reviewed security/compatibility resolution for this dependency family; do not replace all parent majors with a single version. |
| `source-map-js` | `^1.2.2` | Retain the reviewed security/compatibility resolution for this dependency family; do not replace all parent majors with a single version. |
| `sharp` | `^0.35.5` | Retain the reviewed security/compatibility resolution for this dependency family; do not replace all parent majors with a single version. |
| `webpack-bundle-analyzer/ws` | `^7.5.11` | Patch the WebSocket dependency while retaining its compatible major. |
| `@clerk/clerk-react` | `^5.61.6` | Keep the authorization-related upstream security correction. |
| `**/@typescript-eslint/typescript-estree/minimatch` | `^9.0.7` | Patch the parser tooling dependency within its supported major. |
| `postcss-selector-parser` | `^7.1.6` | Retain the reviewed security/compatibility resolution for this dependency family; do not replace all parent majors with a single version. |
| `**/get-uri/basic-ftp` | `^6.2.1` | Patch the proxy/browser-tooling FTP chain. |
| `**/vitepress/vite` | `^6.4.4` | Patch the documentation build tool without moving it to an unrelated major. |
| `**/@vercel/cli-config/zod` | `4.6.7` | Patch the production Vercel configuration chain to Zod 4.6.7. |

For every entry above, remove or narrow it only after the parent dependency naturally resolves a patched compatible version, a fresh lockfile proves the vulnerable path is absent, the affected tests pass, and the relevant application/docs/MCP build passes. Change one dependency family at a time. Preserve parent-specific major-version constraints. Do not use audit suppression or a fabricated package version as a substitute for a fix.

## Known limitations at this baseline

At the recorded maintenance baseline, the production audit returned zero findings. The full audit retained six high-severity paths from three advisories in development/browser tooling (extract-zip and the Zod 3 chromium-bidi chain). Path counts are not counts of exploitable production vulnerabilities.

## Future upstream sync and release

1. Compare upstream changes against the preserved paths above and keep unrelated local work intact.
2. Use the repository package manager and lockfile; review scoped overrides and affected regression tests.
3. Keep source checks, CI, provider build readiness, live-page checks, and external-service behavior as separate evidence.
4. Inspect added files and diffs for credentials before publishing. Store real credentials, deployment addresses for private services, user data and environment values outside Git.
5. After the reviewed commit is deployed, verify the intended domain and indexing policy. Remove only task-created branches that are already merged; preserve unrelated and unmerged branches.
