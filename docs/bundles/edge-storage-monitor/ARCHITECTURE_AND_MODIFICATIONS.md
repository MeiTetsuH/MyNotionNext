# Cloudflare Edge Watchdog & Host Telemetry Monitor
## Architectural Specification, System Design, and Context Guide

> **Note for AI Assistant / Pair Programmer:**
> This document provides the end-to-end technical context for the accompanying single-file consolidated source code bundle (`CONSOLIDATED_SOURCE_CODE.txt`). Read this document first to understand the architecture, state machine, edge watchdog lifecycle, and exact implementations across the codebase.

---

## 1. System Overview & Core Mission

This system is an enterprise-grade, high-reliability dual-layer infrastructure monitoring, telemetry collection, and alert dispatching platform built specifically for hybrid cloud and self-hosted environments (on-premise storage servers/NAS, Docker container nodes, Cloudflare edge services, and Vercel applications).

### Primary Engineering Objectives:
1. **Zero-Cost, High-Availability Edge Watchdog**:
   - Deployed on **Cloudflare Workers** with an embedded **Cloudflare D1 (SQLite)** database.
   - Operates strictly outside the local infrastructure footprint. If on-premise hardware experiences a catastrophic power outage, network fiber cut, or hardware lockup, the edge watchdog independently detects the missing heartbeat and alerts administrators within 25–35 minutes.
2. **Zero-Privilege, Read-Only On-Premise Telemetry Daemon**:
   - A lightweight Python daemon (`nas/probe.py`) running on the storage host as a non-root system user.
   - Inspects hardware health (CPU load, core temperatures, memory usage, disk drive temperatures, storage pool wear levels, and Docker container states).
   - Posts a strictly allowlisted, tamper-resistant JSON telemetry payload over HTTPS with Bearer token authentication.
3. **Multi-Stage Failure Evaluation & Anti-Flapping State Machine**:
   - Traditional monitoring tools produce noise from transient network hiccups.
   - This system enforces multi-sample confirmation:
     - Edge and public services require **3 consecutive failed 10-minute check cycles** (~20–30 minutes) before raising an incident.
     - Heartbeats require 25+ minutes of silence to trigger a failure.
   - **Incident Deduplication**: Active incidents are tracked in D1. An unresolved incident produces at most **one reminder notification per day**.
4. **Dark Bento Status Dashboard (`src/ui.ts`, `src/dashboard.ts`)**:
   - Single-binary, zero-dependency server-side rendered HTML/CSS dashboard.
   - Accessible behind **Cloudflare Access (Zero Trust JWT)** or Admin Token.
   - Features 5 comprehensive operational tabs: Overview, Storage Host, Services, Network & Devices, and Schedule.
5. **Authenticated Operational Control CLI (`scripts/admin.py`)**:
   - Admin command-line helper to view live status, trigger immediate evaluations, silence alerts during maintenance windows, or run notification drills.

---

## 2. Backstory, Context & Motivation (前因后果)

### The Problem with Conventional Monitoring:
1. **External Ping Monitors (e.g. UptimeRobot, Pingdom)**:
   - Only test whether an external HTTP port is open.
   - Blind to internal silent failures: disk SMART degradation, high NVMe/SATA drive temperatures, volume read-only lockups, Docker container crashes behind an intact HTTP proxy, or silent failure of scheduled cloud backups.
2. **Internal Monitoring Stacks (e.g. Prometheus + Grafana + Alertmanager)**:
   - Resource-heavy and complex to maintain.
   - **Catastrophic Failure Blindspot**: If the local server loses power or internet connectivity, the internal monitoring stack dies with it—meaning nobody is left to send the notification!
3. **Alert Fatigue & Flapping**:
   - Home networks and residential broadband occasionally experience transient DNS blips or brief packet drops (10–30 seconds). Naive monitoring tools send false-alarm alerts and spam messaging channels, training engineers to ignore alerts.

### The Solution:
A decoupled **dual-layer architecture**:
- **Inside**: The host probes its own physical health and pushes telemetry outward to the edge.
- **Outside**: The edge watchdog records samples, verifies heartbeat timeliness, independently probes external entry points, enforces lease locks to prevent race conditions, and sends concise, actionable alerts to Telegram.

---

## 3. Architecture & File Breakdown (系统组成与修改实现)

```
┌────────────────────────────────────────────────────────┐
│                   On-Premise Host                      │
│                                                        │
│  ┌──────────────────┐       ┌──────────────────────┐  │
│  │   Hardware / OS  │       │   Docker Engine      │  │
│  │  (CPU, Disk, RAM)│       │  (Container Status)  │  │
│  └────────┬─────────┘       └──────────┬───────────┘  │
│           │                            │              │
│           └──────────────┬─────────────┘              │
│                          ▼                            │
│                  `nas/probe.py`                       │
│        (Runs every 10 min, non-root user)             │
└──────────────────────────┬─────────────────────────────┘
                           │ Authenticated HTTPS Post
                           │ (`/heartbeat`, Bearer Token)
                           ▼
┌────────────────────────────────────────────────────────┐
│               Cloudflare Edge Watchdog                 │
│                                                        │
│   `src/index.ts` (Entry Point, Cron Trigger, Router)  │
│                          │                             │
│   `src/model.ts` (D1 DB, State Machine, Lease Lock)   │
│                          │                             │
│   `src/dashboard.ts` & `src/ui.ts` (Bento HTML UI)     │
│                          │                             │
│       ┌──────────────────┴──────────────────┐          │
│       ▼                                     ▼          │
│  Cloudflare D1 (SQLite)             Telegram Bot API   │
│  (State, Incidents, Metrics)       (Alerts & Recovery) │
└────────────────────────────────────────────────────────┘
```

### Detailed Component Analysis:

| File Path | Stack / Role | Key Responsibilities & Logic |
| :--- | :--- | :--- |
| `wrangler.jsonc` | HCL / JSONC | **Worker Configuration**: Configures Cloudflare Worker entry point, D1 database binding (`DB`), environment variables, and the 10-minute cron trigger (`cron = "*/10 * * * *"`). |
| `migrations/0001_state.sql` | SQLite / D1 | **Core State Schema**: Defines tables for `state` (key-value storage for latest heartbeat, last run timestamp, lease lock) and `incidents` (tracks active incidents, consecutive failures, first failed time, last notified time). |
| `migrations/0002_history.sql` | SQLite / D1 | **Time-Series Schema**: Defines `heartbeat_samples` and `site_samples` for rolling 7-day metric retention (CPU, temperatures, latencies). |
| `src/model.ts` | TypeScript | **Persistence & State Machine**: Implements lease locking (`tryAcquireCheckLease`) to avoid race conditions when multiple Cron instances fire. Handles incident creation, consecutive failure counts, recovery detection, and silent maintenance window checks. |
| `src/index.ts` | TypeScript | **Worker Entry & Alert Dispatcher**: Handles incoming requests (`/heartbeat`, `/healthz`, `/dashboard`, `/admin/*`). Executes scheduled Cron checks. Formats markdown alert messages and dispatches them via Telegram Bot API with rate limiting. |
| `src/dashboard.ts` | TypeScript | **Dashboard Controller**: Aggregates live system telemetry, service catalog health, network client counts, and backup history. Validates Cloudflare Access Zero Trust JWT tokens via JWKS public keys. |
| `src/ui.ts` | TypeScript | **Zero-Dependency Bento HTML/CSS UI**: Pure server-side HTML template rendering. Generates a responsive Dark Bento Grid across 5 tabs (Overview, Appliance, Services, Network, Schedule) with zero frontend framework overhead. |
| `src/details.ts` | TypeScript | **Incident Details View**: Renders dedicated drill-down pages for active or historical incidents with timestamps, error traces, and recovery logs. |
| `nas/probe.py` | Python 3 | **Host Telemetry Daemon**: Gathers CPU load averages, disk SMART temperatures via `smartctl` or sysfs, volume utilization, Docker container statuses via local Docker socket, and network interface stats. Submits payload to `/heartbeat` with automatic fallback to secondary edge URLs. |
| `scripts/admin.py` | Python 3 | **CLI Helper**: Authenticated command-line tool allowing system administrators to trigger manual health checks, query system status, silence notifications, or simulate alert/recovery drills. |

---

## 4. Threshold Matrix & Failure State Transitions

| Target Metric | Normal Baseline | Incident Threshold | Detection Time Window |
| :--- | :--- | :--- | :--- |
| **Host Heartbeat** | Sample every 10 min | Silence > 25 minutes | 25–35 minutes (tolerates 1 transient network drop) |
| **Edge Probed Sites** | HTTP 200 + Content OK | 3 consecutive failed samples | 20–30 minutes (eliminates transient DNS/routing noise) |
| **Public Gateway** | HTTP 200 + Valid DOM | 3 consecutive failed samples | 20–30 minutes |
| **Daily Health Report** | Daily at 16:15 | Stale > 36 hours or `overall !== 'ok'` | Evaluated on next 10-minute Cron |
| **Cloud Backups** | Bi-weekly runs | Last success > 120 hours or run > 24 hours | Evaluated on next 10-minute Cron |
| **Volume Snapshots** | Daily snapshots | Age > 48 hours | Evaluated on next 10-minute Cron |

---

## 5. Security & De-identification Conventions

1. **Authentication Layer**:
   - `INGEST_TOKEN`: Only grants permission to POST telemetry to `/heartbeat`. Cannot read state or access dashboard.
   - `ADMIN_TOKEN`: Grants access to operational control (`/api/admin/*`) and private status endpoints.
   - `Cloudflare Access JWT`: Authenticates human operators accessing the Bento dashboard via corporate Zero Trust single sign-on.
2. **Sanitized Representations in Consolidated Code**:
   - All internal domains are normalized to `corp.internal` or `status.corp.internal`.
   - All authorization tokens and Telegram API keys are replaced with `<AUTH_TOKEN_PLACEHOLDER>`.
   - Host system users are normalized to `probe_user` or `engineer`.

---

## 6. How to Use the Consolidated Code Bundle in AI Assistants

When pair programming or asking an AI (Copilot, Claude, ChatGPT) to debug or add features:
1. Provide this document as the **Architectural Context**.
2. Provide `CONSOLIDATED_SOURCE_CODE.txt` as the **Codebase Implementation**.
3. Use the following prompt prefix:
   > *"I have provided the architectural specification and the single-file source bundle of our Cloudflare Worker + Python edge monitoring system. All files are clearly separated by `FILE: <path>` boundaries. Please refer to this context when reviewing or modifying the code."*
