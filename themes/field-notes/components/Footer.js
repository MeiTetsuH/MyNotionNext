import React from 'react'
import { useLang } from './LangContext'
import { SprayWall } from './SprayWall'
import { Burst, Crown, Scribble } from './Graffiti'

export const Closing = () => {
  const { t } = useLang()

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <section className='fn-closing'>
      <Crown />
      <Burst />
      <SprayWall labels={{ hint: t('wallHint'), wipe: t('wallWipe') }} />
      <div className='wrap fn-closing-inner'>
        <span className='fn-eyebrow'>THE WALL STAYS OPEN.</span>
        <h2>
          {t('closing')}
          <Scribble />
        </h2>
        <p>{t('closingDesc')}</p>
        <button
          type='button'
          className='fn-top'
          onClick={scrollToTop}
          aria-label={t('backTop')}>
          ↑
        </button>
      </div>
    </section>
  )
}

export const Footer = () => {
  return (
    <footer className='fn-footer'>
      <div className='wrap'>
        <span className='fn-footer-mark' aria-hidden='true'>
          H.mz
        </span>
        <span>© 2026 mingzhe</span>
        <span className='mono'>MADE OF CODE &amp; EVERYDAY LIFE.</span>
        <a href='https://github.com/workHMZ' target='_blank' rel='noopener noreferrer'>
          GitHub ↗
        </a>
      </div>
    </footer>
  )
}
