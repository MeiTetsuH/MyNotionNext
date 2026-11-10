import React from 'react'
import { useLang } from './LangContext'
import { SectionHead } from './SectionHead'

const ROLL_SIZE = 36
const FRAMES_PER_STRIP = 6

const fill = (template, n) => String(template || '').replace('{n}', n)

/**
 * The photo category rendered as a contact sheet: every photo is a frame on a
 * strip of film, hovering a frame circles it in grease pencil, and the
 * unexposed rest of the roll trails off at the end of the last strip.
 */
export const ContactSheet = ({ photos = [], onOpen }) => {
  const { t } = useLang()
  const shot = photos.length
  const roll = Math.max(ROLL_SIZE, Math.ceil(shot / FRAMES_PER_STRIP) * FRAMES_PER_STRIP)
  // Only pad the last strip with blank frames, the rest is implied by the counter
  const padded = Math.ceil(shot / FRAMES_PER_STRIP) * FRAMES_PER_STRIP
  const frames = Array.from({ length: Math.max(padded, FRAMES_PER_STRIP) }, (_, i) => photos[i] || null)
  const strips = []
  for (let i = 0; i < frames.length; i += FRAMES_PER_STRIP) {
    strips.push(frames.slice(i, i + FRAMES_PER_STRIP))
  }

  return (
    <section className='contact-sheet' aria-label={t('contactEyebrow')}>
      <SectionHead
        eyebrow={t('contactEyebrow')}
        title={fill(t('contactTitle'), shot)}
        note={t('contactNote')}
      />

      <div className='contact-counter mono' aria-hidden='true'>
        <span className='film-can' />
        <span>
          FN-400 · {String(shot).padStart(2, '0')}/{roll}
        </span>
        <span className='contact-left'>{fill(t('contactLeft'), roll - shot)}</span>
      </div>

      <div className='contact-strips'>
        {strips.map((strip, sIdx) => (
          <div
            key={sIdx}
            className='film-strip'
            style={{ '--tilt': `${sIdx % 2 === 0 ? -0.5 : 0.6}deg` }}>
            <div className='film-edge mono' aria-hidden='true'>
              <span>FN-400</span>
              <span>FIELD NOTES</span>
              <span>{`▸ ${String(sIdx * FRAMES_PER_STRIP + 1).padStart(2, '0')}`}</span>
            </div>
            <ol className='film-frames' start={sIdx * FRAMES_PER_STRIP + 1}>
              {strip.map((photo, fIdx) => {
                const absIdx = sIdx * FRAMES_PER_STRIP + fIdx
                const no = String(absIdx + 1).padStart(2, '0')
                if (!photo) {
                  return (
                    <li key={`blank-${absIdx}`} className='film-frame is-blank' aria-hidden='true'>
                      <span className='film-frame-no mono'>{no}</span>
                    </li>
                  )
                }
                return (
                  <li
                    key={photo.key || absIdx}
                    className='film-frame'
                    style={{ '--delay': `${(absIdx % 12) * 70}ms` }}>
                    <button
                      type='button'
                      onClick={() => onOpen && onOpen(absIdx)}
                      aria-label={`${no} · ${photo.title}`}>
                      <img src={photo.thumbSrc} alt={photo.alt || ''} loading='lazy' />
                      <svg className='grease-circle' viewBox='0 0 120 90' aria-hidden='true'>
                        <path pathLength='1' d='M18 46C14 20 52 6 84 12c28 6 34 34 18 54-16 20-62 22-82 2C10 58 12 42 30 30' />
                      </svg>
                    </button>
                    <span className='film-frame-no mono'>
                      {no}
                      <i>{`${no}A`}</i>
                    </span>
                    <span className='film-frame-title'>{photo.title}</span>
                  </li>
                )
              })}
            </ol>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ContactSheet
