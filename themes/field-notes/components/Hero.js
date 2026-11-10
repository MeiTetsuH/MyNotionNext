import React from 'react'
import { siteConfig } from '@/lib/config'
import { useLang } from './LangContext'
import { parseMultiLang } from '../data'
import CONFIG from '../config'
import { Arrow, Bolt, Burst, Crosses, Crown, DripDot, SprayBlob } from './Graffiti'

// Optional overrides from the Notion config table, written as "中文 || English || 日本語"
const notionText = (key, lang) => {
  const raw = siteConfig(key, null, CONFIG)
  return raw ? parseMultiLang(String(raw), lang) : null
}

export const Hero = ({ onOpenHeroPhoto }) => {
  const { t, lang } = useLang()
  const statusText = notionText('FIELD_NOTES_STATUS', lang) || t('status')
  const scribbleText = notionText('FIELD_NOTES_SCRIBBLE', lang) || t('scribble')

  return (
    <section className='fn-hero' aria-labelledby='hero-title'>
      <div className='wrap'>
        <div className='fn-issue mono'>
          <span>FIELD NOTES — VOL. 01</span>
          <span>CODE / CAMERA / CURIOSITY</span>
        </div>

        <div className='fn-hero-grid'>
          <div className='fn-hero-copy'>
            <span className='fn-slap'>{t('hello')}</span>
            <h1 id='hero-title' className='fn-wordmark' aria-label='H.mz'>
              <span aria-hidden='true'>H</span>
              <DripDot />
              <span aria-hidden='true'>mz</span>
            </h1>
            <p className='fn-role mono'>
              <span>MINGZHE / PERSONAL LAB</span>
              <span>{t('roleLine')}</span>
            </p>
            <h2 className='fn-headline'>
              <span>{t('headline1')}</span>
              <span className='fn-swipe'>{t('headline2')}</span>
            </h2>
            <p className='fn-intro' dangerouslySetInnerHTML={{ __html: t('intro') }} />
            <div className='fn-hero-cta'>
              <a className='fn-btn fn-btn--acid' href='#work'>
                <span>{t('explore')}</span>
                <span aria-hidden='true'>↘</span>
              </a>
              <span className='fn-status mono'>
                <i aria-hidden='true' />
                <span>{statusText}</span>
              </span>
            </div>
          </div>

          <div className='fn-collage' aria-label='Photography collage'>
            <SprayBlob />
            <Crosses />
            <span className='fn-collage-note'>
              {scribbleText}
              <Arrow />
            </span>

            <button
              type='button'
              className='fn-print fn-print--a'
              onClick={() => onOpenHeroPhoto && onOpenHeroPhoto(0)}
              aria-label={t('heroWaterfallTitle')}>
              <span className='fn-gaffer' aria-hidden='true' />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src='/themes/field-notes/assets/phone-waterfall-small.jpg'
                alt={t('heroWaterfallAlt')}
                loading='eager'
                fetchpriority='high'
              />
              <span className='fn-print-label'>
                <span>{t('heroWaterfallPlace')}</span>
                <span aria-hidden='true'>↗</span>
              </span>
            </button>

            <div className='fn-roundel' aria-hidden='true'>
              STAY
              <br />
              CURIOUS
              <span>↗</span>
            </div>

            <button
              type='button'
              className='fn-print fn-print--b'
              onClick={() => onOpenHeroPhoto && onOpenHeroPhoto(1)}
              aria-label={t('heroCraneTitle')}>
              <span className='fn-gaffer' aria-hidden='true' />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src='/themes/field-notes/assets/phone-crane-small.jpg'
                alt={t('heroCraneAlt')}
                loading='lazy'
              />
              <span className='fn-print-label'>
                <span>{t('heroCraneTitle')}</span>
                <span aria-hidden='true'>↗</span>
              </span>
            </button>

            <Crown />
            <Burst />
            <Bolt />
            <span className='fn-fig mono'>FIG. 01 — LIFE OUTSIDE THE TERMINAL</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
