import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useLang } from './LangContext'
import { STICKER_ICONS } from './StackStickers'

/*
 * Home Lab panel: the hand-drawn device set with a thin live layer on top,
 * driven by the real Tokyo-time schedule (NAS cron jobs, Muse runs, the
 * 10-minute monitor heartbeat and the hourly photo relay). The iMac screen
 * shows a ticking countdown, the NAS LEDs beat, Muse says what it is up to,
 * and every device opens a short note.
 */
const ART = '/themes/field-notes/assets/home-lab-set.webp'
const VIEW_W = 1156
const VIEW_H = 1360

const NOTE_HOMELAB = '/article/dev5'
const NOTE_NAS = '/article/dev3'

const COPY = {
  zh: {
    nodes: {
      muse: ['Muse', '云端助手'],
      drive: ['Google Drive', 'NasSync'],
      telegram: ['Telegram', '告警 · 简报'],
      cloudflare: ['Cloudflare', 'Tunnel · Worker'],
      imac: ['iMac', '主力开发机'],
      nas: ['DS720+', '24h · 6 个容器'],
      pixel: ['Pixel', '照片中继'],
      linux: ['Linux VM', '工具机'],
      router: ['路由器', '0 开放端口'],
      claw: ['OpenClaw', '10.27 退休']
    },
    notes: {
      muse: '云端 AI 助手，不在家里常驻。08:00 东京早报、16:30 健康判读、21:30 晚报；读 NAS 只走 Tailscale 上一条被锁死的只读通道，异常才说话。',
      drive: 'NasSync 目录。NAS 每天 16:20 导出脱敏的健康摘要，21:10 发布晚报资料包；Muse 只读这里的副本，从不反向写回 NAS。',
      telegram: '告警和推送的出口。Homelab Monitor 只在出现异常或恢复时发消息；TrendRadar 在 10:00–20:00 每两小时推一次 AI 简报。',
      cloudflare: 'cloudflared 主动向东京边缘建隧道，路由器一个端口都不开。Worker 版 Homelab Monitor 每 10 分钟收一次 NAS 心跳，跑 12 项检查。',
      imac: '写代码的地方，Codex、Claude Code、Antigravity 轮流上岗。自带千兆网口直连 NAS，单独一个网段跑 Time Machine 和 SMB。',
      nas: '群晖 DS720+，24 小时在线。常驻 AdGuard Home、cloudflared、Syncthing、TrendRadar、RSSHub、Glance 六个容器，每天 03:00 轮转快照。',
      pixel: '照片中继：iPhone 照片先进 NAS，再按小时滚动同步到常年插电的 Pixel，借它把全家照片备份进 Google Photos。',
      linux: 'Ubuntu 开发工具机。Muse 用独立的低权限账号调用 CLI，没有免密 sudo，动系统之前必须先问我。',
      router: '万兆路由，对外一个端口都不开。公网访问全部走 Cloudflare Tunnel，在外面连家里走 Tailscale。',
      claw: '以前的本地助手小龙虾。任务一条条迁给 Muse，晚报连续验收三晚之后，10 月 27 日正式关停。'
    },
    events: {
      snapshot: '快照轮转',
      am: '东京早报',
      trend: 'AI 简报推送',
      sample: '健康采样',
      export: '健康导出',
      health: '健康判读',
      news: '晚报资料包',
      pm: '科技晚报',
      retry: '送达核对',
      archive: '报告归档'
    },
    ruler: { snapshot: '快照', am: '早报', health: '体检', pm: '晚报' },
    beat: '心跳',
    photos: '照片',
    now: 'NOW',
    next: 'NEXT',
    today: 'TODAY · JST',
    museIdle: time => `☕ 下一班 ${time}`,
    readNote: '读全文 ↗',
    close: '收起',
    hint: '← 点图里的任何设备，这里会翻出它的笔记。带紫点的，就是此刻正在干活的。',
    stackLabel: '常驻工具'
  },
  en: {
    nodes: {
      muse: ['Muse', 'cloud assistant'],
      drive: ['Google Drive', 'NasSync'],
      telegram: ['Telegram', 'alerts'],
      cloudflare: ['Cloudflare', 'Tunnel · Worker'],
      imac: ['iMac', 'main desk'],
      nas: ['DS720+', '24h · 6 containers'],
      pixel: ['Pixel', 'photo relay'],
      linux: ['Linux VM', 'tool box'],
      router: ['Router', '0 open ports'],
      claw: ['OpenClaw', 'retired 10.27']
    },
    notes: {
      muse: 'A cloud AI assistant with nothing resident at home: 08:00 Tokyo brief, 16:30 health read, 21:30 evening brief. It reads the NAS over one locked-down, read-only Tailscale channel and only speaks up when something changes.',
      drive: 'The NasSync folder. The NAS exports a redacted health summary at 16:20 and the evening news bundle at 21:10; Muse reads these copies and never writes back to the NAS.',
      telegram: 'Where alerts and digests land. Homelab Monitor only messages on a new incident or a recovery; TrendRadar pushes an AI digest every two hours from 10:00 to 20:00.',
      cloudflare: 'cloudflared dials out to the Tokyo edge, so the router opens zero ports. The Homelab Monitor Worker takes a NAS heartbeat every 10 minutes and runs 12 checks.',
      imac: 'Where the code happens, with Codex, Claude Code and Antigravity taking turns. Its built-in gigabit port goes straight to the NAS for Time Machine and SMB.',
      nas: 'A Synology DS720+, always on. Six resident containers: AdGuard Home, cloudflared, Syncthing, TrendRadar, RSSHub and Glance, with snapshots rotated at 03:00.',
      pixel: 'Photo relay: iPhone photos land on the NAS, then sync hourly to an always-plugged-in Pixel, which backs the family library up to Google Photos.',
      linux: 'An Ubuntu tool box. Muse calls CLIs through its own low-privilege account with no passwordless sudo; anything system-level waits for my OK.',
      router: 'A 10G router with no open ports. Public access goes through Cloudflare Tunnel, and remote access home goes over Tailscale.',
      claw: 'The old local assistant. Its jobs moved to Muse one by one, and after three clean nights of evening briefs it was shut down on October 27.'
    },
    events: {
      snapshot: 'snapshots',
      am: 'Tokyo brief',
      trend: 'AI digest',
      sample: 'health sample',
      export: 'health export',
      health: 'health read',
      news: 'news bundle',
      pm: 'evening brief',
      retry: 'delivery check',
      archive: 'archive'
    },
    ruler: { snapshot: 'snaps', am: 'AM brief', health: 'health', pm: 'PM brief' },
    beat: 'beat',
    photos: 'photos',
    now: 'NOW',
    next: 'NEXT',
    today: 'TODAY · JST',
    museIdle: time => `☕ next ${time}`,
    readNote: 'Read the note ↗',
    close: 'Close',
    hint: '← Tap any device in the drawing and its note opens here. A purple dot means it is working right now.',
    stackLabel: 'Always running'
  },
  ja: {
    nodes: {
      muse: ['Muse', 'クラウド助手'],
      drive: ['Google Drive', 'NasSync'],
      telegram: ['Telegram', '通知'],
      cloudflare: ['Cloudflare', 'Tunnel · Worker'],
      imac: ['iMac', 'メイン機'],
      nas: ['DS720+', '24h · コンテナ 6'],
      pixel: ['Pixel', '写真リレー'],
      linux: ['Linux VM', 'ツール機'],
      router: ['ルーター', 'ポート開放ゼロ'],
      claw: ['OpenClaw', '10.27 引退']
    },
    notes: {
      muse: 'クラウド側の AI 助手で、家には常駐しません。08:00 東京朝刊、16:30 健康チェック、21:30 夕刊。NAS へは Tailscale 上の読み取り専用の経路だけ。変化があるときだけ知らせます。',
      drive: 'NasSync フォルダ。NAS が 16:20 に匿名化した健康サマリー、21:10 に夕刊用ニュース束を書き出し、Muse はこのコピーだけを読みます。',
      telegram: '通知の出口。Homelab Monitor は異常と復旧のときだけ送信し、TrendRadar は 10:00–20:00 に 2 時間おきで AI ダイジェストを届けます。',
      cloudflare: 'cloudflared から東京エッジへトンネルを張るので、ルーターのポートはゼロ。Worker の Homelab Monitor が 10 分ごとに NAS の心拍を受けて 12 項目を確認します。',
      imac: 'コードを書く場所。Codex・Claude Code・Antigravity が交代で働きます。内蔵ギガビットポートを NAS に直結し、Time Machine と SMB 専用に。',
      nas: 'Synology DS720+、24 時間稼働。AdGuard Home・cloudflared・Syncthing・TrendRadar・RSSHub・Glance の 6 コンテナが常駐し、03:00 にスナップショットを回します。',
      pixel: '写真リレー。iPhone の写真はまず NAS へ、そこから毎時つなぎっぱなしの Pixel に同期し、Google Photos へバックアップします。',
      linux: 'Ubuntu のツール機。Muse は専用の低権限アカウントで CLI を使い、パスワードなし sudo はなし。システムに触る前は必ず確認します。',
      router: '10G ルーターで、外向きのポートはひとつも開けていません。公開は Cloudflare Tunnel、外から家へは Tailscale。',
      claw: '以前のローカル助手。仕事をひとつずつ Muse に移し、夕刊を 3 晩続けて検証したあと、10 月 27 日に停止しました。'
    },
    events: {
      snapshot: 'スナップショット',
      am: '東京朝刊',
      trend: 'AI ダイジェスト',
      sample: '健康データ採取',
      export: '健康データ出力',
      health: '健康チェック',
      news: 'ニュース束',
      pm: '夕刊',
      retry: '配信確認',
      archive: 'レポート保管'
    },
    ruler: { snapshot: 'スナップ', am: '朝刊', health: '点検', pm: '夕刊' },
    beat: '心拍',
    photos: '写真',
    now: 'NOW',
    next: 'NEXT',
    today: 'TODAY · JST',
    museIdle: time => `☕ 次は ${time}`,
    readNote: '記事を読む ↗',
    close: '閉じる',
    hint: '← 絵の中の機器を押すと、ここにノートが開きます。紫の点は、いま動いている印です。',
    stackLabel: '常駐ツール'
  }
}

const getLabCopy = lang => COPY[lang] || COPY.zh

const NODE_LINKS = {
  muse: NOTE_HOMELAB,
  drive: NOTE_HOMELAB,
  telegram: NOTE_HOMELAB,
  cloudflare: NOTE_HOMELAB,
  imac: NOTE_NAS,
  nas: NOTE_NAS,
  pixel: NOTE_NAS,
  linux: NOTE_HOMELAB,
  router: NOTE_NAS,
  claw: NOTE_HOMELAB
}

// Daily jobs in Tokyo time (from the home lab runbook). `run` is how long the
// job is drawn as running; `links` / `nodes` are what lights up meanwhile.
const DAILY = [
  { id: 'snapshot', at: '03:00', run: 10, who: 'NAS', nodes: ['nas'], links: [] },
  { id: 'am', at: '08:00', run: 25, who: 'Muse', nodes: ['muse'], links: [] },
  ...['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'].map(at => ({
    id: 'trend',
    at,
    run: 5,
    who: 'NAS',
    nodes: ['nas', 'telegram'],
    links: ['trend']
  })),
  { id: 'sample', at: '16:15', run: 5, who: 'NAS', nodes: ['nas'], links: [] },
  { id: 'export', at: '16:20', run: 5, who: 'NAS', nodes: ['nas', 'drive'], links: ['drive'] },
  { id: 'health', at: '16:30', run: 25, who: 'Muse', nodes: ['muse', 'nas'], links: ['tailscale'] },
  { id: 'news', at: '21:10', run: 5, who: 'NAS', nodes: ['nas', 'drive'], links: ['drive'] },
  { id: 'pm', at: '21:30', run: 25, who: 'Muse', nodes: ['muse', 'drive'], links: [] },
  { id: 'retry', at: '22:20', run: 5, who: 'Muse', nodes: ['muse'], links: [] },
  { id: 'archive', at: '22:45', run: 5, who: 'NAS', nodes: ['nas'], links: ['tailscale'] }
]
const DAY = 24 * 3600
const HEARTBEAT = 600
const PHOTO_SYNC = 3600
const toSecs = hm => {
  const [h, m] = hm.split(':').map(Number)
  return h * 3600 + m * 60
}
const RUNS = DAILY.map(d => ({ ...d, start: toSecs(d.at) })).sort((a, b) => a.start - b.start)

const tokyoSeconds = date => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Tokyo',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23'
  }).formatToParts(date)
  const get = type => Number(parts.find(p => p.type === type)?.value || 0)
  return get('hour') * 3600 + get('minute') * 60 + get('second')
}

const pad = n => String(n).padStart(2, '0')
export const formatClock = secs => {
  const s = ((secs % DAY) + DAY) % DAY
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`
}
const formatShort = secs => `${pad(Math.floor(secs / 60))}:${pad(secs % 60)}`

/**
 * State of the home lab for a given second of the Tokyo day: the job running
 * now, the next job and its countdown, the next heartbeat / photo sync, and
 * which nodes and links are busy.
 */
export const labSchedule = secs => {
  const busy = RUNS.find(r => secs >= r.start && secs < r.start + r.run * 60) || null
  const nextToday = RUNS.find(r => r.start > secs)
  const next = nextToday || RUNS[0]
  const left = (nextToday ? next.start : next.start + DAY) - secs
  const nodes = new Set(busy ? busy.nodes : [])
  const links = new Set(busy ? busy.links : [])
  const beating = secs % HEARTBEAT < 60
  if (beating) {
    links.add('tunnel')
    nodes.add('nas')
    nodes.add('cloudflare')
  }
  const syncing = secs % PHOTO_SYNC < 300
  if (syncing) {
    links.add('photo')
    nodes.add('nas')
    nodes.add('pixel')
  }
  return {
    busy,
    next,
    left,
    elapsed: busy ? secs - busy.start : 0,
    beatLeft: HEARTBEAT - (secs % HEARTBEAT),
    photoLeft: PHOTO_SYNC - (secs % PHOTO_SYNC),
    nodes,
    links
  }
}

const useTokyoClock = () => {
  const [secs, setSecs] = useState(null)
  // Client-only so SSR and hydration agree; ticks every second
  useEffect(() => {
    const tick = () => setSecs(tokyoSeconds(new Date()))
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [])
  return secs
}

/* ---------------- live layer over the artwork ---------------- */

// Device hit areas in artwork pixels (x, y, w, h); later entries sit on top
const HOTSPOTS = [
  { id: 'muse', box: [130, 110, 260, 230] },
  { id: 'drive', box: [450, 120, 170, 150] },
  { id: 'telegram', box: [660, 100, 190, 160] },
  { id: 'cloudflare', box: [880, 160, 220, 140] },
  { id: 'imac', box: [90, 340, 620, 530] },
  { id: 'nas', box: [710, 640, 400, 300] },
  { id: 'pixel', box: [90, 980, 180, 270] },
  { id: 'linux', box: [296, 1070, 254, 150] },
  { id: 'router', box: [600, 1000, 270, 240] },
  { id: 'claw', box: [910, 1020, 210, 260] }
]
const pct = (v, total) => `${((v / total) * 100).toFixed(2)}%`
const boxStyle = ([x, y, w, h]) => ({
  left: pct(x, VIEW_W),
  top: pct(y, VIEW_H),
  width: pct(w, VIEW_W),
  height: pct(h, VIEW_H)
})

// NAS front LEDs; the first one carries the 10-minute heartbeat
const NAS_LEDS = [
  [886, 793],
  [887, 824],
  [887, 852],
  [887, 879]
]

const MUSE_RUNS = RUNS.filter(r => r.who === 'Muse')
const nextMuseRun = secs => MUSE_RUNS.find(r => r.start > secs) || MUSE_RUNS[0]

// Run before paint on the client only (layout effects warn during SSR)
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

/**
 * Squeeze a line of SVG text to `max` user units when it would overflow the
 * drawn screen (long Japanese task names, for example); short lines keep
 * their natural spacing.
 */
const useFitText = (max, content) => {
  const ref = useRef(null)
  useIsoLayoutEffect(() => {
    const el = ref.current
    if (!el || typeof el.getComputedTextLength !== 'function') return
    el.removeAttribute('textLength')
    el.removeAttribute('lengthAdjust')
    if (el.getComputedTextLength() > max) {
      el.setAttribute('textLength', String(max))
      el.setAttribute('lengthAdjust', 'spacingAndGlyphs')
    }
  }, [max, content])
  return ref
}

// Usable width of the drawn screen, in artwork units, right of the code lines
const SCREEN_RIGHT = 660
const LINE_X = 440
const COUNT_X = 176

/* Text drawn onto the iMac screen, tilted to match the drawn monitor */
const ScreenTerminal = ({ state, secs, copy }) => {
  const job = state ? state.busy || state.next : null
  const lineText = job
    ? `${state.busy ? copy.now : copy.next} ${job.at} ${copy.events[job.id]}`
    : ''
  const footText = state
    ? `♥ ${copy.beat} ${formatShort(state.beatLeft)}   ⇅ ${copy.photos} ${formatShort(state.photoLeft)}`
    : ''
  const clockText = `TOKYO ${secs === null ? '--:--:--' : formatClock(secs)}`
  const lineRef = useFitText(SCREEN_RIGHT - LINE_X, lineText)
  const footFitKey = `${copy.beat}|${copy.photos}|${Boolean(state)}`
  const footRef = useFitText(SCREEN_RIGHT - COUNT_X, footFitKey)
  return (
    <g className='lab-term' transform='rotate(-4 412 530)'>
      <text className='lab-term-clock' x={LINE_X} y='462'>
        {clockText}
      </text>
      <text ref={lineRef} className='lab-term-line' x={LINE_X} y='500'>
        {lineText}
      </text>
      <text className={`lab-term-count${state?.busy ? ' is-busy' : ''}`} x={COUNT_X} y='606'>
        {state
          ? state.busy
            ? `T+${formatClock(state.elapsed)}`
            : `T-${formatClock(state.left)}`
          : 'T-00:00:00'}
        <tspan className='lab-term-cursor'>▌</tspan>
      </text>
      <text ref={footRef} className='lab-term-foot' x={COUNT_X + 2} y='644'>
        {footText}
      </text>
    </g>
  )
}

/* 24h ruler under the drawing: the day's runs grouped into capsules, plus a "now" needle */
const RULER_X0 = 22
const RULER_X1 = 578
const rulerX = secs => RULER_X0 + ((RULER_X1 - RULER_X0) * secs) / DAY
// Jobs that run back to back read as one stretch of work on the ruler
const RULER_GROUPS = [
  { id: 'snapshot', label: '03:00', from: '03:00', to: '03:10', who: 'nas' },
  { id: 'am', label: '08:00', from: '08:00', to: '08:25', who: 'muse' },
  { id: 'health', label: '16:30', from: '16:15', to: '16:55', who: 'muse' },
  { id: 'pm', label: '21:30', from: '21:10', to: '22:50', who: 'muse' }
]
const TREND_TIMES = RUNS.filter(r => r.id === 'trend').map(r => r.start)

const groupState = (g, secs) => {
  if (secs === null) return ''
  const from = toSecs(g.from)
  const to = toSecs(g.to)
  if (secs >= from && secs < to) return 'is-busy'
  if (secs >= to) return 'is-past'
  return ''
}

const DayRuler = ({ secs, copy }) => {
  const nowX = secs === null ? null : rulerX(secs)
  return (
    <svg className='lab-ruler' viewBox='0 0 600 100' role='img' aria-label={copy.today}>
      <text className='lab-ruler-title' x={RULER_X0} y='14'>
        {copy.today}
      </text>

      <line className='lab-ruler-base' x1={RULER_X0} y1='64' x2={RULER_X1} y2='64' />
      {nowX !== null && (
        <line className='lab-ruler-past' x1={RULER_X0} y1='64' x2={nowX} y2='64' />
      )}
      {Array.from({ length: 25 }, (_, h) => (
        <line
          key={h}
          className={`lab-ruler-tick${h % 6 === 0 ? ' is-major' : ''}`}
          x1={rulerX(h * 3600)}
          x2={rulerX(h * 3600)}
          y1='70'
          y2={h % 6 === 0 ? 77 : 74}
        />
      ))}
      {[0, 6, 12, 18, 24]
        .filter(h => nowX === null || Math.abs(rulerX(h * 3600) - nowX) > 24)
        .map(h => (
          <text key={h} className='lab-ruler-hour' x={rulerX(h * 3600)} y='92' textAnchor='middle'>
            {pad(h)}
          </text>
        ))}

      {TREND_TIMES.map(t => (
        <circle
          key={t}
          className={`lab-ruler-trend${secs !== null && t + 300 <= secs ? ' is-past' : ''}`}
          cx={rulerX(t)}
          cy='64'
          r='3.6'
        />
      ))}

      {RULER_GROUPS.map(g => {
        const x0 = rulerX(toSecs(g.from))
        const x1 = rulerX(toSecs(g.to))
        const w = Math.max(14, x1 - x0 + 8)
        const cx = x0 - 4 + w / 2
        return (
          <g key={g.id} className={`lab-ruler-group is-${g.who} ${groupState(g, secs)}`}>
            <line className='lab-ruler-leader' x1={cx} x2={cx} y1='42' y2='56' />
            <rect x={x0 - 4} y='57' width={w} height='14' rx='7' />
            <text className='lab-ruler-label' x={cx} y='36' textAnchor='middle'>
              {`${g.label} ${copy.ruler[g.id]}`}
            </text>
          </g>
        )
      })}

      {nowX !== null && (
        <g className='lab-ruler-now'>
          <line x1={nowX} x2={nowX} y1='50' y2='78' />
          <rect x={nowX - 19} y='81' width='38' height='15' rx='2' />
          <text x={nowX} y='92' textAnchor='middle'>
            NOW
          </text>
        </g>
      )}
    </svg>
  )
}

export const LabFigure = ({ activeId = null, onSelect }) => {
  const { lang } = useLang()
  const copy = getLabCopy(lang)
  const secs = useTokyoClock()
  const state = secs === null ? null : labSchedule(secs)
  const museBusy = state?.busy && state.busy.who === 'Muse' ? state.busy : null
  const museNext = secs === null ? null : nextMuseRun(secs)
  const beating = Boolean(state?.links.has('tunnel'))

  return (
    <div className='lab-stage'>
      <div className='lab-figure'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className='lab-art-img'
          src={ART}
          alt=''
          width={VIEW_W}
          height={VIEW_H}
          loading='lazy'
          decoding='async'
        />
        <svg
          className='lab-overlay'
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          aria-hidden='true'
          preserveAspectRatio='none'>
          <ScreenTerminal state={state} secs={secs} copy={copy} />
          {NAS_LEDS.map(([cx, cy], i) => (
            <circle
              key={cy}
              className={`lab-led-ring${i === 0 ? ' is-heartbeat' : ''}${i === 0 && beating ? ' is-beating' : ''}`}
              cx={cx}
              cy={cy}
              r='13'
              style={{ animationDelay: `${i * 0.35}s` }}
            />
          ))}
        </svg>

        {/* Short on purpose: it has to fit the gap above Muse; the screen spells out the task */}
        {secs !== null && (
          <span
            className={`lab-muse-bubble mono${museBusy ? ' is-busy' : ''}`}
            title={museBusy ? copy.events[museBusy.id] : copy.museIdle(museNext.at)}>
            {museBusy ? `✍ ${museBusy.at}` : `☕ ${museNext.at}`}
          </span>
        )}

        {HOTSPOTS.map(h => (
          <button
            key={h.id}
            type='button'
            className={`lab-hotspot is-${h.id}${state?.nodes.has(h.id) ? ' is-on' : ''}${activeId === h.id ? ' is-selected' : ''}`}
            style={boxStyle(h.box)}
            aria-label={copy.nodes[h.id].join(' · ')}
            aria-pressed={activeId === h.id}
            aria-controls='lab-note-card lab-note-card-art'
            onClick={() => onSelect && onSelect(activeId === h.id ? null : h.id)}
          />
        ))}
      </div>
      <DayRuler secs={secs} copy={copy} />
    </div>
  )
}

/** Note card for the selected device; sits in the copy column on wide screens and under the drawing when stacked. */
export const LabNoteCard = ({ activeId = null, onClose, variant = 'copy' }) => {
  const { lang } = useLang()
  const copy = getLabCopy(lang)
  const label = activeId ? copy.nodes[activeId] : null
  const hintText =
    variant === 'art' ? copy.hint.replace(/^←/, '↑') : copy.hint
  return (
    <div
      id={variant === 'art' ? 'lab-note-card-art' : 'lab-note-card'}
      className={`lab-note-card is-${variant}${label ? ' is-open' : ''}`}
      role='region'
      aria-live='polite'>
      <span className='lab-note-tape' aria-hidden='true' />
      {label ? (
        <>
          <strong>{label.join(' · ')}</strong>
          <p>{copy.notes[activeId]}</p>
          <div className='lab-note-actions'>
            <Link href={NODE_LINKS[activeId]} className='lab-note-link mono'>
              {copy.readNote}
            </Link>
            <button type='button' className='lab-note-close mono' onClick={onClose}>
              × {copy.close}
            </button>
          </div>
        </>
      ) : (
        <p className='lab-note-hint'>{hintText}</p>
      )}
    </div>
  )
}

const STRIP = [
  { id: 'docker', name: 'Docker', r: -8, y: 2 },
  { id: 'cloudflare', name: 'Cloudflare Tunnel', r: 6, y: -4 },
  { id: 'tailscale', name: 'Tailscale', r: -4, y: 3 },
  { id: 'adguard', name: 'AdGuard Home', r: 7, y: -2 },
  { id: 'googlephotos', name: 'Google Photos', r: -6, y: 4 },
  { id: 'apple', name: 'Time Machine', r: 5, y: -3 }
]

export const LabStickerStrip = () => {
  const { lang } = useLang()
  const copy = getLabCopy(lang)
  return (
    <div className='lab-strip-wrap'>
      <span className='lab-strip-label mono'>{copy.stackLabel}</span>
      <ul className='lab-art-strip' aria-label={copy.stackLabel}>
        {STRIP.map(s => (
          <li
            key={s.id}
            className='lab-sticker'
            data-name={s.name}
            title={s.name}
            style={{ '--r': `${s.r}deg`, '--y': `${s.y}px`, '--s': 1 }}>
            {STICKER_ICONS[s.id]}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LabFigure
