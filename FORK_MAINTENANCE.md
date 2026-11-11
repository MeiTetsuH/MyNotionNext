# Fork maintenance notes

Recorded maintenance baseline: 2026-11-11. This is a snapshot, not a promise that upstream or advisory data is still current.

- Upstream: [https://github.com/notionnext-org/NotionNext](https://github.com/notionnext-org/NotionNext)
- Integrated upstream commit: [`63bb6e775a57235ac7a3c7f8d672f274c840d89f`](https://github.com/notionnext-org/NotionNext/commit/63bb6e775a57235ac7a3c7f8d672f274c840d89f) (0 commits behind `upstream/main` at the baseline, including PR #4622 disclosure docs and PR #4624 optional anonymous Notion comments)
- Fork remote: `git@github.com:MeiTetsuH/MyNotionNext.git` (`origin`); upstream remote: `upstream`
- Production branch on Vercel: **`feat/field-notes-theme`** (project `my-notion-next`, framework preset Next.js). Every push to this branch deploys production at <https://me.mingzhe.uk>; commits whose message contains `[skip-version]` are not built (`vercel.json` `ignoreCommand`).

## Branch layout

```
upstream/main ──► main ──► feat/field-notes-theme  (production)
                  │         └ field-notes theme work since 2026-11-02
                  └ fork baseline: indexing policy, dependency patches,
                    brand icons, first field-notes theme import
```

- `main` holds the fork baseline and is where upstream is merged first.
- `feat/field-notes-theme` is `main` + theme work. It is merged forward from `main`, never rebased once pushed (it is the deployed branch).
- `backup/feat-pre-rebase` and `upstream-main` are local safety refs from earlier syncs; do not push or delete them without checking they are fully merged.

## Where the fork differs from upstream

Almost all custom work lives in the theme. Outside the theme the deltas are small, deliberate patches; these are the files that can conflict on an upstream merge.

### Theme (no upstream counterpart, never conflicts)

| Paths | Content |
| --- | --- |
| `themes/field-notes/**` | The whole theme. `index.js` layouts; `style.js` (the current "wall" look: tokens, film rail, hero, posters, print viewer, inner pages, `@media(hover:hover)` touch guards, safe-area insets); `legacy-style.js` (carried-over styles for the home lab scene, Notion article blocks and the contact sheet, pruned of dead legacy selectors; colours resolve through the tokens in `style.js`); `data.js` (Notion parsing, `resolvePostHref` slash-safe internal URLs, multilingual `"中 \|\| EN \|\| 日"` strings, photo summaries `"place @ settings @ description"` parsed only for photo posts, `[ZH]/[EN]/[JA]` block toggles, `extractNoteLines`, `localizeFeedPost` for single-language feed items); `config.js`; `components/*` (`LangContext` with `resolveInitialLang` hydration-safe language resolution, `PhotoRail` film strip and mobile strip, `Lightbox` print viewer with the flip side, `SprayWall` canvas in the closing section, `Graffiti` SVG doodles and filters). Web fonts come from Google Fonts through two `<link>`s in `LayoutBaseInner`: a Latin base (Archivo, IBM Plex Mono, Rubik Spray Paint) and one CJK pair for the current language only (zh: Noto Sans SC + LXGW WenKai TC, ja: Noto Sans JP + Klee One, en: Caveat), because each CJK family is about 100 `@font-face` rules |
| `themes/fieldnotes`, `public/themes/fieldnotes`, `public/fieldnotes` | Symlinks to the `field-notes` folders (legacy aliases); keep them as symlinks (`next.config.js` skips symlinks when scanning `themes/`) |
| `public/themes/field-notes/assets/**` | Theme images; `home-lab-set.webp` is the current home lab artwork (transparent) |
| `__tests__/themes/field-notes.test.js` | Theme regression tests (translator, `resolveInitialLang`, `resolvePostHref`, project parsing, photo summary parsing, SEO language pick, Tokyo schedule, note extraction) |

### Core files patched for the theme

| Path | Fork change | When merging upstream |
| --- | --- | --- |
| `pages/index.js` | For `field-notes`: return all published posts (no pagination) and prefetch Notion blocks of `做的东西` / project pages into `workProjectPages`, with `parsedByLang` built via `createTranslator` so SSR labels are not raw keys | Keep both blocks; re-apply on top of upstream's `getStaticProps` if it was restructured |
| `pages/archive/index.js`, `pages/category/[category]/index.js`, `pages/tag/[tag]/index.js` | For `field-notes`: category and tag pages return all published posts (no pagination); post lists go through `cleanPostSummaries` so page props carry summary fields only | Keep the theme check and the `cleanPostSummaries` calls |
| `components/SEO.js` | `pickPrimaryLanguage()` so multilingual titles/descriptions emit only the first language in meta tags; structured photo summaries become `place · settings · description`; brand favicon / apple-touch-icon links; `viewport-fit=cover` + `mobile-web-app-capable`; `#f0eee9` `theme-color` fallback for `field-notes` (omitted when empty); duplicate single-URL `hrefLang` tags removed | Keep `pickPrimaryLanguage`, viewport/theme-color handling and favicon links; its `PHOTO_SETTINGS_PATTERN` mirrors `themes/field-notes/data.js` |
| `lib/utils/rss.js`, `pages/api/rss.js`, `__tests__/lib/utils/rssFeed.test.js` | For `field-notes`: `createFeedLocalizer()` reduces each item's title, summary and full-content body to the site language (`LANG`) through `localizeFeedPost`; `createFeedItemUrl()` preserves external `https://` project slugs, normalizes leading slashes and skips password-protected / `#` / `shouldNoIndexPath` entries; `generateRss()` skips read-only `/var/task/public` Notion block rendering during Vercel serverless ISR runtime while still generating static `/rss/*` files during `phase-production-build` | Keep the localizer, `createFeedItemUrl` and the Vercel ISR guard; build-time `/rss/*` and `/api/rss` both go through `createFeed` |
| `pages/_document.js` | Force light mode when runtime `NOTION_CONFIG.THEME` or `BLOG.THEME` is `'field-notes'`; `initLangScript` resolves `?lang=`/`?locale=` first (and persists to `h-mz-language`), then validated `h-mz-language` storage/cookie, then `navigator.languages` (`zh*` → `zh`, `ja*` → `ja`, other locales → `en`) | Keep both scripts; they are no-ops for other themes |
| `components/Fireworks.js`, `public/js/fireworks.js`, `styles/globals.css` | Zero-dependency Canvas click fireworks replacing external `anime.min.js`: viewport-safe CSS sizing (`inset: 0; max-width: 100vw`) with DPR backing-store scaling so mobile orientation/foldable resizes never lock layout width, on-demand `requestAnimationFrame` (`0fps` when idle), `prefers-reduced-motion` guard, and full listener/rAF teardown on unmount | Keep ours unless upstream replaces the plugin cleanly |
| `next.config.js`, `themes/theme.js` | `scanSubdirectories()` uses `fs.lstatSync` to skip symlink directories (`themes/fieldnotes`); deprecated Next 15 `swcMinify` and `publicRuntimeConfig` (`next/config`) replaced with `env.NEXT_PUBLIC_THEMES`; `Cache-Control` (`max-age=86400, stale-while-revalidate=604800`) added for `/themes/field-notes/assets/:path*`; invalid `Access-Control-Allow-Credentials: true` alongside wildcard `Access-Control-Allow-Origin: *` removed, with `X-Content-Type-Options: nosniff` and `Referrer-Policy: strict-origin-when-cross-origin` added | Keep symlink filter, `NEXT_PUBLIC_THEMES`, cache/security headers and Next 15 cleanup when merging upstream config changes |
| `components/ExternalPlugins.js` | Timers cleaned up on unmount, `GLOBAL_JS` injected as a script element instead of `eval`, 51la/Chatbase via `next/script` | Re-apply only if upstream still uses `eval` / bare script tags |
| `pages/_app.js` | `<SEO>` placement adjusted | Trivial; take upstream and re-check SEO renders once |

### Core files patched for search indexing (fork baseline)

| Paths | Intent |
| --- | --- |
| `lib/search-index-policy.js`, `__tests__/lib/search-index-policy.test.js` | Shared indexing decision and regression tests |
| `lib/utils/sitemap.xml.js`, `pages/sitemap.xml.js`, `__tests__/lib/sitemap.xml.test.js` | Sitemap exclusions consistent with the policy |
| `middleware.ts` | Wraps upstream's middleware: 404 + `noindex` for malformed template URLs, `X-Robots-Tag: noindex, follow` on service routes; matcher adds `/https(.*)` | Keep the wrapper; take upstream's inner `noAuthMiddleware` / Clerk logic |
| `vercel.json` | Deployment settings and the `[skip-version]` ignore rule | Keep |
| `.eslintrc.js` | `react-hooks` plugin not registered twice | Keep |
| `tsconfig.json`, `next-env.d.ts` | `target: ES2017`, Next 15 generated reference | Take upstream unless the build breaks |
| `.gitignore` | `.env*` ignored | Keep |
| `public/favicon.*`, `public/icon-*.png`, `public/apple-touch-icon*.png` | Brand "H" icons replacing the Notion defaults | Keep ours |

## Content and platform settings (outside Git)

- **Notion config table** (`配置中心` page in the blog database): enabled rows are `LINK`, `THEME = field-notes`, `KEYWORDS`, `AUTHOR`, `BIO`, `LANG`, `SINCE`, `BLOG_FAVICON`, `CONTACT_EMAIL`, `CUSTOM_MENU`, `WIDGET_PET`, `POST_URL_PREFIX_MAPPING_CATEGORY` (inactive while `POST_URL_PREFIX` is unchecked), `GREETING_WORDS`. The theme also reads optional `FIELD_NOTES_STATUS` / `FIELD_NOTES_SCRIBBLE` (`"中 || EN || 日"`) for hero copy.
- **Notion database**: title `Mingzhe · Field Notes`, description `认真折腾，顺便记录。` (used for site title/description and share cards).
- **Vercel**: production branch `feat/field-notes-theme`; `NEXT_PUBLIC_CHATBASE_ID` was removed on 2026-11-06 (the bot no longer existed and its embed threw errors). `NEXT_PUBLIC_*` values are baked in at build time, so env changes need a redeploy.
- **Next.js i18n is on** (upstream `next.config.js`, `defaultLocale: BLOG.LANG`). Data routes therefore include the locale: `/_next/data/<buildId>/zh-CN/article/<slug>.json`. A URL without `/zh-CN/` returns 404 by design; the router adds it automatically. The theme's print-back loader reads the page's own `__NEXT_DATA__` instead and does not depend on this.

## Dependency and runtime baseline

Yarn 1.22.22 with `yarn.lock`; `.nvmrc` remains the upstream Node 22 line and `engines.node` is `>=22 <25`. Vercel builds with Node 24.x. Next is 15.5.28; this fork was not migrated to Next 16.

The targeted `**/@vercel/cli-config/zod` resolution removes the old Zod 4.1.11 runtime chain. The unrelated chromium-bidi development chain only declares Zod 3 compatibility and was not forced to Zod 4. Keep documentation builds and the application build as separate checks.

The manifest and committed lockfile are authoritative for exact dependency resolution. Review both direct and transitive changes; avoid mixing package managers.

## Resolution policy and removal conditions

| Scoped selection | Current declaration | Reason |
| --- | --- | --- |
| `axios` | `>=0.21.1` | Retain the reviewed security/compatibility resolution for this dependency family; do not replace all parent majors with a single version. |
| `esbuild` | `^0.25.0` | Same as above. |
| `flatted` | `^3.4.2` | Same as above. |
| `form-data` | `^4.0.6` | Same as above. |
| `js-cookie` | `^3.0.7` | Same as above. |
| `lodash` | `^4.18.1` | Same as above. |
| `picomatch` | `^2.3.2` | Same as above. |
| `qs` | `^6.15.2` | Same as above. |
| `tmp` | `^0.2.6` | Same as above. |
| `uuid` | `^11.1.1` | Same as above. |
| `postcss` | `^8.5.29` | Same as above. |
| `nanoid` | `^3.3.18` | Same as above. |
| `source-map-js` | `^1.2.2` | Same as above. |
| `sharp` | `^0.35.5` | Same as above. |
| `webpack-bundle-analyzer/ws` | `^7.5.11` | Patch the WebSocket dependency while retaining its compatible major. |
| `@clerk/clerk-react` | `^5.61.6` | Keep the authorization-related upstream security correction. |
| `**/@typescript-eslint/typescript-estree/minimatch` | `^9.0.7` | Patch the parser tooling dependency within its supported major. |
| `postcss-selector-parser` | `^7.1.6` | Retain the reviewed security/compatibility resolution. |
| `**/get-uri/basic-ftp` | `^6.2.1` | Patch the proxy/browser-tooling FTP chain. |
| `**/vitepress/vite` | `^6.4.4` | Patch the documentation build tool without moving it to an unrelated major. |
| `**/@vercel/cli-config/zod` | `4.6.7` | Patch the production Vercel configuration chain to Zod 4.6.7. |

For every entry above, remove or narrow it only after the parent dependency naturally resolves a patched compatible version, a fresh lockfile proves the vulnerable path is absent, the affected tests pass, and the relevant application/docs/MCP build passes. Change one dependency family at a time. Preserve parent-specific major-version constraints. Do not use audit suppression or a fabricated package version as a substitute for a fix.

## Known limitations at this baseline

At the 2026-11-02 dependency review the production audit returned zero findings; the full audit retained six high-severity paths from three advisories in development/browser tooling (extract-zip and the Zod 3 chromium-bidi chain). Path counts are not counts of exploitable production vulnerabilities.

## Syncing with upstream

1. **Bring upstream into `main`**
   ```bash
   git fetch upstream
   git switch main
   git merge upstream/main
   ```
   Resolve conflicts using the tables above (fork intent wins for the listed paths, upstream wins elsewhere). For `yarn.lock`, take upstream's file, then run `yarn install` to regenerate it with the fork resolutions from `package.json`.
2. **Check `main`**: `npx jest __tests__/lib/search-index-policy.test.js __tests__/lib/sitemap.xml.test.js`, then `yarn build`.
3. **Carry it to the theme branch**
   ```bash
   git switch feat/field-notes-theme
   git merge main
   ```
   Conflicts here should only be in the core files listed under "Core files patched for the theme".
4. **Check the theme**: `npx jest __tests__/themes/field-notes.test.js __tests__/lib/utils/rssFeed.test.js`, `npx eslint themes/field-notes`, `yarn build`, then `yarn dev` and look at the home page (hero, home lab panel, notes, work), an article (`/article/dev5`), a photo diary (`/article/live2`) and the photo contact sheet (`/category/拍的照片`) at phone, ~720px, ~1100px and wide widths (at 1280px and up the home lab panel sits beside its artwork, the article TOC moves to a side column and the home notes grid has three columns; up to 1279px they stack and the notes grid shows two cards). Open `/api/rss` and check that item titles, descriptions and bodies are in one language only.
5. **Push** `main` and `feat/field-notes-theme` to `origin`. Pushing the theme branch deploys production.
6. **Verify production** at <https://me.mingzhe.uk>: page renders, no console errors, client-side navigation loads `/_next/data/<buildId>/zh-CN/...` with 200, the indexing policy headers are intact, and `/rss/feed.xml` carries single-language items.
7. Inspect diffs for credentials before publishing. Real credentials, private service addresses, user data and environment values stay outside Git.

## Updating this file

When a change touches anything outside `themes/field-notes`, `public/themes/field-notes` or the theme test, add the file and its intent to the matching table above in the same commit.
