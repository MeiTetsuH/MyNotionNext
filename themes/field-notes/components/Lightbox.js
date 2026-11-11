import React, { useEffect, useRef, useCallback, useState } from 'react'
import Link from 'next/link'
import { useLang } from './LangContext'
import { heroPhotos } from './constants'
import { extractNoteLines, resolvePostHref } from '../data'

// Body lines that only repeat what the back already prints as fields
const META_LINE = /^(地点|地點|器材|参数|參數|日期|拍摄|place|location|camera|gear|settings|exposure|date|場所|機材|カメラ|設定|日付)\s*[:：]/i
const noteCache = new Map()
const ratioCache = new Map()

/**
 * Load a photo page's Notion body from the page's own server-rendered props.
 * Reads the CDN-cached HTML instead of /_next/data, which this deployment
 * does not serve; the post (with its blockMap) is embedded in __NEXT_DATA__.
 * Posts are cached per page; lines per page + language.
 */
const postCache = new Map()
const loadPost = async path => {
  if (postCache.has(path)) return postCache.get(path)
  const task = fetch(path, { headers: { Accept: 'text/html' } })
    .then(res => (res.ok ? res.text() : ''))
    .then(html => {
      const match = html.match(
        /<script id="__NEXT_DATA__" type="application\/json"[^>]*>([\s\S]*?)<\/script>/
      )
      return match ? JSON.parse(match[1])?.props?.pageProps?.post || null : null
    })
    .catch(() => null)
  postCache.set(path, task)
  const post = await task
  if (!post) postCache.delete(path)
  return post
}

const loadNoteLines = async (href, lang) => {
  if (!href || /^https?:/i.test(href)) return []
  const path = String(href).replace(/[?#].*$/, '').replace(/\/$/, '')
  const key = `${path}|${lang}`
  if (noteCache.has(key)) return noteCache.get(key)
  const post = await loadPost(path)
  const lines = post?.blockMap ? extractNoteLines(post.blockMap, post.id, lang) : []
  if (post) noteCache.set(key, lines)
  return lines
}

export const Lightbox = ({
  viewerState,
  onClose,
  onStep,
  photoList = [],
  projectList = []
}) => {
  const { t, lang } = useLang()
  const dialogRef = useRef(null)
  const imgRef = useRef(null)
  const backRef = useRef(null)

  const { open, mode, index, screen, projectIndex } = viewerState
  const prevActiveElementRef = useRef(null)
  const [flipped, setFlipped] = useState(false)
  const [noteState, setNoteState] = useState({ key: '', lines: null })
  const [measuredRatio, setMeasuredRatio] = useState({ src: '', ratio: null })

  // A print opens face up; paging keeps whichever side is showing
  useEffect(() => {
    setFlipped(false)
  }, [open, mode, screen, projectIndex])

  let imgSrc = ''
  let thumbSrc = ''
  let presetRatio = null
  let alt = ''
  let title = ''
  let indexText = ''
  let caption = ''
  let meta = ''
  let articleLink = null
  let back = null

  if (mode === 'photo') {
    const photo = photoList[index]
    if (photo) {
      imgSrc = photo.fullSrc || photo.thumbSrc || ''
      thumbSrc = photo.thumbSrc || ''
      presetRatio = photo.ratio || null
      alt = photo.alt || photo.title || ''
      title = photo.title || ''
      indexText = `${String(index + 1).padStart(2, '0')} / ${String(photoList.length).padStart(2, '0')}`
      caption = photo.description || ''
      meta = [photo.place, photo.date].filter(Boolean).join(' · ')
      back = {
        title,
        place: photo.place,
        date: photo.date,
        camera: photo.camera,
        settings: photo.settings,
        description: photo.description,
        no: indexText,
        href: photo.isNotion ? resolvePostHref(photo, photo.slug, '') || null : null
      }
    }
  } else if (mode === 'hero') {
    const photo = heroPhotos[index]
    if (photo) {
      imgSrc = `/themes/field-notes/assets/${photo.file}.jpg`
      thumbSrc = `/themes/field-notes/assets/${photo.file}-small.jpg`
      presetRatio = photo.ratio || null
      alt = t(photo.key + 'Alt')
      title = t(photo.key + 'Title')
      indexText = `0${index + 1} / 02`
      caption = t(photo.key + 'Desc')
      meta = [t(photo.key + 'Place'), photo.date].filter(Boolean).join(' · ')
      back = {
        title,
        place: t(photo.key + 'Place'),
        date: photo.date,
        camera: photo.camera,
        description: t(photo.key + 'Desc'),
        no: indexText
      }
    }
  } else {
    const proj = projectList[projectIndex || 0]
    if (proj) {
      const screenIdx =
        typeof screen === 'number'
          ? screen
          : screen === 'admin'
          ? 1
          : 0
      const fallbackFile = proj.files ? proj.files[screenIdx] : 'r2-share'
      const fallbackExt = String(fallbackFile).startsWith('transit-') ? 'png' : 'jpg'
      imgSrc = proj.images
        ? proj.images[screenIdx] || proj.images[0]
        : `/themes/field-notes/assets/${fallbackFile}.${fallbackExt}`
      alt = (proj.alts && proj.alts[screenIdx]) || proj.name
      title = `${proj.name} / ${(proj.screens && proj.screens[screenIdx]) || 'SCREEN'}`
      indexText = `PROJECT ${String((projectIndex || 0) + 1).padStart(3, '0')}`
      caption = proj.caption || proj.desc || ''
      if (proj.url) {
        articleLink = proj.url
      }
    }
  }

  // Resolve the print's aspect ratio synchronously before the full-res image finishes downloading
  const cachedRatio =
    (imgSrc && ratioCache.get(imgSrc)) ||
    (thumbSrc && ratioCache.get(thumbSrc)) ||
    (measuredRatio.src === imgSrc ? measuredRatio.ratio : null) ||
    presetRatio ||
    1.5
  const activeOrientation = cachedRatio < 0.95 ? 'portrait' : 'landscape'

  const updateViewerRatio = useCallback(() => {
    const img = imgRef.current
    if (img && img.naturalWidth && img.naturalHeight) {
      const ratio = img.naturalWidth / img.naturalHeight
      if (imgSrc) ratioCache.set(imgSrc, ratio)
      if (thumbSrc) ratioCache.set(thumbSrc, ratio)
      setMeasuredRatio(prev =>
        prev.src === imgSrc && Math.abs((prev.ratio || 0) - ratio) < 0.001
          ? prev
          : { src: imgSrc, ratio }
      )
    }
  }, [imgSrc, thumbSrc])

  // Reset scroll positions on every frame change and manage modal lifecycle
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open) {
      if (!dialog.open) {
        prevActiveElementRef.current = document.activeElement
        try {
          dialog.showModal()
        } catch (e) {
          dialog.setAttribute('open', '')
        }
      }
      dialog.scrollTop = 0
      if (backRef.current) backRef.current.scrollTop = 0
      if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth) {
        updateViewerRatio()
      }
    } else if (!open && dialog.open) {
      try {
        dialog.close()
      } catch (e) {
        dialog.removeAttribute('open')
      }
      if (
        prevActiveElementRef.current &&
        typeof prevActiveElementRef.current.focus === 'function'
      ) {
        prevActiveElementRef.current.focus()
      }
    }
  }, [open, index, mode, screen, projectIndex, updateViewerRatio])

  // Preload adjacent frames (image dimensions + back-side Notion notes) so paging never stutters
  useEffect(() => {
    if (!open || typeof window === 'undefined') return
    if (mode === 'photo' && photoList.length > 1) {
      for (const delta of [-1, 1]) {
        const adj = photoList[(index + delta + photoList.length) % photoList.length]
        if (!adj) continue
        const adjSrc = adj.fullSrc || adj.thumbSrc
        if (adjSrc && !ratioCache.has(adjSrc)) {
          if (adj.ratio) ratioCache.set(adjSrc, adj.ratio)
          const pre = new window.Image()
          pre.onload = () => {
            if (pre.naturalWidth && pre.naturalHeight) {
              ratioCache.set(adjSrc, pre.naturalWidth / pre.naturalHeight)
            }
          }
          pre.src = adjSrc
        }
        const adjHref = adj.isNotion ? resolvePostHref(adj, adj.slug, '') || null : null
        if (adjHref) {
          loadNoteLines(adjHref, lang).catch(() => {})
        }
      }
    } else if (mode === 'hero' && heroPhotos.length > 1) {
      const adj = heroPhotos[(index + 1) % heroPhotos.length]
      if (adj) {
        const adjSrc = `/themes/field-notes/assets/${adj.file}.jpg`
        if (!ratioCache.has(adjSrc)) {
          if (adj.ratio) ratioCache.set(adjSrc, adj.ratio)
          const pre = new window.Image()
          pre.src = adjSrc
        }
      }
    }
  }, [open, mode, index, photoList, lang])

  // Prevent iOS Safari rubber-band background scrolling on dialog::backdrop touches
  useEffect(() => {
    const dialog = dialogRef.current
    if (!open || !dialog) return undefined
    const onTouchMove = e => {
      if (e.target === dialog) {
        e.preventDefault()
      }
    }
    dialog.addEventListener('touchmove', onTouchMove, { passive: false })
    return () => dialog.removeEventListener('touchmove', onTouchMove)
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleKeyDown = e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        onStep(-1)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        onStep(1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onStep])

  // The back of a Notion photo is its page body: prefetch when the print opens so flipping is instant
  const noteHref = back?.href || null
  const noteKey = noteHref ? `${noteHref}|${lang}` : ''
  const noteLines = noteState.key === noteKey ? noteState.lines : null
  useEffect(() => {
    if ((!open && !flipped) || !noteHref || noteLines !== null) return undefined
    let cancelled = false
    loadNoteLines(noteHref, lang)
      .then(lines => {
        if (!cancelled) setNoteState({ key: noteKey, lines })
      })
      .catch(() => {
        if (!cancelled) setNoteState({ key: noteKey, lines: [] })
      })
    return () => {
      cancelled = true
    }
  }, [open, flipped, noteHref, lang, noteKey, noteLines])

  const normalize = v => String(v || '').replace(/\s+/g, '').toLowerCase()
  const extraLines = (noteLines || []).filter(
    l =>
      !META_LINE.test(l.text) &&
      normalize(l.text) !== normalize(back?.description) &&
      normalize(l.text) !== normalize(back?.title)
  )

  const showNav = mode === 'photo' || mode === 'hero'
  const isExtLink = articleLink && /^https?:\/\//i.test(String(articleLink))

  return (
    <dialog
      ref={dialogRef}
      id='viewer'
      className={back ? 'is-polaroid' : ''}
      data-orientation={activeOrientation}
      style={{ '--viewer-ratio': String(Number(cachedRatio.toFixed(4))) }}
      aria-labelledby='viewer-title'
      onClose={onClose}
      onClick={e => {
        if (e.detail === 0) return
        if (e.target === dialogRef.current) {
          const r = dialogRef.current.getBoundingClientRect()
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          ) {
            onClose()
          }
        }
      }}
    >
      <button
        id='close-viewer'
        type='button'
        aria-label={t('close')}
        onClick={onClose}
      >
        ×
      </button>

      <div
        className={`viewer-image-wrap ${back ? 'is-flippable' : ''} ${flipped ? 'is-flipped' : ''}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={imgSrc}
          ref={imgRef}
          id='viewer-image'
          className={mode === 'screen' || flipped ? '' : 'is-developing'}
          src={imgSrc}
          alt={alt}
          onLoad={updateViewerRatio}
        />
        {back && (
          <div ref={backRef} className='viewer-back' aria-hidden={!flipped}>
            <p className='viewer-back-title'>{back.title}</p>
            {back.description && (
              <p className='viewer-back-desc'>{back.description}</p>
            )}
            {extraLines.length > 0 && (
              <div className='viewer-back-note'>
                {extraLines.map((l, i) => (
                  <p key={i} className={`is-${l.type}`}>
                    {l.text}
                  </p>
                ))}
              </div>
            )}
            <ul className='viewer-back-lines'>
              {back.place && (
                <li>
                  <b className='mono'>{t('backPlace')}</b>
                  <span>{back.place}</span>
                </li>
              )}
              {back.date && (
                <li>
                  <b className='mono'>{t('backDate')}</b>
                  <span>{back.date}</span>
                </li>
              )}
              {back.camera && (
                <li>
                  <b className='mono'>{t('backCamera')}</b>
                  <span>{back.camera}</span>
                </li>
              )}
              {back.settings && (
                <li>
                  <b className='mono'>{t('backSettings')}</b>
                  <span className='viewer-back-settings'>
                    {String(back.settings)
                      .split(/\s*·\s*/)
                      .filter(Boolean)
                      .map((token, idx) => (
                        <React.Fragment key={idx}>
                          {idx > 0 && (
                            <span className='viewer-back-sep' aria-hidden='true'>
                              {' · '}
                            </span>
                          )}
                          <span className='viewer-back-token'>{token}</span>
                        </React.Fragment>
                      ))}
                  </span>
                </li>
              )}
            </ul>
            <div className='viewer-back-foot'>
              <span className='viewer-back-stamp'>
                FIELD NOTES
                <br />
                No. {back.no}
              </span>
              <span className='viewer-back-sign'>— H.mz</span>
            </div>
          </div>
        )}
      </div>

      {/* The white bottom margin of the print: what I would write on it */}
      <div className='viewer-caption-bar'>
        <div className='viewer-title-row'>
          <h2 id='viewer-title'>{title}</h2>
          {back ? (
            <div className='viewer-action'>
              <button
                type='button'
                className='fn-btn fn-btn--sm viewer-flip-btn'
                aria-pressed={flipped}
                onClick={() => setFlipped(f => !f)}
              >
                <span>{flipped ? t('flipFront') : t('flipBack')}</span>
                <span aria-hidden='true'>↻</span>
              </button>
            </div>
          ) : (
            articleLink && (
              <div className='viewer-action'>
                {isExtLink ? (
                  <a
                    href={articleLink}
                    className='fn-btn fn-btn--sm'
                    onClick={onClose}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <span>{t('viewProjectLink')}</span>
                  </a>
                ) : (
                  <Link
                    href={articleLink}
                    className='fn-btn fn-btn--sm'
                    onClick={onClose}
                  >
                    <span>{t('viewNoteLink')}</span>
                  </Link>
                )}
              </div>
            )
          )}
        </div>

        {caption && <p id='viewer-caption'>{caption}</p>}
        <div className='viewer-meta-row mono'>
          <span>{meta}</span>
          <span className='viewer-pager'>
            {showNav && (
              <button
                type='button'
                id='prev-photo'
                aria-label={t('prev')}
                onClick={() => onStep(-1)}
              >
                ←
              </button>
            )}
            <span id='viewer-index'>{indexText}</span>
            {showNav && (
              <button
                type='button'
                id='next-photo'
                aria-label={t('next')}
                onClick={() => onStep(1)}
              >
                →
              </button>
            )}
          </span>
        </div>
      </div>
    </dialog>
  )
}
