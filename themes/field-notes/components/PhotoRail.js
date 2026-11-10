import React, { useEffect, useState } from 'react'

const pad = n => String(n).padStart(2, '0')

const shortDate = date =>
  String(date || '')
    .replace(/^20/, '')
    .split('.')
    .slice(0, 2)
    .join('.')

const Print = ({ photo, index, onClick, className = '' }) => (
  <button
    type='button'
    className={`fn-pola ${className}`}
    aria-label={photo.title}
    onClick={onClick}>
    <span className='fn-pola-img'>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo.thumbSrc} alt={photo.alt || ''} loading='lazy' />
    </span>
    <span className='fn-pola-mini'>
      <b>{pad(index + 1)}</b>
      <span>{shortDate(photo.date) || 'NOTE'}</span>
    </span>
    <span className='fn-pola-cap'>
      <strong>{photo.title}</strong>
      <span className='mono'>
        <span>{photo.place || photo.date}</span>
        <span aria-hidden='true'>↗</span>
      </span>
    </span>
  </button>
)

/**
 * Desktop: a strip of film down the left edge with prints clipped to it.
 * The roll advances with page scroll; the current print hangs open, the
 * neighbours stay small. On article pages nothing opens until hovered.
 */
export const PhotoRail = ({
  photos = [],
  quiet = false,
  attention = false,
  onOpen,
  onActiveChange,
  onEnd
}) => {
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState(null)
  const total = photos.length

  useEffect(() => {
    if (!total) return undefined
    let ticking = false
    const update = () => {
      ticking = false
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const progress = Math.min(1, Math.max(0, window.scrollY / max))
      const idx = Math.min(total - 1, Math.floor(progress * total))
      setActive(prev => (prev === idx ? prev : idx))
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [total])

  useEffect(() => {
    if (onActiveChange) onActiveChange(active)
  }, [active, onActiveChange])

  if (!total) return null

  const size = quiet ? 5 : 4
  const lead = quiet ? 2 : 1
  const start = Math.max(0, Math.min(Math.max(0, total - size), active - lead))
  const visible = photos.slice(start, start + size)
  const remaining = Math.max(0, total - (start + visible.length))
  const openIdx = quiet ? hovered : hovered ?? active

  const handleMore = () => {
    if (remaining > 0) {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (max > 24 && window.scrollY < max - 12) {
        window.scrollBy({
          top: Math.max(260, Math.round(window.innerHeight * 0.65)),
          behavior: 'smooth'
        })
        return
      }
      if (onOpen) onOpen(Math.min(total - 1, start + visible.length))
      return
    }
    if (onEnd) onEnd()
  }

  return (
    <aside
      className={`fn-rail ${quiet ? 'is-quiet' : ''} ${attention ? 'is-attention' : ''}`}
      aria-label='Photo roll'>
      <button
        type='button'
        className='fn-rail-count'
        onClick={() => onOpen && onOpen(active)}>
        {pad(active + 1)}/{pad(total)}
      </button>

      <div className='fn-rail-track'>
        {visible.map((photo, rel) => {
          const idx = start + rel
          return (
            <div
              key={photo.key || idx}
              className={`fn-clip ${idx === openIdx ? 'is-open' : ''} ${idx === active ? 'is-current' : ''}`}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}>
              <span className='fn-clip-jaw' aria-hidden='true' />
              <span className='fn-clip-date' aria-hidden='true'>
                {shortDate(photo.date) || 'NOTE'}
              </span>
              <Print photo={photo} index={idx} onClick={() => onOpen && onOpen(idx)} />
            </div>
          )
        })}
      </div>

      <button type='button' className='fn-rail-more' onClick={handleMore}>
        {remaining > 0 ? `↓ +${remaining}` : `${total} ALL ↗`}
      </button>
    </aside>
  )
}

/**
 * Below the desktop breakpoint the roll lies flat: one row of prints on a
 * wire that scrolls sideways.
 */
export const PhotoStrip = ({ photos = [], onOpen, onEnd, label }) => {
  if (!photos.length) return null
  return (
    <section className='fn-strip' aria-label={label}>
      <div className='fn-strip-head'>
        <span>{label}</span>
        <button type='button' onClick={onEnd}>
          {pad(photos.length)} FRAMES ↗
        </button>
      </div>
      <div className='fn-strip-row'>
        {photos.map((photo, idx) => (
          <div key={photo.key || idx} className='fn-clip is-flat'>
            <span className='fn-clip-jaw' aria-hidden='true' />
            <Print photo={photo} index={idx} onClick={() => onOpen && onOpen(idx)} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default PhotoRail
