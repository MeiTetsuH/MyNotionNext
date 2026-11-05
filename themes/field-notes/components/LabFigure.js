import React from 'react'
import { useLang } from './LangContext'
import { STICKER_ICONS } from './StackStickers'

/*
 * Annotated Home Lab illustration.
 * Callouts are placed in percentages of the 1197x1314 artwork so they track the
 * drawing at every width; leader lines live in an SVG overlay with the same viewBox.
 */
const ART_W = 1197
const ART_H = 1314

const COPY = {
  zh: {
    cloud: ['Cloudflare Tunnel', '路由器 0 开放端口'],
    muse: ['Muse · 云端助手', '早报 · 体检 · 晚报'],
    cable: ['1G 直连 · 不经路由器', 'Time Machine · SMB'],
    nas: ['DS720+ · 全天在线', 'AdGuard · cloudflared'],
    claw: ['OpenClaw', '已光荣退休']
  },
  en: {
    cloud: ['Cloudflare Tunnel', '0 open router ports'],
    muse: ['Muse · cloud assistant', 'AM brief · health · PM brief'],
    cable: ['1G direct link', 'Time Machine · SMB'],
    nas: ['DS720+ · always on', 'AdGuard · cloudflared'],
    claw: ['OpenClaw', 'happily retired']
  },
  ja: {
    cloud: ['Cloudflare Tunnel', 'ポート開放ゼロ'],
    muse: ['Muse · クラウド助手', '朝刊 · 点検 · 夕刊'],
    cable: ['1G 直結 · ルーター不要', 'Time Machine · SMB'],
    nas: ['DS720+ · 24時間稼働', 'AdGuard · cloudflared'],
    claw: ['OpenClaw', '引退しました']
  }
}

// Tag box position in % (right-side tags anchor on `right` so they never spill past
// the panel edge) and a leader line from inside the tag to the part it names
const CALLOUTS = [
  { id: 'cloud', right: -3, top: 9, r: -2 },
  { id: 'muse', right: -3, top: 31.5, r: 3, from: [1060, 500], to: [960, 590] },
  { id: 'cable', left: -2, top: 74.5, r: -3, from: [215, 979], to: [340, 921] },
  { id: 'nas', left: 21, top: 89.5, r: 2, from: [576, 1200], to: [640, 1170], minor: true },
  { id: 'claw', right: -3, top: 95, r: -4, from: [1080, 1250], to: [958, 1048], minor: true }
]

const calloutPosition = c => ({
  ...(c.right !== undefined ? { right: `${c.right}%` } : { left: `${c.left}%` }),
  top: `${c.top}%`,
  '--r': `${c.r}deg`
})

const STRIP = [
  { id: 'docker', name: 'Docker', r: -8, y: 2 },
  { id: 'cloudflare', name: 'Cloudflare Tunnel', r: 6, y: -4 },
  { id: 'tailscale', name: 'Tailscale', r: -4, y: 3 },
  { id: 'adguard', name: 'AdGuard Home', r: 7, y: -2 },
  { id: 'googlephotos', name: 'Google Photos', r: -6, y: 4 },
  { id: 'apple', name: 'Time Machine', r: 5, y: -3 }
]

export const LabFigure = () => {
  const { lang } = useLang()
  const copy = COPY[lang] || COPY.zh

  return (
    <>
      <div className='lab-figure'>
        <img
          className='lab-devices'
          src='/themes/field-notes/assets/home-lab-devices.png'
          alt=''
          width={ART_W}
          height={ART_H}
          loading='lazy'
          decoding='async'
        />

        <svg
          className='lab-figure-ink'
          viewBox={`0 0 ${ART_W} ${ART_H}`}
          preserveAspectRatio='none'
          aria-hidden='true'>
          {/* Hand-drawn cloud: the Cloudflare edge in Tokyo */}
          <path
            className='lab-cloud'
            d='M1012 104c-30 1-38-38-6-47 2-32 50-44 70-18 14-30 74-26 78 14 34-2 40 48 4 51z'
          />

          {/* cloudflared dials out from the NAS: the only path to the edge */}
          <path
            className='lab-tunnel'
            d='M1112 906C1150 880 1168 820 1166 700S1150 260 1118 176'
          />
          <path className='lab-tunnel-head' d='M1102 196l14-22 12 25' />

          {CALLOUTS.filter(c => c.from).map(c => (
            <g key={c.id} className={`lab-leader${c.minor ? ' is-minor' : ''}`}>
              <path d={`M${c.from[0]} ${c.from[1]}L${c.to[0]} ${c.to[1]}`} />
              <circle cx={c.to[0]} cy={c.to[1]} r='9' />
            </g>
          ))}

          {/* Heartbeat: the NAS status LEDs keep blinking */}
          <circle className='lab-led-pulse' cx='840' cy='1073' r='16' />
          <circle className='lab-led-pulse is-late' cx='662' cy='1137' r='14' />
        </svg>

        {CALLOUTS.map(c => (
          <div
            key={c.id}
            className={`lab-callout lab-callout-${c.id}${c.minor ? ' is-minor' : ''}`}
            style={calloutPosition(c)}>
            <strong>{copy[c.id][0]}</strong>
            <span>{copy[c.id][1]}</span>
          </div>
        ))}
      </div>

      <ul className='lab-art-strip' aria-hidden='true'>
        {STRIP.map(s => (
          <li
            key={s.id}
            className='lab-sticker'
            data-name={s.name}
            style={{ '--r': `${s.r}deg`, '--y': `${s.y}px`, '--s': 1 }}>
            {STICKER_ICONS[s.id]}
          </li>
        ))}
      </ul>
    </>
  )
}

export default LabFigure
