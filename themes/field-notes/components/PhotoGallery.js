import React, { useState } from 'react'
import { useLang } from './LangContext'
import { photos, photoOrder } from './constants'

export const PhotoGallery = ({ posts = [], onOpenPhoto, onOpenNotionPhoto }) => {
  const { t } = useLang()
  const [filter, setFilter] = useState('all')

  // Extract Notion posts tagged or categorized under '摄影' / 'Photo' / '写真'
  const notionPhotos = (posts || [])
    .filter(p => {
      const isPhotoCat =
        p.category === '摄影' ||
        p.category === 'Photo' ||
        p.category === '写真' ||
        p.category === 'Photos'
      const hasPhotoTag = p.tagItems?.some(tag =>
        ['摄影', 'Photo', '写真', '摄影集', 'Photos'].includes(tag.name)
      )
      const hasImg = !!(p.pageCover || p.pageCoverThumbnail)
      return (isPhotoCat || hasPhotoTag) && hasImg
    })
    .map(p => ({
      id: p.id,
      isNotion: true,
      title: p.title || 'Untitled Photo',
      place: p.summary || 'Notion 随拍',
      thumb: p.pageCoverThumbnail || p.pageCover,
      full: p.pageCover || p.pageCoverThumbnail,
      date: p.date?.start_date || p.publishDay || p.publishDate || '',
      category: p.tagItems?.some(tag =>
        ['自然', '风景', 'landscape'].includes(tag.name)
      )
        ? 'landscape'
        : 'everyday',
      slug: p.slug || p.id
    }))

  // Deduplicate: If a photo title exists in Notion, supersede the local one
  const notionTitles = new Set(notionPhotos.map(p => p.title.trim()))

  const remainingLocalPhotos = photos.filter((p, idx) => {
    const localTitle = t('photoTitle' + idx)?.trim()
    return !notionTitles.has(localTitle)
  })

  const allPhotosCount = remainingLocalPhotos.length + notionPhotos.length
  const landscapeCount =
    remainingLocalPhotos.filter(p => p.category === 'landscape').length +
    notionPhotos.filter(p => p.category === 'landscape').length
  const everydayCount =
    remainingLocalPhotos.filter(p => p.category === 'everyday').length +
    notionPhotos.filter(p => p.category === 'everyday').length

  const filteredNotionPhotos = notionPhotos.filter(p => {
    if (filter === 'all') return true
    return p.category === filter
  })

  const filteredLocalOrder = photoOrder.filter(idx => {
    const localTitle = t('photoTitle' + idx)?.trim()
    if (notionTitles.has(localTitle)) return false
    if (filter === 'all') return true
    return photos[idx]?.category === filter
  })

  return (
    <section className='gallery wrap' id='photos' aria-labelledby='photos-title'>
      <div className='section-heading'>
        <div>
          <span className='eyebrow mono'>04 / AWAY FROM THE KEYBOARD</span>
          <h2 id='photos-title'>{t('photosTitle')}</h2>
        </div>
        <span className='margin-note'>{t('photosNote')}</span>
      </div>

      <div className='gallery-toolbar'>
        <p className='mono'>{t('photosIntro')}</p>
        <div className='filters' role='toolbar' aria-label='Filter photos'>
          <button
            type='button'
            className={filter === 'all' ? 'active' : ''}
            aria-pressed={filter === 'all'}
            onClick={() => setFilter('all')}>
            {t('filterAll') || `全部 / ${allPhotosCount}`}
          </button>
          <button
            type='button'
            className={filter === 'landscape' ? 'active' : ''}
            aria-pressed={filter === 'landscape'}
            onClick={() => setFilter('landscape')}>
            {t('filterLandscape') || `自然 / 0${landscapeCount}`}
          </button>
          <button
            type='button'
            className={filter === 'everyday' ? 'active' : ''}
            aria-pressed={filter === 'everyday'}
            onClick={() => setFilter('everyday')}>
            {t('filterEveryday') || `光与日常 / ${everydayCount}`}
          </button>
        </div>
      </div>

      <div className='timeline'>
        <div
          className='timeline-photos'
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
            marginTop: '28px'
          }}>
          {/* Notion Dynamic Photos Stream */}
          {filteredNotionPhotos.map((photo, seq) => (
            <button
              key={photo.id}
              type='button'
              className='photo-card'
              style={{
                background: '#fffef8',
                border: 'var(--border)',
                boxShadow: '4px 5px var(--ink)',
                padding: '10px 10px 12px',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column'
              }}
              onClick={() => onOpenNotionPhoto && onOpenNotionPhoto(photo)}
              aria-label={photo.title}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '6px'
                }}>
                <span
                  className='card-number mono'
                  style={{ fontSize: '10px' }}>
                  {`NEW / 0${seq + 1}`}
                </span>
                <span
                  className='mono'
                  style={{
                    fontSize: '9px',
                    background: 'var(--green)',
                    padding: '1px 5px',
                    border: '1px solid var(--ink)',
                    fontWeight: 700
                  }}>
                  NOTION
                </span>
              </div>
              <div
                className='photo-crop'
                style={{
                  overflow: 'hidden',
                  border: '1px solid var(--ink)',
                  marginBottom: '8px'
                }}>
                <img
                  src={photo.thumb}
                  alt={photo.title}
                  loading='lazy'
                  style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                />
              </div>
              <div
                className='gallery-caption'
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}>
                <div>
                  <strong style={{ fontSize: '14px', display: 'block' }}>
                    {photo.title}
                  </strong>
                  <small style={{ fontSize: '11px', color: 'var(--muted)' }}>
                    {photo.place}
                  </small>
                </div>
                <span className='mono' style={{ fontSize: '10px' }}>
                  {photo.date} ↗
                </span>
              </div>
            </button>
          ))}

          {/* Local Curated 17 Photos */}
          {filteredLocalOrder.map((photoIdx, seq) => {
            const photo = photos[photoIdx]
            const imgSrc = `/themes/field-notes/assets/${photo.file}-small.jpg`
            const title = t('photoTitle' + photoIdx)
            const place = t(photo.place)
            const globalSeq = filteredNotionPhotos.length + seq + 1

            return (
              <button
                key={photo.file}
                type='button'
                className='photo-card'
                style={{
                  background: '#fffef8',
                  border: 'var(--border)',
                  boxShadow: '4px 5px var(--ink)',
                  padding: '10px 10px 12px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onClick={() => onOpenPhoto && onOpenPhoto(photoIdx)}
                aria-label={title}>
                <span
                  className='card-number mono'
                  style={{ fontSize: '10px', marginBottom: '6px' }}>
                  {String(globalSeq).padStart(2, '0')}
                </span>
                <div
                  className='photo-crop'
                  style={{
                    overflow: 'hidden',
                    border: '1px solid var(--ink)',
                    marginBottom: '8px'
                  }}>
                  <img
                    src={imgSrc}
                    alt={t('photoAlt' + photoIdx)}
                    loading='lazy'
                    style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                  />
                </div>
                <div
                  className='gallery-caption'
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                  }}>
                  <div>
                    <strong style={{ fontSize: '14px', display: 'block' }}>
                      {title}
                    </strong>
                    <small style={{ fontSize: '11px', color: 'var(--muted)' }}>
                      {place}
                    </small>
                  </div>
                  <span className='mono' style={{ fontSize: '10px' }}>
                    {photo.date} ↗
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className='gallery-end mono' style={{ marginTop: '40px' }}>
        <span>FUJIFILM X-S20 / 33mm</span>
        <span>{t('galleryEnd')}</span>
      </div>
    </section>
  )
}
