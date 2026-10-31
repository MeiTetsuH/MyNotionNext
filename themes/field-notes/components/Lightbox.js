import React, { useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useLang } from './LangContext'
import { heroPhotos } from './constants'

export const Lightbox = ({
  viewerState,
  onClose,
  onStep,
  photoList = [],
  projectList = []
}) => {
  const { t } = useLang()
  const dialogRef = useRef(null)
  const imgRef = useRef(null)

  const { open, mode, index, screen, projectIndex } = viewerState

  const updateViewerRatio = useCallback(() => {
    const dialog = dialogRef.current
    const img = imgRef.current
    if (dialog && img && img.naturalWidth && img.naturalHeight) {
      const ratio = img.naturalWidth / img.naturalHeight
      dialog.style.setProperty('--viewer-ratio', String(ratio))
      dialog.setAttribute(
        'data-orientation',
        ratio < 0.95 ? 'portrait' : 'landscape'
      )
      dialog.scrollTop = 0
    }
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      try {
        dialog.showModal()
      } catch (e) {
        dialog.setAttribute('open', '')
      }
      if (imgRef.current && imgRef.current.complete) {
        updateViewerRatio()
      }
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open, index, mode, screen, projectIndex, updateViewerRatio])

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

  if (!open) return null

  let imgSrc = ''
  let alt = ''
  let title = ''
  let indexText = ''
  let caption = ''
  let articleLink = null

  if (mode === 'photo') {
    const photo = photoList[index]
    if (photo) {
      imgSrc = photo.fullSrc || photo.thumbSrc || ''
      alt = photo.alt || photo.title || ''
      title = photo.title || ''
      indexText = `FIELD NOTES / ${String(index + 1).padStart(2, '0')} — ${String(photoList.length).padStart(2, '0')}`
      const desc = photo.description ? `${photo.description}\n` : ''
      caption =
        desc +
        [photo.place, photo.date, photo.camera, photo.settings]
          .filter(Boolean)
          .join(' · ')
      if (photo.isNotion && (photo.href || photo.slug)) {
        articleLink = photo.href || `/${photo.slug}`
      }
    }
  } else if (mode === 'hero') {
    const photo = heroPhotos[index]
    if (photo) {
      imgSrc = `/themes/field-notes/assets/${photo.file}.jpg`
      alt = t(photo.key + 'Alt')
      title = t(photo.key + 'Title')
      indexText = `OFFLINE MOMENTS / 0${index + 1} — 02`
      caption =
        t(photo.key + 'Desc') +
        '\n' +
        [t(photo.key + 'Place'), photo.date, photo.camera]
          .filter(Boolean)
          .join(' · ')
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
      imgSrc = proj.images
        ? proj.images[screenIdx] || proj.images[0]
        : `/themes/field-notes/assets/${proj.files ? proj.files[screenIdx] : 'r2-share'}.jpg`
      alt = (proj.alts && proj.alts[screenIdx]) || proj.name
      title = `${proj.name} / ${(proj.screens && proj.screens[screenIdx]) || 'SCREEN'}`
      indexText = `SELECTED PROJECT / ${String((projectIndex || 0) + 1).padStart(3, '0')}`
      caption = proj.caption || proj.desc || ''
      if (proj.url) {
        articleLink = proj.url
      }
    }
  }

  const showNav = mode === 'photo' || mode === 'hero'
  const isExtLink = articleLink && /^https?:\/\//i.test(String(articleLink))

  return (
    <dialog
      ref={dialogRef}
      id='viewer'
      aria-labelledby='viewer-title'
      onClose={onClose}
      onClick={e => {
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

      <div className='viewer-image-wrap'>
        <img
          ref={imgRef}
          id='viewer-image'
          src={imgSrc}
          alt={alt}
          onLoad={updateViewerRatio}
        />
      </div>

      <div className='viewer-caption-bar'>
        <div className='viewer-title-row'>
          <h2 id='viewer-title'>{title}</h2>
          {articleLink && (
            <div className='viewer-action'>
              {isExtLink ? (
                <a
                  href={articleLink}
                  className='button ink viewer-link-btn'
                  onClick={onClose}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <span>{t('viewProjectLink')}</span>
                </a>
              ) : (
                <Link
                  href={articleLink}
                  className='button ink viewer-link-btn'
                  onClick={onClose}
                >
                  <span>{t('viewNoteLink')}</span>
                </Link>
              )}
            </div>
          )}
        </div>

        <p id='viewer-caption'>{caption}</p>
      </div>

      <div className='viewer-footer'>
        {showNav ? (
          <button
            type='button'
            id='prev-photo'
            aria-label={t('prev')}
            onClick={() => onStep(-1)}
          >
            ←
          </button>
        ) : (
          <span />
        )}
        <span className='mono' id='viewer-index'>
          {indexText}
        </span>
        {showNav ? (
          <button
            type='button'
            id='next-photo'
            aria-label={t('next')}
            onClick={() => onStep(1)}
          >
            →
          </button>
        ) : (
          <span />
        )}
      </div>
    </dialog>
  )
}
