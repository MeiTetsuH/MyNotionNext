import React from 'react'
import { useLang } from './LangContext'

export const Closing = () => {
  const { t } = useLang()

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <section className='closing wrap'>
      <span className='closing-star' aria-hidden='true'>
        ✳
      </span>
      <div>
        <span className='eyebrow mono'>THE NOTEBOOK STAYS OPEN.</span>
        <h2>{t('closing')}</h2>
        <p>{t('closingDesc')}</p>
      </div>
      <button
        type='button'
        className='back-top'
        onClick={scrollToTop}
        aria-label={t('backTop')}>
        ↑
      </button>
    </section>
  )
}

export const Footer = () => {
  return (
    <footer className='wrap'>
      <span>© 2026 mingzhe</span>
      <span className='mono'>MADE OF CODE & EVERYDAY LIFE.</span>
      <a
        href='https://github.com/workHMZ'
        target='_blank'
        rel='noopener noreferrer'>
        GitHub ↗
      </a>
    </footer>
  )
}
