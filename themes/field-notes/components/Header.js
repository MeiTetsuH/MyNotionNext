import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useLang } from './LangContext'
import { parseMultiLang } from '../data'

const HIDDEN_MENU_TITLES = new Set([
  '首页',
  '往期整理',
  '关于我',
  'Home',
  'Archive',
  'About'
])

const HIDDEN_MENU_HREFS = new Set([
  '/',
  '/archive',
  '/category',
  '/tag',
  '/about',
  'https://me.mingzhe.uk/about',
  'https://me.mingzhe.uk/about/'
])

const LANG_OPTIONS = [
  { code: 'zh', short: '中', label: '中文 · ZH' },
  { code: 'en', short: 'EN', label: 'English · EN' },
  { code: 'ja', short: '日', label: '日本語 · JA' }
]

export const Header = ({ customMenu = [], onNavPhotos }) => {
  const { lang, changeLang, t } = useLang()
  const router = useRouter()
  const [openKey, setOpenKey] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef(null)

  useEffect(() => {
    const handlePointerDown = e => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenKey(null)
        setMobileOpen(false)
      }
    }
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        setOpenKey(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    setOpenKey(null)
    setMobileOpen(false)
  }, [router.asPath])

  const visibleMenus = (customMenu || []).filter(m => {
    if (!m || m.show === false) return false
    const rawTitle = String(m.title || m.name || '').trim()
    const rawHref = String(m.href || m.slug || '').trim()
    if (HIDDEN_MENU_TITLES.has(rawTitle)) return false
    if (HIDDEN_MENU_HREFS.has(rawHref)) return false
    return true
  })

  const currentLangObj =
    LANG_OPTIONS.find(item => item.code === lang) || LANG_OPTIONS[0]

  const closeAll = () => {
    setOpenKey(null)
    setMobileOpen(false)
  }

  return (
    <>
      <a className='skip' href='#main'>
        {t('skip')}
      </a>
      <header ref={headerRef} className='header wrap'>
        <Link href='/' className='logo' aria-label='H.mz home' onClick={closeAll}>
          H<span>✳</span>
        </Link>
        <span className='brand-note'>
          A PERSONAL LAB
          <br />
          &amp; A LITTLE BIT OF LIFE.
        </span>

        {/* Desktop unified brutalist index bar (menu + tools + language fused together) */}
        <nav className='nav-dock' aria-label='Main navigation'>
          <Link href='/#now' className='nav-dock-item' onClick={closeAll}>
            {t('navLab')}
          </Link>
          <Link href='/#notes' className='nav-dock-item' onClick={closeAll}>
            {t('navNotes')}
          </Link>
          <Link href='/#work' className='nav-dock-item' onClick={closeAll}>
            {t('navWork')}
          </Link>
          <button
            type='button'
            className='nav-dock-item'
            onClick={() => {
              closeAll()
              if (onNavPhotos) onNavPhotos()
            }}
          >
            {t('navPhotos')}
          </button>

          {visibleMenus.map(menu => {
            const menuKey = menu.id || menu.title || menu.name
            const menuTitle = parseMultiLang(menu.title || menu.name || '', lang)
            const subItems = Array.isArray(menu.subMenus)
              ? menu.subMenus.filter(sub => sub && sub.show !== false)
              : []

            if (subItems.length > 0) {
              const isOpen = openKey === menuKey
              return (
                <div
                  key={menuKey}
                  className={`nav-dock-dropdown ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    type='button'
                    className='nav-dock-item nav-dock-trigger'
                    aria-expanded={isOpen}
                    aria-haspopup='menu'
                    onClick={e => {
                      e.stopPropagation()
                      setOpenKey(prev => (prev === menuKey ? null : menuKey))
                    }}
                  >
                    <span>{menuTitle}</span>
                    <span className='nav-caret' aria-hidden='true'>
                      ▾
                    </span>
                  </button>
                  <div className='nav-dropdown-menu' role='menu'>
                    {subItems.map(sub => {
                      const rawHref = sub.href || sub.slug || '#'
                      const isExt = /^https?:\/\//i.test(String(rawHref))
                      const subTitle = parseMultiLang(
                        sub.title || sub.name || '',
                        lang
                      )
                      if (isExt) {
                        return (
                          <a
                            key={sub.id || sub.title}
                            href={rawHref}
                            target='_blank'
                            rel='noopener noreferrer'
                            role='menuitem'
                            className='nav-dropdown-item'
                            onClick={closeAll}
                          >
                            <span>{subTitle}</span>
                            <span className='mono'>↗</span>
                          </a>
                        )
                      }
                      return (
                        <Link
                          key={sub.id || sub.title}
                          href={rawHref}
                          role='menuitem'
                          className='nav-dropdown-item'
                          onClick={closeAll}
                        >
                          <span>{subTitle}</span>
                          <span className='mono'>→</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            }

            const rawHref = menu.href || menu.slug || '#'
            const isExt = /^https?:\/\//i.test(String(rawHref))
            if (isExt) {
              return (
                <a
                  key={menuKey}
                  href={rawHref}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='nav-dock-item'
                  onClick={closeAll}
                >
                  <span>{menuTitle}</span>
                  <span className='nav-caret' aria-hidden='true'>
                    ↗
                  </span>
                </a>
              )
            }
            return (
              <Link
                key={menuKey}
                href={rawHref}
                className='nav-dock-item'
                onClick={closeAll}
              >
                {menuTitle}
              </Link>
            )
          })}

          {/* Fused language switcher cell right inside the unified dock */}
          <div
            className={`nav-dock-dropdown nav-dock-lang ${openKey === '__lang__' ? 'is-open' : ''}`}
          >
            <button
              type='button'
              className='nav-dock-item nav-dock-trigger nav-lang-trigger'
              aria-expanded={openKey === '__lang__'}
              aria-haspopup='menu'
              aria-label={t('langLabel')}
              onClick={e => {
                e.stopPropagation()
                setOpenKey(prev => (prev === '__lang__' ? null : '__lang__'))
              }}
            >
              <span className='nav-lang-chip mono'>{currentLangObj.short}</span>
              <span className='nav-caret' aria-hidden='true'>
                ▾
              </span>
            </button>
            <div className='nav-dropdown-menu nav-dropdown-right' role='menu'>
              {LANG_OPTIONS.map(opt => {
                const active = lang === opt.code
                return (
                  <button
                    key={opt.code}
                    type='button'
                    lang={opt.code}
                    role='menuitemradio'
                    aria-checked={active}
                    className={`nav-dropdown-item ${active ? 'is-active' : ''}`}
                    onClick={() => {
                      changeLang(opt.code)
                      closeAll()
                    }}
                  >
                    <span>{opt.label}</span>
                    <span className='mono'>{active ? '●' : ''}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </nav>

        {/* Mobile compact unified trigger (menu + tools + language in one index card) */}
        <button
          type='button'
          className={`mobile-dock-btn ${mobileOpen ? 'is-open' : ''}`}
          aria-expanded={mobileOpen}
          aria-controls='mobile-fieldnotes-drawer'
          onClick={e => {
            e.stopPropagation()
            setMobileOpen(prev => !prev)
          }}
        >
          <span className='mobile-dock-bars' aria-hidden='true'>
            {mobileOpen ? '✕' : '☰'}
          </span>
          <span>{t('menuToggle')}</span>
          <span className='nav-lang-chip mono'>{currentLangObj.short}</span>
        </button>

        {mobileOpen && (
          <div
            id='mobile-fieldnotes-drawer'
            className='mobile-dock-panel'
            role='dialog'
            aria-label='Navigation & Language'
          >
            <div className='mobile-dock-grid'>
              <Link
                href='/#now'
                className='mobile-dock-card'
                onClick={closeAll}
              >
                <span className='mono'>01</span>
                <strong>{t('navLab')}</strong>
              </Link>
              <Link
                href='/#notes'
                className='mobile-dock-card'
                onClick={closeAll}
              >
                <span className='mono'>02</span>
                <strong>{t('navNotes')}</strong>
              </Link>
              <Link
                href='/#work'
                className='mobile-dock-card'
                onClick={closeAll}
              >
                <span className='mono'>03</span>
                <strong>{t('navWork')}</strong>
              </Link>
              <button
                type='button'
                className='mobile-dock-card'
                onClick={() => {
                  closeAll()
                  if (onNavPhotos) onNavPhotos()
                }}
              >
                <span className='mono'>04</span>
                <strong>{t('navPhotos')}</strong>
              </button>
            </div>

            {visibleMenus.map(menu => {
              const menuKey = menu.id || menu.title || menu.name
              const menuTitle = parseMultiLang(
                menu.title || menu.name || '',
                lang
              )
              const subItems = Array.isArray(menu.subMenus)
                ? menu.subMenus.filter(sub => sub && sub.show !== false)
                : []
              if (subItems.length === 0) return null
              return (
                <div key={menuKey} className='mobile-dock-section'>
                  <div className='mobile-dock-label mono'>{menuTitle}</div>
                  <div className='mobile-dock-links'>
                    {subItems.map(sub => {
                      const rawHref = sub.href || sub.slug || '#'
                      const isExt = /^https?:\/\//i.test(String(rawHref))
                      const subTitle = parseMultiLang(
                        sub.title || sub.name || '',
                        lang
                      )
                      if (isExt) {
                        return (
                          <a
                            key={sub.id || sub.title}
                            href={rawHref}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='mobile-dock-link'
                            onClick={closeAll}
                          >
                            <span>{subTitle}</span>
                            <span className='mono'>↗</span>
                          </a>
                        )
                      }
                      return (
                        <Link
                          key={sub.id || sub.title}
                          href={rawHref}
                          className='mobile-dock-link'
                          onClick={closeAll}
                        >
                          <span>{subTitle}</span>
                          <span className='mono'>→</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            <div className='mobile-dock-section'>
              <div className='mobile-dock-label mono'>{t('langLabel')}</div>
              <div className='mobile-lang-row' role='group' aria-label={t('langLabel')}>
                {LANG_OPTIONS.map(opt => {
                  const active = lang === opt.code
                  return (
                    <button
                      key={opt.code}
                      type='button'
                      lang={opt.code}
                      aria-pressed={active}
                      className={`mobile-lang-btn ${active ? 'is-active' : ''}`}
                      onClick={() => {
                        changeLang(opt.code)
                        closeAll()
                      }}
                    >
                      {opt.code === 'zh'
                        ? '中文'
                        : opt.code === 'en'
                        ? 'EN'
                        : '日本語'}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
