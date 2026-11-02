# Consolidated Architecture & Code Bundles
## Standalone AI Context & De-Identified Implementation Modules

This directory contains standalone, de-identified engineering modules and their consolidated single-file source representations. Each module is fully self-contained and designed to provide complete architectural context to AI pair programmers (e.g. GitHub Copilot, Claude, ChatGPT) without requiring multi-file directory scans, external dependencies, or revealing private infrastructure details.

---

## Available Modules

### 1. Web Portfolio Scrapbook Theme & Next.js SSR Optimizations
- **Focus**: Custom Next.js 14 frontend theme extension, scrapbook/polaroid design system, server-side Notion block prefetching, and hydration optimizations.
- **Documentation**: [ARCHITECTURE_AND_MODIFICATIONS.md](./web-portfolio-theme/ARCHITECTURE_AND_MODIFICATIONS.md)
- **Consolidated Source**: [CONSOLIDATED_SOURCE_CODE.txt](./web-portfolio-theme/CONSOLIDATED_SOURCE_CODE.txt)
- **Primary Technologies**: Next.js, React, Tailwind CSS, Notion API (`notion-client`), CSS-in-JS.

### 2. Cloudflare Edge Watchdog & Host Telemetry Monitor
- **Focus**: High-reliability dual-layer uptime watchdog, Cloudflare Worker + D1 persistence, anti-flapping state machine, non-root Python telemetry daemon, and server-rendered Bento UI.
- **Documentation**: [ARCHITECTURE_AND_MODIFICATIONS.md](./edge-storage-monitor/ARCHITECTURE_AND_MODIFICATIONS.md)
- **Consolidated Source**: [CONSOLIDATED_SOURCE_CODE.txt](./edge-storage-monitor/CONSOLIDATED_SOURCE_CODE.txt)
- **Primary Technologies**: TypeScript, Cloudflare Workers, Cloudflare D1 (SQLite), Python 3, Telegram Bot API.

---

## Workflow for AI Pair Programming

When debugging, refactoring, or adding features in restricted environments:

1. **Feed Context**:
   - Provide the module's `ARCHITECTURE_AND_MODIFICATIONS.md` to explain the system's backstory, requirements, and component relationships.
2. **Feed Source Code**:
   - Drag or paste the module's `CONSOLIDATED_SOURCE_CODE.txt` into your AI chat window (or reference it with `#file:CONSOLIDATED_SOURCE_CODE.txt`).
3. **Prompt Template**:
   ```text
   I am sharing the architectural design document and the consolidated single-file source bundle of this project.
   All individual files within the bundle are delimited by `FILE: <path>` headers.
   Please analyze the implementation in the context of the architecture document to help me [investigate bug / optimize performance / refactor logic].
   ```
