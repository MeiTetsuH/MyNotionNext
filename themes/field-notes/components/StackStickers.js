import React from 'react'
import { useLang } from './LangContext'

const ICONS = {
  docker: (
    <svg viewBox='0 0 48 48' aria-hidden='true'>
      <rect x='8' y='17' width='7' height='7' fill='#d2fc4b' />
      <rect x='15' y='17' width='7' height='7' fill='#fffef8' />
      <rect x='22' y='17' width='7' height='7' fill='#dfd2fb' />
      <rect x='15' y='10' width='7' height='7' fill='#ffd08a' />
      <rect x='22' y='10' width='7' height='7' fill='#fffef8' />
      <rect x='22' y='3' width='7' height='7' fill='#d2fc4b' />
      <path
        d='M4 25h30c1-3 0-5 1-7 3 1 4 3 4 5 2-1 4-1 5 0-1 2-2 3-4 3-2 8-9 14-19 14C13 40 4 35 4 25Z'
        fill='#8bd0ff'
      />
      <circle cx='14' cy='31' r='1.8' fill='#20211e' stroke='none' />
    </svg>
  ),
  k8s: (
    <svg viewBox='0 0 48 48' aria-hidden='true'>
      <polygon
        points='24,4 39.6,11.5 43.5,28.4 32.7,42 15.3,42 4.5,28.4 8.4,11.5'
        fill='#b4cdff'
      />
      <circle cx='24' cy='25' r='10' fill='#fffef8' />
      <path
        d='M24 25 24 15M24 25 31.8 18.8M24 25 33.7 27.2M24 25 28.3 34M24 25 19.7 34M24 25 14.3 27.2M24 25 16.2 18.8'
        fill='none'
        strokeWidth='2.2'
      />
      <circle cx='24' cy='25' r='3.6' fill='#dfd2fb' />
    </svg>
  ),
  cloudflare: (
    <svg viewBox='0 0 48 48' aria-hidden='true'>
      <path
        d='M12 37h24c5 0 8-3 8-7 0-4-3-7-7.5-7-1-5-5-8-10-8-5 0-9 3-10 8-4 .5-7 3-7 7 0 4 1 7 2.5 7Z'
        fill='#ffd08a'
      />
      <path d='M27 18l-6 10h5l-2 7 8-11h-5z' fill='#fffef8' strokeWidth='2.2' />
    </svg>
  ),
  tailscale: (
    <svg viewBox='0 0 48 48' aria-hidden='true'>
      <circle cx='24' cy='24' r='21' fill='#dfd2fb' />
      <g fill='#20211e' stroke='none'>
        <circle cx='16' cy='16' r='3' opacity='.3' />
        <circle cx='24' cy='16' r='3' opacity='.3' />
        <circle cx='32' cy='16' r='3' opacity='.3' />
        <circle cx='16' cy='24' r='3' opacity='.3' />
        <circle cx='24' cy='24' r='3' />
        <circle cx='32' cy='24' r='3' opacity='.3' />
        <circle cx='16' cy='32' r='3' />
        <circle cx='24' cy='32' r='3' />
        <circle cx='32' cy='32' r='3' />
      </g>
    </svg>
  ),
  adguard: (
    <svg viewBox='0 0 48 48' aria-hidden='true'>
      <path
        d='M24 4 8 10v12c0 11 7 18 16 22 9-4 16-11 16-22V10Z'
        fill='#8fe388'
      />
      <path d='M16 24l6 6 11-12' fill='none' strokeWidth='3.8' />
    </svg>
  ),
  syncthing: (
    <svg viewBox='0 0 48 48' aria-hidden='true'>
      <circle cx='24' cy='24' r='21' fill='#b4cdff' />
      <path d='M14 21a12 12 0 0 1 21-4M35 8v9h-9' fill='none' />
      <path d='M34 27a12 12 0 0 1-21 4M13 40v-9h9' fill='none' />
      <circle cx='24' cy='24' r='3.4' fill='#d2fc4b' />
    </svg>
  ),
  cli: (
    <svg viewBox='0 0 48 48' aria-hidden='true'>
      <rect x='5' y='8' width='38' height='32' rx='5' fill='#20211e' />
      <g fill='#fffef8' stroke='none'>
        <circle cx='11.5' cy='14' r='1.7' />
        <circle cx='17' cy='14' r='1.7' />
        <circle cx='22.5' cy='14' r='1.7' />
      </g>
      <path d='M13 23l6 5-6 5M23 34h10' fill='none' stroke='#d2fc4b' strokeWidth='3.2' />
    </svg>
  ),
  relay: (
    <svg viewBox='0 0 48 48' aria-hidden='true'>
      <rect x='7' y='6' width='28' height='34' rx='2.5' fill='#fffef8' />
      <rect x='11' y='10' width='20' height='18' fill='#8bd0ff' strokeWidth='2' />
      <circle cx='16.5' cy='15' r='3' fill='#ffd08a' strokeWidth='2' />
      <path d='M11 28l7-9 5 5 3-3 5 7Z' fill='#d2fc4b' strokeWidth='2' />
      <circle cx='37' cy='36' r='9' fill='#dfd2fb' />
      <path d='M32 36h10M38 32l4 4-4 4' fill='none' strokeWidth='2.6' />
    </svg>
  ),
  github: (
    <svg viewBox='0 0 48 48' aria-hidden='true'>
      <circle cx='24' cy='24' r='21' fill='#fffef8' />
      <path
        d='M24 6a18 18 0 0 0-5.7 35.1c.9.2 1.2-.4 1.2-.9v-3.2c-5 1.1-6-2.4-6-2.4-.8-2.1-2-2.7-2-2.7-1.6-1.1.1-1.1.1-1.1 1.8.1 2.8 1.9 2.8 1.9 1.6 2.8 4.2 2 5.2 1.5.2-1.2.7-2 1.2-2.5-4-.5-8.2-2-8.2-9a7 7 0 0 1 1.9-4.8c-.2-.5-.8-2.3.2-4.8 0 0 1.5-.5 5 1.9a17.3 17.3 0 0 1 9.2 0c3.5-2.4 5-1.9 5-1.9 1 2.5.4 4.3.2 4.8a7 7 0 0 1 1.9 4.8c0 7-4.2 8.5-8.2 9 .7.6 1.3 1.8 1.3 3.6V39c0 .5.3 1.1 1.2.9A18 18 0 0 0 24 6Z'
        fill='#20211e'
      />
    </svg>
  ),
  ubuntu: (
    <svg viewBox='0 0 48 48' aria-hidden='true'>
      <circle cx='24' cy='24' r='21' fill='#ffe3d1' />
      <circle cx='24' cy='24' r='14' fill='none' stroke='#e95420' strokeWidth='4.5' />
      <circle cx='24' cy='8' r='3.2' fill='#e95420' />
      <circle cx='10' cy='32' r='3.2' fill='#e95420' />
      <circle cx='38' cy='32' r='3.2' fill='#e95420' />
      <circle cx='24' cy='8' r='1.4' fill='#fffef8' />
      <circle cx='10' cy='32' r='1.4' fill='#fffef8' />
      <circle cx='38' cy='32' r='1.4' fill='#fffef8' />
    </svg>
  ),
  telegram: (
    <svg viewBox='0 0 48 48' aria-hidden='true'>
      <circle cx='24' cy='24' r='21' fill='#8bd0ff' />
      <path
        d='M36 12L10 22.5l8.5 3.5 13-9.5-10 11.5v6.5l4.5-4.5 7.5 5.5L36 12Z'
        fill='#fffef8'
      />
      <path d='M21.5 28v7l3.8-4-3.8-3Z' fill='#bce3ff' />
    </svg>
  ),
  googlephotos: (
    <svg viewBox='0 0 48 48' aria-hidden='true'>
      <rect x='4' y='4' width='40' height='40' rx='10' fill='#fffef8' />
      <path d='M15 14a8 8 0 0 1 8 8v2h-8a8 8 0 0 1 0-16Z' fill='#ffd08a' />
      <path d='M33 15a8 8 0 0 1-8 8h-2v-8a8 8 0 0 1 16 0Z' fill='#ff8f9c' />
      <path d='M33 34a8 8 0 0 1-8-8v-2h8a8 8 0 0 1 0 16Z' fill='#7cc6fe' />
      <path d='M15 33a8 8 0 0 1 8-8h2v8a8 8 0 0 1-16 0Z' fill='#8fe388' />
    </svg>
  ),
  apple: (
    <svg viewBox='0 0 48 48' aria-hidden='true'>
      <rect x='4' y='4' width='40' height='40' rx='10' fill='#dfd2fb' />
      <path
        d='M29.5 24.2c0-3.6 2.9-5.3 3-5.4-1.7-2.4-4.3-2.8-5.2-2.8-2.2-.2-4.4 1.3-5.5 1.3-1.1 0-2.8-1.3-4.6-1.3-2.4 0-4.6 1.4-5.8 3.5-2.5 4.4-.6 10.8 1.8 14.3 1.2 1.7 2.6 3.6 4.4 3.5 1.8-.1 2.5-1.2 4.6-1.2 2.1 0 2.8 1.2 4.6 1.1 1.9 0 3.1-1.7 4.3-3.4 1.4-2 1.9-3.9 2-4-0.1-.1-3.6-1.4-3.6-5.6Z'
        fill='#20211e'
      />
      <path
        d='M26.2 13.5c1-.1.2 2.3-.5 3.3-1 1.2-2.7 2.1-3.8 2-.3-1.2.3-2.4 1-3.3 1-1.1 2.4-1.9 3.3-2Z'
        fill='#d2fc4b'
      />
    </svg>
  ),
  python: (
    <svg viewBox='0 0 48 48' aria-hidden='true'>
      <circle cx='24' cy='24' r='21' fill='#fffef8' />
      <path
        d='M23.5 8c-6 0-5.7 2.6-5.7 2.6v2.7h5.9v.9h-8.3c-3.7 0-6.4 2.2-6.4 6.4 0 4.1 2.3 6.3 5.3 6.3h1.8v-2.5c0-3 2.6-5.6 5.6-5.6h5.7c2.5 0 4.5-2.1 4.5-4.6V12.7C31.9 9.8 28.5 8 23.5 8Zm-3.1 2.8a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z'
        fill='#4b8bbe'
      />
      <path
        d='M24.5 40c6 0 5.7-2.6 5.7-2.6v-2.7h-5.9v-.9h8.3c3.7 0 6.4-2.2 6.4-6.4 0-4.1-2.3-6.3-5.3-6.3h-1.8v2.5c0 3-2.6 5.6-5.6 5.6h-5.7c-2.5 0-4.5 2.1-4.5 4.6v1.9c0 2.9 3.4 4.7 8.4 4.7Zm3.1-2.8a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Z'
        fill='#ffd43b'
      />
    </svg>
  ),
  nas: (
    <svg viewBox='0 0 48 48' aria-hidden='true'>
      <rect x='6' y='10' width='36' height='28' rx='4' fill='#fffef8' />
      <rect x='10' y='14' width='10' height='20' rx='2' fill='#f5f2e9' />
      <rect x='23' y='14' width='10' height='20' rx='2' fill='#f5f2e9' />
      <circle cx='15' cy='30' r='1.5' fill='#28c76f' />
      <circle cx='28' cy='30' r='1.5' fill='#28c76f' />
      <circle cx='37' cy='18' r='1.5' fill='#28c76f' />
      <circle cx='37' cy='24' r='1.5' fill='#28c76f' />
      <circle cx='37' cy='30' r='1.5' fill='#8bd0ff' />
      {/* Mini lobster stamp */}
      <circle cx='28' cy='20' r='2' fill='#d9402f' stroke='none' />
    </svg>
  ),
  workers: (
    <svg viewBox='0 0 48 48' aria-hidden='true'>
      <polygon points='24,6 40,15.2 40,32.8 24,42 8,32.8 8,15.2' fill='#ffd08a' />
      <polygon points='24,10 36,17 36,31 24,38 12,31 12,17' fill='#fffef8' />
      <path d='M26 14L19 25h7l-3 9 10-12h-7l4-8Z' fill='#d2fc4b' strokeWidth='2' />
    </svg>
  ),
  jellyfin: (
    <svg viewBox='0 0 48 48' aria-hidden='true'>
      <circle cx='24' cy='24' r='21' fill='#bce3ff' />
      <path
        d='M24 10c-5.5 8-12 16-8 23 2.5 4.5 13.5 4.5 16 0 4-7-2.5-15-8-23Z'
        fill='#6b4cb8'
      />
      <path
        d='M24 18c-3 4.5-6.5 9-4.5 13 1.5 2.5 7.5 2.5 9 0 2-4-1.5-8.5-4.5-13Z'
        fill='#dfd2fb'
      />
    </svg>
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
      <li className={`lab-stamp lab-stamp-${it.kind || 'red'}${minor}`} style={style}>
        <span>{it.text}</span>
        <b>{it.big}</b>
        <small>{it.sub}</small>
      </li>
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
