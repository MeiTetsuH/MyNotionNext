import React from 'react'
import { useLang } from './LangContext'

export const Hero = ({ onOpenHeroPhoto }) => {
  const { t } = useLang()

  return (
    <section className='hero wrap' aria-labelledby='hero-title'>
      <div className='issue mono'>
        <span>FIELD NOTES — VOL. 01</span>
        <span>CODE / CAMERA / CURIOSITY</span>
      </div>
      <div className='hero-grid'>
        <div className='hero-copy'>
          <span className='hello sticker'>{t('hello')}</span>
          <h1 id='hero-title' aria-label='H.mz'>
            H<span className='title-dot' aria-hidden='true'>.</span>mz
          </h1>
          <p className='brand-subline mono'>MINGZHE / PERSONAL LAB</p>
          <p className='role-line'>{t('roleLine')}</p>
          <h2>
            <span>{t('headline1')}</span>
            <br />
            <span className='highlight'>{t('headline2')}</span>
          </h2>
          <p
            className='intro'
            dangerouslySetInnerHTML={{ __html: t('intro') }}
          />
          <a className='button ink' href='#work'>
            <span>{t('explore')}</span>
            <span aria-hidden='true'>↘</span>
          </a>
          <div className='hero-foot mono'>
            <span className='status-dot'></span>
            <span>{t('status')}</span>
          </div>
        </div>

        <div className='collage' aria-label='Photography collage'>
          <span className='scribble-note'>{t('scribble')}</span>
          <svg className='scribble-arrow' viewBox='0 0 130 90' aria-hidden='true'>
            <path d='M5 8C89 0 115 35 61 62M63 44L58 68 83 67' />
          </svg>
          <button
            type='button'
            className='polaroid hero-photo'
            onClick={() => onOpenHeroPhoto && onOpenHeroPhoto(0)}
            aria-label='水声，留在这里'>
            <span className='tape' aria-hidden='true'></span>
            <img
              src='/themes/field-notes/assets/phone-waterfall-small.jpg'
              alt='吹割瀑布与绿色山林'
              loading='eager'
            />
            <span className='photo-label'>
              <span>{t('heroWaterfallPlace')}</span>
              <span>↗</span>
            </span>
          </button>
          <div className='round-sticker' aria-hidden='true'>
            STAY<br />CURIOUS<span>↗</span>
          </div>
          <button
            type='button'
            className='polaroid sky-photo phone-portrait'
            onClick={() => onOpenHeroPhoto && onOpenHeroPhoto(1)}
            aria-label='水边的一抹红'>
            <img
              src='/themes/field-notes/assets/phone-crane-small.jpg'
              alt='站在蓝色水面中的丹顶鹤'
              loading='lazy'
            />
            <span className='photo-label'>
              <span>{t('heroCraneTitle')}</span>
              <span>↗</span>
            </span>
          </button>
          <span className='photo-index mono'>
            FIG. 01 — LIFE OUTSIDE THE TERMINAL
          </span>
          <svg className='star-doodle' viewBox='0 0 90 90' aria-hidden='true'>
            <path d='M45 5L51 31 76 17 61 40 87 48 60 53 73 79 49 62 40 88 34 60 9 72 27 49 3 39 32 34Z' />
          </svg>
        </div>
      </div>
    </section>
  )
}
