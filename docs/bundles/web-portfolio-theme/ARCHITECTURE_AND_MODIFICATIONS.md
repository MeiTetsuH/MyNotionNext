# Web Portfolio Scrapbook Theme & Next.js SSR Optimizations
## Architectural Specification, Modification Changelog, and Context Guide

> **Note for AI Assistant / Pair Programmer:**
> This document provides the end-to-end technical context for the accompanying single-file consolidated source code bundle (`CONSOLIDATED_SOURCE_CODE.txt`). Read this document first to understand the architecture, design choices, upstream framework integration, and exact modifications made across the codebase.

---

## 1. System Overview & Engineering Objectives

This project is an advanced, custom-designed theme extension and runtime optimization layer built on top of **NotionNext** (a production-grade static site generator and SSR web application framework powered by Next.js, React, Tailwind CSS, and Notion API).

### Primary Engineering Objectives:
1. **Single-Page Multi-Section Scrapbook Architecture ("Field Notes")**:
   - Transform the conventional multi-page, paginated blog paradigm into a high-density, interactive single-page portfolio layout.
   - Combine diverse content streams into a cohesive journal aesthetic:
     - Hero introduction with scrapbook paper textures, washi tape effects, and dynamic status badges.
     - Live "Now" status board displaying real-time focus, technical experiments, reading, and listening updates.
     - Interactive project showcase deck ("Work") with embedded rich Notion block rendering and live demo links.
     - Responsive Polaroid photo gallery with randomized physical tilt angles, washi tape pins, and EXIF metadata display.
     - Curated article list with live category filtering, search, and reading-time estimation.
     - Interactive draggable/clickable tech-stack badge deck with sound/vibe styling.
     - Continuous marquee status ticker ribbon.
2. **Server-Side Data Pipeline & Block Prefetching**:
   - Overcome Notion API waterfall latencies by prefetching and formatting Notion block trees during Next.js `getStaticProps` for featured project cards.
   - Avoid client-side layout shifts and loading spinners when users expand project details.
3. **Hydration & Script Execution Modernization**:
   - Eliminate legacy raw `<script defer>` / `<script async>` tags inside React render trees that caused severe Next.js hydration mismatch errors (`Warning: Extra attributes from the server`).
   - Migrate all external analytics and widget loaders to official Next.js `next/script` components with `strategy="afterInteractive"`.
4. **Seamless Trilingual Client-Side Localization (i18n)**:
   - Provide zero-flicker client-side language switching between English (`en`), Japanese (`ja`), and Chinese (`zh`) with `localStorage` persistence and automatic browser language detection.

---

## 2. Backstory, Context & Motivation (前因后果)

### The Upstream Baseline (NotionNext)
NotionNext is designed around traditional blog models:
- Articles are loaded from a Notion database table.
- Home page (`pages/index.js`) splits posts into fixed pages (e.g. 12 posts per page) via `POST_LIST_STYLE = 'page'`.
- Clicking a post navigates to `/article/[slug]`, which triggers a separate `getStaticProps` fetch for that post's full Notion block tree.
- Third-party analytics and scripts are loaded in `components/ExternalPlugins.js` using raw HTML `<script>` tags wrapped in React fragments.

### Why the Standard Architecture Was Insufficient:
1. **Pagination Breaks Portfolio Layouts**:
   - In a personal engineering portfolio, visitors expect to see featured projects, recent photos, and a curated list of articles on the landing page simultaneously.
   - Standard pagination would arbitrarily cut off projects or older posts, rendering section filters useless.
2. **Waterfalls in Project Card Block Previews**:
   - The theme showcases complex projects directly on the landing page, allowing visitors to inspect architecture diagrams and notes without leaving the home page.
   - Under standard NotionNext, home page `getStaticProps` only fetches page properties (title, tags, date, summary); it does **not** fetch block contents (`blockMap`). Fetching block maps on the client causes noticeable delay and layout shift.
3. **Hydration Mismatches in Modern Next.js**:
   - Upstream NotionNext had legacy script tags injected via React components. When Next.js hydrates in the browser, third-party analytics scripts modify DOM attributes before React finishes attaching event listeners, producing console errors and failing hydration.

---

## 3. Exact Modifications: Where & What Was Changed (修改哪里、做了什么)

### 3.1 Modifications to Upstream Framework Core

#### 1. `pages/index.js` (Server-Side Rendering & Block Prefetch Pipeline)
* **What was changed**:
  1. **Bypass Post Slicing for Field-Notes Theme**:
     - Added theme detection: `const activeTheme = siteConfig('THEME', BLOG.THEME, props?.NOTION_CONFIG)`.
     - Modified post pagination guard:
       ```javascript
       if (POST_LIST_STYLE === 'scroll' || activeTheme === 'field-notes') {
         // Return all published posts to frontend without slicing
       } else if (POST_LIST_STYLE === 'page') {
         props.posts = props.posts?.slice(0, POSTS_PER_PAGE)
       }
       ```
  2. **Server-Side Project Block Map Prefetching**:
     - Filtered candidate showcase posts where category or tag matches `['做的东西', 'project', 'projects', '项目', '开源项目']`.
     - Parallelized Notion block tree fetching using `p-limit(5)`:
       ```javascript
       props.workProjectPages = await Promise.all(
         workCandidates.map(page =>
           workLimit(async () => {
             const cloned = { ...page }
             const rawBlockMap = await getPostBlocks(cloned.id, 'field-notes-work')
             cloned.blockMap = getPublicPostBlockMap(cloned, adapterNotionBlockMap(rawBlockMap), props.allPages)
             if (cloned.blockMap?.block) {
               cloned.blockMap.block = formatNotionBlock(cloned.blockMap.block)
             }
             return cloned
           })
         )
       )
       ```
     - **Result**: The client receives fully resolved, sanitized Notion block maps during static generation/SSR. Project cards expand instantly with zero network delay.

#### 2. `components/ExternalPlugins.js` (Next.js Script Modernization)
* **What was changed**:
  - Replaced all legacy `<script id="..." src="..." defer />` and `<script dangerouslySetInnerHTML={{...}} />` tags with `import Script from 'next/script'`.
  - Applied `strategy="afterInteractive"` across:
    - 51LA Analytics (`id='LA_COLLECT'`)
    - Chatbase widget & config (`id='chatbase-config'`, `id={CHATBASE_ID}`)
    - Microsoft Clarity (`id='clarity-js'`)
    - DaoVoice customer support SDK (`id='daovoice-sdk'`, `id='daovoice-init'`)
    - Umami Analytics (`id='umami-analytics'`)
    - Google Tag Manager (`id='gtag-base'`, `id='gtag-init'`)
    - Matomo Analytics (`id='matomo-analytics'`)
  - **Result**: Completely eliminated hydration mismatch errors in Next.js, deferred analytics loading until after main-thread interactivity, and elevated Lighthouse performance scores.

#### 3. `components/SEO.js` (Mobile PWA & Apple Web App Header)
* **What was changed**:
  - Added `<link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />` to document `<Head>`.
  - Replaced legacy Notion favicons with custom SVG and high-resolution icons.

---

### 3.2 The New Custom Theme: `themes/field-notes/`

The entire theme is encapsulated in `themes/field-notes/` and consists of 17 modular files:

| File Path | Role & Key Responsibilities |
| :--- | :--- |
| `index.js` | **Main Theme Entry Point**: Orchestrates routes (`/`, `/article/[slug]`, `/category`, `/tag`). Renders single-page layout on `/`, manages intersection observer for navbar scroll spy, handles post search and category filtering. |
| `style.js` | **Design System CSS-in-JS**: Over 1,800 lines of responsive CSS variables and styles. Implements scrapbook textures, washi tape ribbons, randomized tilt degrees, polaroid borders, custom scrollbars, and dark/light color tokens. |
| `config.js` | **Configuration Schema**: Feature flags to enable/disable specific sections (Hero, Now, Work, Photos, Articles, Stickers), configure ticker speed, and set polaroid item limits. |
| `data.js` | **Data Ingestion & EXIF Parser**: Parses Notion post summaries containing compound photo metadata (`Location @ Parameters @ Description`), extracts camera EXIF (model, lens, aperture, ISO, shutter), and provides fallback datasets. |
| `components/constants.js` | **Design Tokens**: Standardized color palettes (paper, ink, tape, accents), rotation angle presets (`-2.5deg`, `1.8deg`), and responsive breakpoint widths. |
| `components/translations.js` | **i18n Dictionary**: Complete localization dictionary supporting English (`en`), Japanese (`ja`), and Chinese (`zh`) across all UI labels, button states, and section descriptions. |
| `components/LangContext.js` | **Language Provider & Hook**: React context and `useLang()` hook. Automatically reads `localStorage` or `navigator.language`, persists user selection, and notifies subscribed components without page refresh. |
| `components/Header.js` | **Sticky Frosted Navbar**: Floating navigation pill with backdrop-blur, section scroll triggers, active section tracking via `IntersectionObserver`, and language selection modal. |
| `components/Hero.js` | **Scrapbook Hero Banner**: Profile presentation featuring polaroid avatar with top washi tape, title badge, biography marquee, and quick jump buttons. |
| `components/NowSection.js` | **Real-Time Status Board ("Now")**: Bento-style card displaying current location, technical learning focus, reading list, and audio tracks. |
| `components/WorkSection.js` | **Project Showcase Deck**: Expandable project cards with technology tag pills, GitHub repository links, live deployment URLs, and embedded Notion block viewer. |
| `components/PhotoGallery.js` | **Polaroid Gallery**: Responsive grid of physical-style Polaroid photographs with subtle randomized rotations, drop shadows, pins, and click-to-lightbox triggers. |
| `components/Lightbox.js` | **Modal Image Viewer**: Fullscreen polaroid viewer with photo captions, EXIF metadata readout, smooth backdrop fade, and keyboard navigation (`Escape`, `ArrowLeft`, `ArrowRight`). |
| `components/ArticleSection.js` | **Curated Article Feed**: Searchable, filterable list of articles from Notion database with reading time calculation, publication timestamps, and category pills. |
| `components/StackStickers.js` | **Interactive Tech Stack Deck**: Washi tape sticker deck representing technologies (React, Next.js, Cloudflare, Python, Docker). Features hover lift physics and tactile sound styling. |
| `components/Ticker.js` | **Marquee Ribbon**: Smooth, infinite horizontal ticker ribbon displaying announcements or inspirational quotes. |
| `components/Footer.js` | **Colophon & Copyright**: Clean bottom bar with copyright, RSS link, and build system metadata. |

---

## 4. End-to-End Data Flow & Request Lifecycle

```
User visits "/" 
   │
   ▼
Next.js `pages/index.js` -> `getStaticProps`
   ├─ Fetch published posts from Notion API (`getAllPosts`)
   ├─ Detect `THEME === 'field-notes'`: Preserve complete post collection (no slicing)
   └─ Identify project posts (`做的东西` / `project`):
        └─ Prefetch full Notion block tree in parallel via `p-limit(5)`
        └─ Adapt & format block maps for zero-latency client rendering
   │
   ▼
Client-side Hydration
   ├─ `ExternalPlugins.js`: Loads analytics via Next.js `Script` (strategy="afterInteractive")
   ├─ `LangContext`: Initializes UI language from localStorage or browser locale
   └─ `themes/field-notes/index.js`:
        ├─ Injects scrapbook design tokens (`themes/field-notes/style.js`)
        ├─ Attaches IntersectionObserver to section containers
        └─ Renders: Header -> Hero -> Ticker -> Now -> Work -> Photos -> Articles -> Stack -> Footer
```

---

## 5. Key Interfaces & Data Formats

### Photo Summary Syntax (in Notion Database)
To support camera parameter and location display without modifying Notion database properties, photos use a standardized compound summary string:
```text
Location (Trilingual) @ Camera Parameters @ Caption (Trilingual)
Example:
"Tokyo, Japan @ FUJIFILM X-S20 · 23mm f/2.0 · 1/250s ISO 160 @ Evening street after rain"
```
`themes/field-notes/data.js` parses this format automatically into structured fields:
- `location`: Extracted and localized for `en`, `ja`, `zh`.
- `camera`: Camera body and lens specification.
- `caption`: Localized descriptive text displayed inside `Lightbox.js`.

### Project Showcase Props (`workProjectPages`)
Each project object injected into `WorkSection.js` provides:
- `id`: Unique Notion page ID.
- `title`: Project title.
- `summary`: One-line pitch.
- `tags`: Array of technology labels (e.g. `['Cloudflare Workers', 'D1', 'Vue 3']`).
- `blockMap`: Pre-rendered Notion block map, rendered via NotionNext's `NotionPage` component when the card is expanded.

---

## 6. How to Use the Consolidated Code Bundle in AI Assistants

When pair programming or asking an AI (Copilot, Claude, ChatGPT) to debug or add features:
1. Provide this document as the **Architectural Context**.
2. Provide `CONSOLIDATED_SOURCE_CODE.txt` as the **Codebase Implementation**.
3. Use the following prompt prefix:
   > *"I have provided the architectural specification and the single-file source bundle of our custom Next.js portfolio theme. All files are clearly separated by `FILE: <path>` boundaries. Please refer to this context when reviewing or modifying the code."*
