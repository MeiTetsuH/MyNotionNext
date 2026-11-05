import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLang } from './LangContext'
import { STICKER_ICONS } from './StackStickers'

/*
 * Home Lab scene: a hand-drawn SVG map of who does what at home, driven by the
 * real Tokyo-time schedule (NAS cron jobs, Muse runs, the 10-minute monitor
 * heartbeat and the hourly photo relay). The iMac screen is a live terminal,
 * links light up while their job runs, and every device opens a short note.
 */
const VIEW_W = 600
const VIEW_H = 700

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
    readNote: '读全文 ↗',
    close: '收起',
    hint: '← 点图里的任何设备，这里会翻出它的笔记。线条亮起来，就是那条链路正在干活。',
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
    readNote: 'Read the note ↗',
    close: 'Close',
    hint: '← Tap any device in the drawing and its note opens here. A line lights up while that link is working.',
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
    readNote: '記事を読む ↗',
    close: '閉じる',
    hint: '← 絵の中の機器を押すと、ここにノートが開きます。線が光っているのは、その経路が動いている時間です。',
    stackLabel: '常駐ツール'
  }
}

export const getLabCopy = lang => COPY[lang] || COPY.zh

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

/* ---------------- drawing helpers ---------------- */

const Card = ({ x, y, w, h, r = 10, fill, className = '' }) => (
  <>
    <rect className='lab-shadow' x={x + 5} y={y + 5} width={w} height={h} rx={r} />
    <rect
      className={`lab-card ${className}`}
      x={x}
      y={y}
      width={w}
      height={h}
      rx={r}
      style={fill ? { fill } : undefined}
    />
  </>
)

const Node = ({ id, label, active, selected, onSelect, transform, children }) => (
  <g
    className={`lab-node is-${id}${active ? ' is-on' : ''}${selected ? ' is-selected' : ''}`}
    transform={transform}
    role='button'
    tabIndex={0}
    aria-label={label}
    aria-pressed={selected}
    onClick={() => onSelect && onSelect(selected ? null : id)}
    onKeyDown={e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onSelect && onSelect(selected ? null : id)
      }
    }}>
    {children}
  </g>
)

const CardLabel = ({ x, y, lines }) => (
  <>
    <text className='lab-label' x={x} y={y} textAnchor='middle'>
      {lines[0]}
    </text>
    <text className='lab-sub' x={x} y={y + 18} textAnchor='middle'>
      {lines[1]}
    </text>
  </>
)

const LINKS = {
  tunnel: 'M532 212C532 186 519 168 519 138',
  trend: 'M452 212C452 178 382 168 373 138',
  drive: 'M394 212C380 176 240 170 227 138',
  tailscale: 'M81 138C110 260 300 210 380 300',
  photo: 'M382 452C360 520 150 472 98 536',
  router: 'M462 452C462 512 398 520 388 566',
  alert: 'M456 80L438 80'
}

// Which devices each link belongs to: picking a device reveals its links
const LINK_NODES = {
  tunnel: ['nas', 'cloudflare'],
  trend: ['nas', 'telegram'],
  drive: ['nas', 'drive'],
  tailscale: ['muse', 'nas'],
  photo: ['nas', 'pixel'],
  router: ['nas', 'router'],
  alert: ['cloudflare', 'telegram']
}

const LinkPath = ({ id, on }) => (
  <g className={`lab-link is-${id}${on ? ' is-on' : ' is-shown'}`}>
    <path d={LINKS[id]} />
    {on && (
      <circle className='lab-packet' r='5.5'>
        <animateMotion dur='1.8s' repeatCount='indefinite' path={LINKS[id]} />
      </circle>
    )}
  </g>
)

const Fluffy = ({ cx, cy, r = 22 }) => {
  const puffs = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]
  })
  return (
    <g className='lab-fluffy'>
      {puffs.map(([px, py], i) => (
        <circle key={i} cx={px} cy={py} r='7.5' className='lab-puff' />
      ))}
      <circle cx={cx} cy={cy} r={r + 1} className='lab-puff-core' />
      <ellipse cx={cx - 11} cy={cy + 6} rx='4.5' ry='3' className='lab-blush' />
      <ellipse cx={cx + 11} cy={cy + 6} rx='4.5' ry='3' className='lab-blush' />
      <circle cx={cx - 8} cy={cy - 2} r='3.4' className='lab-ink-fill' />
      <circle cx={cx + 8} cy={cy - 2} r='3.4' className='lab-ink-fill' />
      <path d={`M${cx - 5} ${cy + 6}q5 5 10 0`} className='lab-ink-line' />
    </g>
  )
}

const CONTAINERS = ['AdGuard', 'cloudflared', 'Syncthing', 'TrendRadar', 'RSSHub', 'Glance']

const ScreenTerminal = ({ state, secs, copy }) => {
  const job = state ? state.busy || state.next : null
  return (
    <g className='lab-term'>
      <text className='lab-term-dim' x='50' y='236'>
        ● ● ●
      </text>
      <text className='lab-term-dim' x='296' y='236' textAnchor='end'>
        muse@homelab
      </text>
      <text className='lab-term-clock' x='50' y='263'>
        TOKYO {secs === null ? '--:--:--' : formatClock(secs)}
      </text>
      <text className='lab-term-line' x='50' y='290'>
        {job
          ? `${state.busy ? copy.now : copy.next} ${job.at} ${copy.events[job.id]} · ${job.who}`
          : ''}
      </text>
      <text className={`lab-term-count${state?.busy ? ' is-busy' : ''}`} x='50' y='333'>
        {state
          ? state.busy
            ? `T+${formatClock(state.elapsed)}`
            : `T-${formatClock(state.left)}`
          : 'T-00:00:00'}
        <tspan className='lab-term-cursor'>▌</tspan>
      </text>
      <text className='lab-term-foot' x='50' y='358'>
        {state
          ? `♥ ${copy.beat} ${formatShort(state.beatLeft)}   ⇅ ${copy.photos} ${formatShort(state.photoLeft)}`
          : ''}
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
  const on = id => Boolean(state?.nodes.has(id))
  const linkOn = id => Boolean(state?.links.has(id))
  const node = id => ({
    id,
    label: copy.nodes[id].join(' · '),
    active: on(id),
    selected: activeId === id,
    onSelect
  })

  return (
    <div className='lab-stage'>
      <div className='lab-figure'>
        <svg className='lab-scene' viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role='group' aria-label='Home lab'>
          {/* Links stay hidden until their job runs or one of their devices is picked */}
          {Object.keys(LINKS)
            .filter(id => linkOn(id) || LINK_NODES[id].includes(activeId))
            .map(id => (
              <LinkPath key={id} id={id} on={linkOn(id)} />
            ))}

          {/* cloud row */}
          <Node {...node('muse')} transform='rotate(-2 81 80)'>
            <Card x={18} y={28} w={126} h={104} />
            <Fluffy cx={81} cy={62} />
            <CardLabel x={81} y={110} lines={copy.nodes.muse} />
          </Node>
          <Node {...node('drive')} transform='rotate(1.5 227 80)'>
            <Card x={164} y={28} w={126} h={104} />
            <path className='lab-folder' d='M202 46h18l6 7h26v28h-50z' />
            <path className='lab-folder-front' d='M202 58h50v23h-50z' />
            <CardLabel x={227} y={110} lines={copy.nodes.drive} />
          </Node>
          <Node {...node('telegram')} transform='rotate(-1 373 80)'>
            <Card x={310} y={28} w={126} h={104} />
            <circle className='lab-tg' cx='373' cy='62' r='22' />
            <path className='lab-plane' d='M361 62l26-11-6 25-8-7-5 6v-8z' />
            <CardLabel x={373} y={110} lines={copy.nodes.telegram} />
          </Node>
          <Node {...node('cloudflare')} transform='rotate(2 519 80)'>
            <Card x={456} y={28} w={126} h={104} />
            <path
              className='lab-cf'
              d='M494 76c-12 0-14-15-3-18 0-13 18-18 26-8 6-12 28-10 30 6 13-1 15 19 1 20z'
            />
            <CardLabel x={519} y={110} lines={copy.nodes.cloudflare} />
          </Node>

          {/* iMac with the live terminal */}
          <Node {...node('imac')}>
            <path className='lab-cable' d='M322 318C352 318 342 430 372 430' />
            <rect className='lab-shadow' x='27' y='205' width='300' height='200' rx='16' />
            <rect className='lab-imac' x='22' y='200' width='300' height='200' rx='16' />
            <rect className='lab-screen' x='36' y='214' width='272' height='154' rx='6' />
            <ScreenTerminal state={state} secs={secs} copy={copy} />
            <path className='lab-imac' d='M152 400h40l8 46h-56z' />
            <rect className='lab-imac' x='112' y='444' width='120' height='12' rx='6' />
          </Node>

          {/* NAS */}
          <Node {...node('nas')}>
            <rect className='lab-shadow' x='377' y='237' width='180' height='220' rx='10' />
            <path className='lab-nas-side' d='M552 232l20-18v220l-20 18z' />
            <path className='lab-nas-top' d='M372 232l20-18h180l-20 18z' />
            <rect className='lab-card' x='372' y='232' width='180' height='220' rx='10' />
            <rect className='lab-bay' x='386' y='246' width='26' height='60' rx='4' />
            <rect className='lab-bay' x='418' y='246' width='26' height='60' rx='4' />
            {[256, 274, 292].map((cy, i) => (
              <circle key={cy} className={`lab-led${i === 0 ? ' is-beat' : ''}`} cx='462' cy={cy} r='5.5' />
            ))}
            <text className='lab-label' x='540' y='264' textAnchor='end'>
              {copy.nodes.nas[0]}
            </text>
            <text className='lab-sub' x='540' y='284' textAnchor='end'>
              24h
            </text>
            {CONTAINERS.map((name, i) => {
              const cx = i % 2 === 0 ? 384 : 466
              const cy = 322 + Math.floor(i / 2) * 40
              return (
                <g key={name}>
                  <rect className={`lab-chip${i % 3 === 1 ? ' is-alt' : ''}`} x={cx} y={cy} width='78' height='30' rx='4' />
                  <text className='lab-chip-text' x={cx + 39} y={cy + 20} textAnchor='middle'>
                    {name}
                  </text>
                </g>
              )
            })}
          </Node>

          {/* bottom row */}
          <Node {...node('pixel')}>
            <rect className='lab-shadow' x='35' y='541' width='64' height='118' rx='12' />
            <rect className='lab-phone' x='30' y='536' width='64' height='118' rx='12' />
            <rect className='lab-phone-screen' x='37' y='550' width='50' height='92' rx='4' />
            <rect className='lab-phone-cam' x='46' y='541' width='32' height='5' rx='2.5' />
            <path className='lab-photo-icon' d='M44 626l12-14 9 9 6-6 10 11z' />
            <circle className='lab-sun' cx='73' cy='592' r='5' />
            <text className='lab-label' x='62' y='674' textAnchor='middle'>
              {copy.nodes.pixel[0]}
            </text>
            <text className='lab-sub' x='62' y='692' textAnchor='middle'>
              {copy.nodes.pixel[1]}
            </text>
          </Node>

          <Node {...node('linux')} transform='rotate(-1.5 210 590)'>
            <Card x={140} y={552} w={140} h={74} r={8} fill='#efe8ff' />
            <path className='lab-vent' d='M152 568h20M152 576h20M152 584h20' />
            <circle className='lab-led is-dim' cx='266' cy='566' r='4' />
            <text className='lab-label' x='218' y='594' textAnchor='middle'>
              {copy.nodes.linux[0]}
            </text>
            <text className='lab-sub' x='218' y='612' textAnchor='middle'>
              muse · no sudo
            </text>
            <text className='lab-sub' x='210' y='650' textAnchor='middle'>
              {copy.nodes.linux[1]}
            </text>
          </Node>

          <Node {...node('router')}>
            <path className='lab-ink-line is-thick' d='M336 572l-10-38M426 572l10-38' />
            <circle className='lab-ink-fill' cx='326' cy='532' r='4' />
            <circle className='lab-ink-fill' cx='436' cy='532' r='4' />
            <Card x={316} y={570} w={130} h={52} r={8} />
            {[336, 352, 368].map(cx => (
              <circle key={cx} className='lab-led is-small' cx={cx} cy='596' r='3.5' />
            ))}
            <text className='lab-zero' x='420' y='606' textAnchor='middle'>
              0
            </text>
            <text className='lab-label' x='381' y='650' textAnchor='middle'>
              {copy.nodes.router[0]}
            </text>
            <text className='lab-sub' x='381' y='668' textAnchor='middle'>
              {copy.nodes.router[1]}
            </text>
          </Node>

          <Node {...node('claw')} transform='rotate(-6 526 590)'>
            <Card x={470} y={528} w={112} h={120} r={6} fill='#fff3a8' />
            <rect className='lab-tape' x='502' y='518' width='50' height='16' transform='rotate(4 527 526)' />
            <g className='lab-lobster'>
              <path className='lab-lobster-line' d='M521 562l-9-20M531 562l9-20M519 572l-10-4M533 572l10-4' />
              <path className='lab-lobster-line' d='M518 566l-9-8M534 566l9-8' />
              <path d='M509 547c-7-1-10 6-6 11 3 4 9 3 10-1l-5-3 6-1c0-3-2-6-5-6z' />
              <path d='M543 547c7-1 10 6 6 11-3 4-9 3-10-1l5-3-6-1c0-3 2-6 5-6z' />
              <path d='M526 558c7 0 10 7 10 15s-3 14-10 14-10-6-10-14 3-15 10-15z' />
              <path d='M526 587l-8 11h16z' />
              <circle className='lab-ink-fill' cx='522' cy='566' r='1.8' />
              <circle className='lab-ink-fill' cx='530' cy='566' r='1.8' />
            </g>
            <text className='lab-label is-strike' x='526' y='622' textAnchor='middle'>
              {copy.nodes.claw[0]}
            </text>
            <text className='lab-sub' x='526' y='640' textAnchor='middle'>
              {copy.nodes.claw[1]}
            </text>
          </Node>
        </svg>
      </div>
      <DayRuler secs={secs} copy={copy} />
    </div>
  )
}

/** Note card for the selected device; sits in the copy column next to the drawing. */
export const LabNoteCard = ({ activeId = null, onClose }) => {
  const { lang } = useLang()
  const copy = getLabCopy(lang)
  const label = activeId ? copy.nodes[activeId] : null
  return (
    <div
      id='lab-note-card'
      className={`lab-note-card${label ? ' is-open' : ''}`}
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
        <p className='lab-note-hint'>{copy.hint}</p>
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
