import React, { useId } from 'react'
import { useLang } from './LangContext'
import { MARKS } from './stickerMarks'

/*
 * Die-cut vinyl sticker system (48x48 viewBox):
 *   1. cream backing with the ink outline inherited from CSS (the "die-cut" edge)
 *   2. a pastel tint plate inset by ~3.6 units
 *   3. the brand mark in a single spot colour (or the brand's own palette)
 *   4. a soft gloss stroke on top for the vinyl sheen
 */
const INK = '#20211e'
const CREAM = '#fffef8'
const NO_STROKE = { stroke: 'none' }

// Place a 24x24 brand path centred at (cx, cy) with the given rendered size
const Mark = ({ d, size = 24, cx = 24, cy = 24, fill = INK }) => (
  <path
    d={d}
    fill={fill}
    style={NO_STROKE}
    transform={`translate(${cx - size / 2} ${cy - size / 2}) scale(${size / 24})`}
  />
)

const Gloss = ({ d = 'M10.9 19.4A13.8 13.8 0 0 1 18.3 11.2', opacity = 0.55 }) => (
  <path
    d={d}
    fill='none'
    stroke='#fff'
    strokeWidth='2.2'
    strokeLinecap='round'
    opacity={opacity}
  />
)

const Disc = ({ tint, children, gloss = true }) => (
  <svg viewBox='0 0 48 48' aria-hidden='true'>
    <circle cx='24' cy='24' r='21' fill={CREAM} />
    <circle cx='24' cy='24' r='17.4' fill={tint} style={NO_STROKE} />
    {children}
    {gloss && <Gloss />}
  </svg>
)

const Tile = ({ tint, children, gloss = true }) => (
  <svg viewBox='0 0 48 48' aria-hidden='true'>
    <rect x='4' y='4' width='40' height='40' rx='11' fill={CREAM} />
    <rect x='7.6' y='7.6' width='32.8' height='32.8' rx='8' fill={tint} style={NO_STROKE} />
    {children}
    {gloss && <Gloss d='M11.6 18.4V15.6a4 4 0 0 1 4-4h2.8' />}
  </svg>
)

const HEX_OUTER = '24,3 42.2,13.5 42.2,34.5 24,45 5.8,34.5 5.8,13.5'
const HEX_INNER = '24,7.2 38.6,15.6 38.6,32.4 24,40.8 9.4,32.4 9.4,15.6'

const ICONS = {
  docker: (
    <Disc tint='#cfe6ff'>
      <Mark d={MARKS.docker} size={27} cy={24.4} fill='#2465d8' />
    </Disc>
  ),
  k8s: (
    <Disc tint='#dde6ff'>
      <Mark d={MARKS.k8s} size={27} fill='#3567d6' />
    </Disc>
  ),
  cloudflare: (
    <Disc tint='#fff0da'>
      <Mark d={MARKS.cloudflareBig} size={29} cy={23.6} fill='#f38020' />
      <Mark d={MARKS.cloudflareSmall} size={29} cy={23.6} fill='#fbad41' />
    </Disc>
  ),
  tailscale: (
    <Disc tint='#e8defc'>
      <Mark d={MARKS.tailscale} size={22} />
    </Disc>
  ),
  adguard: (
    <svg viewBox='0 0 48 48' aria-hidden='true'>
      <path
        d={MARKS.adguardShield}
        fill={CREAM}
        strokeWidth='1.6'
        transform='translate(3 2.6) scale(1.75)'
      />
      <path
        d={MARKS.adguardShield}
        fill='#68bc71'
        style={NO_STROKE}
        transform='translate(7.8 7.4) scale(1.35)'
      />
      <path
        d={MARKS.adguardCheck}
        fill={CREAM}
        style={NO_STROKE}
        transform='translate(7.8 7.4) scale(1.35)'
      />
      <Gloss d='M11.6 17.2v-5.4c2.4-1.1 5-1.8 7.6-2.1' />
    </svg>
  ),
  syncthing: (
    <Disc tint='#d3ecff'>
      <Mark d={MARKS.syncthing} size={29} fill='#1b8fd2' />
    </Disc>
  ),
  cli: (
    <svg viewBox='0 0 48 48' aria-hidden='true'>
      <rect x='3.5' y='7' width='41' height='34' rx='7' fill={CREAM} />
      <rect x='7' y='10.5' width='34' height='27' rx='4.5' fill={INK} style={NO_STROKE} />
      <g style={NO_STROKE}>
        <circle cx='12' cy='15' r='1.6' fill='#ff8f7a' />
        <circle cx='16.6' cy='15' r='1.6' fill='#ffd08a' />
        <circle cx='21.2' cy='15' r='1.6' fill='#8fe388' />
      </g>
      <path d='M7 18.6h34' stroke='#3a3b36' strokeWidth='1' />
      <path
        d='M12.6 23.2l4.4 3.4-4.4 3.4'
        fill='none'
        stroke='#d2fc4b'
        strokeWidth='2.4'
      />
      <rect x='20.4' y='28.6' width='8.6' height='2.6' rx='.6' fill={CREAM} style={NO_STROKE} />
      <Gloss d='M10.4 13.6a3 3 0 0 1 2.4-1.2' opacity={0.35} />
    </svg>
  ),
  relay: (
    <Tile tint='#fff1b8' gloss={false}>
      <g transform='rotate(-7 21 21)'>
        <rect x='10' y='11' width='22' height='19.5' rx='1.4' fill={CREAM} strokeWidth='1.8' />
        <rect x='12.4' y='13.4' width='17.2' height='11.6' fill='#9fd3ff' strokeWidth='1.3' />
        <path d='M12.4 25l5-5.6 3.4 3.6 2.4-2.4 6.4 4.4Z' fill='#8fe388' strokeWidth='1.3' />
        <circle cx='17' cy='17.4' r='1.8' fill='#ffd08a' strokeWidth='1.2' />
      </g>
      <circle cx='33' cy='32.4' r='7.6' fill='#d2fc4b' strokeWidth='2' />
      <circle cx='33' cy='32.4' r='1.9' fill={INK} style={NO_STROKE} />
      <circle
        cx='33'
        cy='32.4'
        r='4.6'
        fill='none'
        strokeWidth='1.3'
        strokeDasharray='.9 1.5'
      />
    </Tile>
  ),
  github: (
    <Disc tint='#d2fc4b'>
      <Mark d={MARKS.github} size={29.5} fill={INK} />
    </Disc>
  ),
  ubuntu: (
    <Disc tint='#ffe2d3'>
      <Mark d={MARKS.ubuntu} size={27} fill='#e2581f' />
    </Disc>
  ),
  telegram: (
    <Disc tint='#cdeaff'>
      <Mark d={MARKS.telegram} size={29.5} fill='#2a9fdc' />
    </Disc>
  ),
  googlephotos: (
    <Tile tint='#f7f3e8'>
      <Mark d={MARKS.photosRed} size={25} fill='#ea4f3d' />
      <Mark d={MARKS.photosBlue} size={25} fill='#4a86e8' />
      <Mark d={MARKS.photosGreen} size={25} fill='#34a853' />
      <Mark d={MARKS.photosYellow} size={25} fill='#f9bb2d' />
    </Tile>
  ),
  apple: (
    <Tile tint='#e8defc'>
      <Mark d={MARKS.apple} size={21} cx={22} cy={22.6} />
      {/* Time Machine badge */}
      <circle cx='34.6' cy='34.6' r='7.4' fill='#d2fc4b' strokeWidth='2' />
      <path
        d='M30.5 33.4a4.3 4.3 0 1 1 .9 3.6M30.3 30.9l.2 2.6 2.5-.6M34.6 32.2v2.6l1.8 1.1'
        fill='none'
        strokeWidth='1.3'
      />
    </Tile>
  ),
  python: (
    <Disc tint='#eaf1fa'>
      <Mark d={MARKS.pythonBlue} size={25} fill='#3b77a8' />
      <Mark d={MARKS.pythonYellow} size={25} fill='#f5c431' />
    </Disc>
  ),
  nas: (
    <svg viewBox='0 0 48 48' aria-hidden='true'>
      <rect x='7' y='4' width='34' height='40' rx='6.5' fill={CREAM} />
      <rect x='10.4' y='7.4' width='27.2' height='33.2' rx='3.6' fill='#2b2c28' style={NO_STROKE} />
      {/* Status / LAN / Disk LEDs */}
      <g style={NO_STROKE}>
        <circle cx='13.6' cy='11.8' r='1' fill='#8fe388' />
        <circle cx='13.6' cy='15.2' r='1' fill='#8fe388' />
        <circle cx='13.6' cy='18.6' r='1' fill='#8fe388' />
        <circle cx='13.6' cy='22' r='1' fill='#ffd08a' />
        <rect x='12.7' y='27' width='1.8' height='3.6' rx='.4' fill='#5b5c55' />
      </g>
      <circle cx='13.6' cy='35.4' r='1.7' fill='none' stroke='#8bd0ff' strokeWidth='1' />
      {/* Two hot-swap drive trays */}
      <g style={NO_STROKE}>
        <rect x='17.2' y='9.6' width='9' height='28.8' rx='1.4' fill='#3d3e39' />
        <rect x='27.6' y='9.6' width='9' height='28.8' rx='1.4' fill='#3d3e39' />
        <rect x='17.2' y='35' width='9' height='3.4' rx='1' fill='#1a1b18' />
        <rect x='27.6' y='35' width='9' height='3.4' rx='1' fill='#1a1b18' />
      </g>
      <path
        d='M19 13h5.4M19 15.6h5.4M19 18.2h5.4M19 20.8h5.4M19 23.4h5.4M19 26h5.4M19 28.6h5.4M19 31.2h5.4M29.4 13h5.4M29.4 15.6h5.4M29.4 18.2h5.4M29.4 20.8h5.4M29.4 23.4h5.4M29.4 26h5.4M29.4 28.6h5.4M29.4 31.2h5.4'
        stroke='#55564f'
        strokeWidth='1'
      />
      {/* Mini lobster sticker */}
      <circle cx='36.4' cy='8.2' r='3.2' fill='#e8553f' stroke={CREAM} strokeWidth='1.3' />
    </svg>
  ),
  workers: (
    <svg viewBox='0 0 48 48' aria-hidden='true'>
      <polygon points={HEX_OUTER} fill={CREAM} />
      <polygon points={HEX_INNER} fill='#ffe4c4' style={NO_STROKE} />
      <Mark d={MARKS.workers} size={21} fill='#f38020' />
      <Gloss d='M11.6 18.6v-2l7.2-4.2' />
    </svg>
  ),
  jellyfin: (
    <Disc tint='#efe8ff'>
      <Mark d={MARKS.jellyfinOuter} size={26} cy={24.4} fill='#8f56c9' />
      <Mark d={MARKS.jellyfinInner} size={26} cy={24.4} fill='#1fa1db' />
    </Disc>
  )
}

const DOODLES = {
  arrow: (
    <svg viewBox='0 0 48 32' aria-hidden='true'>
      <path d='M3 24c10-18 26-20 38-8M33 10l9 6-11 4' />
    </svg>
  ),
  star: (
    <svg viewBox='0 0 32 32' aria-hidden='true'>
      <path d='M16 3v26M3 16h26M7 7l18 18M25 7 7 25' />
    </svg>
  )
}

// Rubber stamp: circular ring text + bold centre value, slightly roughened edges
const STAMP_RING = 2 * Math.PI * 37.5
const Stamp = ({ it, className, style }) => {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const ringId = `stamp-ring-${uid}`
  const roughId = `stamp-rough-${uid}`
  const unit = `${it.text} · ${it.sub} · `
  const ring = unit.length < 22 ? unit + unit : unit
  const ringSize = Math.min(10.5, STAMP_RING / (ring.length * 0.66))
  const big = String(it.big || '')
  const bigSize = big.length <= 2 ? 30 : big.length <= 3 ? 24 : 19
  return (
    <li className={className} style={style}>
      <svg viewBox='0 0 100 100' aria-hidden='true'>
        <defs>
          <path id={ringId} d='M50 50m-37.5 0a37.5 37.5 0 1 1 75 0a37.5 37.5 0 1 1-75 0' />
          <filter id={roughId} x='-6%' y='-6%' width='112%' height='112%'>
            <feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' seed='7' />
            <feDisplacementMap in='SourceGraphic' scale='1.4' />
          </filter>
        </defs>
        <g filter={`url(#${roughId})`}>
          <circle cx='50' cy='50' r='47' fill='none' stroke='currentColor' strokeWidth='3.4' />
          <circle cx='50' cy='50' r='28.5' fill='none' stroke='currentColor' strokeWidth='1.6' />
          <text fontSize={ringSize} fill='currentColor' letterSpacing='.6'>
            <textPath href={`#${ringId}`} textLength={STAMP_RING - 4} lengthAdjust='spacing'>
              {ring}
            </textPath>
          </text>
          <text x='50' y='36' fontSize='6.5' fill='currentColor' textAnchor='middle' letterSpacing='2'>
            ★★★
          </text>
          <text
            x='50'
            y={50 + bigSize * 0.36}
            fontSize={bigSize}
            fill='currentColor'
            textAnchor='middle'
            className='lab-stamp-big'
          >
            {big}
          </text>
          <path d='M38 66h24' stroke='currentColor' strokeWidth='1.6' />
        </g>
      </svg>
    </li>
  )
}

const Piece = ({ it }) => {
  const style = { '--r': `${it.r || 0}deg`, '--s': it.s || 1, '--y': `${it.y || 0}px` }
  const minor = it.minor ? ' is-minor' : ''
  if (it.t === 'note') {
    return (
      <li className={`lab-note${minor}`} style={{ ...style, backgroundColor: it.color || '#fff3a8' }}>
        {it.text}
      </li>
    )
  }
  if (it.t === 'tape') {
    return (
      <li className={`lab-tape lab-tape-${it.theme || 'blue'}${minor}`} style={style}>
        {it.text}
      </li>
    )
  }
  if (it.t === 'doodle') {
    return <li className={`lab-doodle${minor}`} style={style}>{DOODLES[it.id]}</li>
  }
  if (it.t === 'stamp') {
    return (
      <Stamp
        it={it}
        className={`lab-stamp lab-stamp-${it.kind || 'red'}${minor}`}
        style={style}
      />
    )
  }
  return (
    <li className={`lab-sticker${minor}`} data-name={it.name} style={style}>
      {ICONS[it.id]}
    </li>
  )
}

export const StackStickers = ({ variant = 'art' }) => {
  const { lang, t } = useLang()

  const notePort =
    lang === 'ja'
      ? 'ポート開放ゼロ'
      : lang === 'en'
      ? 'Zero open ports'
      : '不开路由器端口'

  const noteRun =
    lang === 'ja'
      ? '静かに動く。'
      : lang === 'en'
      ? 'it just runs.'
      : '让服务自己跑。'

  const noteDual =
    lang === 'ja'
      ? 'デュアル LAN・帯域分離'
      : lang === 'en'
      ? 'Dual LAN: dedicated line'
      : '双网口直连 · 互不抢带宽'

  const noteWatch =
    lang === 'ja'
      ? '10分ごとのエッジ死活監視'
      : lang === 'en'
      ? '10-min Edge watchdog'
      : '10m 级边缘看门狗'

  const noteHash =
    lang === 'ja'
      ? 'ハッシュ整合性検証'
      : lang === 'en'
      ? 'SHA-256 verified'
      : 'SHA-256 逐片验签'

  const noteHours = '08:00 · 16:30 · 21:30'

  const title = t('labStackTitle') || 'STACK · 容器、网络与云原生底座'

  // 贴纸墙：精心编排的 7 簇错落贴纸。既保持有机手工手账的拼贴层次感，又确保桌面与手机双端饱满匀称，告别单侧空白与过度拉伸
  const WALL = [
    // 01 / 云原生入口与零信任接入
    { align: 'spread', ind: '1%', items: [
      { t: 'icon', id: 'docker', name: 'Docker Engine', r: -6, s: 1.35, y: 0 },
      { t: 'icon', id: 'cloudflare', name: 'Cloudflare Zero Trust', r: 5, s: 1.2, y: 5 },
      { t: 'note', text: notePort, r: -3, color: '#fff3a8', y: -2 },
      { t: 'icon', id: 'tailscale', name: 'Tailscale Mesh', r: 7, s: 0.95, y: -2 },
      { t: 'doodle', id: 'star', r: 12, minor: 1 }
    ] },

    // 02 / 端口印章、调度与内网防护
    { align: 'spread', ind: '0%', items: [
      { t: 'stamp', kind: 'red', text: 'NO OPEN', big: '0', sub: 'PORTS', r: -11, y: 1 },
      { t: 'icon', id: 'k8s', name: 'Kubernetes', r: -7, s: 1.15, y: 3 },
      { t: 'icon', id: 'adguard', name: 'AdGuard Home', r: 5, s: 1.05, y: -5 },
      { t: 'tape', text: '$ ssh home', r: -3, theme: 'blue', y: 0 },
      { t: 'icon', id: 'syncthing', name: 'Syncthing Photo Sync', r: 6, s: 0.95, y: 4 }
    ] },

    // 03 / 私有存储中心与物理隔离专用线
    { align: 'spread', ind: '2%', items: [
      { t: 'icon', id: 'nas', name: 'Synology DS720+', r: 6, s: 1.3, y: 2 },
      { t: 'note', text: noteDual, r: -2, color: '#ffe4ed', y: -3 },
      { t: 'icon', id: 'cli', name: 'Linux CLI VM', r: -5, s: 1.1, y: 5 },
      { t: 'stamp', kind: 'green', text: '100% HEALTHY', big: 'OK', sub: 'DAILY AUDIT', r: 10, y: -3, minor: 1 }
    ] },

    // 04 / 动态中继、脚本看护与告警推送
    { align: 'spread', ind: '0%', items: [
      { t: 'doodle', id: 'arrow', r: -8, minor: 1 },
      { t: 'icon', id: 'relay', name: '64G Motion Photo Relay', r: -4, s: 1.25, y: 3 },
      { t: 'icon', id: 'python', name: 'Python Automations', r: 5, s: 1.05, y: -5 },
      { t: 'note', text: noteWatch, r: -2, color: '#d2fc4b', y: 2 },
      { t: 'icon', id: 'telegram', name: 'Telegram Bot Alert', r: 8, s: 1.05, y: -2 }
    ] },

    // 05 / 滚动缓冲与全家桶备份矩阵
    { align: 'spread', ind: '1%', items: [
      { t: 'tape', text: '64 GiB ROLLING BUFFER', r: -4, theme: 'yellow', y: 3, minor: 1 },
      { t: 'icon', id: 'googlephotos', name: 'Google Photos Backup', r: -7, s: 1.05, y: 1 },
      { t: 'icon', id: 'apple', name: 'Apple Time Machine', r: 5, s: 1.15, y: -4 },
      { t: 'icon', id: 'github', name: 'GitHub Actions / CLI', r: -5, s: 1.05, y: -2 },
      { t: 'stamp', kind: 'blue', text: 'ZERO TRUST', big: 'EDGE', sub: 'TUNNEL NRT', r: -9, y: 3 }
    ] },

    // 06 / 边缘 Serverless、签名校验与媒体底座
    { align: 'spread', ind: '0%', items: [
      { t: 'note', text: noteHash, r: 3, color: '#dcfce7', y: 3 },
      { t: 'icon', id: 'workers', name: 'Cloudflare Workers & D1', r: 6, s: 1.18, y: -3 },
      { t: 'tape', text: '$ docker compose ps', r: -2, theme: 'purple', y: 0, minor: 1 },
      { t: 'icon', id: 'jellyfin', name: 'Jellyfin Media', r: -5, s: 1.05, y: 4 },
      { t: 'icon', id: 'ubuntu', name: 'Ubuntu 24.04 LTS', r: 7, s: 1.0, y: -2 }
    ] },

    // 07 / 自动化作息巡航与收尾印信
    { align: 'center', ind: '0%', items: [
      { t: 'note', text: noteHours, r: -3, color: '#f3e8ff', y: 3, minor: 1 },
      { t: 'note', text: noteRun, r: 3, color: '#fffef8', y: -3, s: 1.05 },
      { t: 'doodle', id: 'star', r: -15, minor: 1 }
    ] }
  ]

  return (
    <div
      className={`lab-stack-board ${variant === 'inline' ? 'lab-stack-inline' : 'lab-stack-art'}`}
      aria-hidden='true'
    >
      <span className='lab-stack-tag'>{title}</span>
      <div className='lab-stack-wall'>
        {WALL.map((row, ri) => (
          <ul key={ri} className={`lab-row is-${row.align}`} style={{ '--ind': row.ind }}>
            {row.items.map((it, i) => (
              <Piece key={i} it={it} />
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
export default StackStickers
