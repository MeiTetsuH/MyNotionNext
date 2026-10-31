'use client'

import React, { useState, useEffect, useMemo, useRef, createContext, useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import NotionPage from '@/components/NotionPage'
import ArticleLock from '@/components/ArticleLock'
import Comment from '@/components/Comment'
import ShareBar from '@/components/ShareBar'
import { isBrowser } from '@/lib/utils'

import CONFIG from './config'
import { Style } from './style'
import { LangProvider, useLang } from './components/LangContext'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Ticker } from './components/Ticker'
import { NowSection } from './components/NowSection'
import { ArticleSection } from './components/ArticleSection'
import { WorkSection } from './components/WorkSection'
import { Closing, Footer } from './components/Footer'
import { Lightbox } from './components/Lightbox'
import { heroPhotos } from './components/constants'

import {
  edgeCopy,
  transitCopy,
  filterDisplayTags,
  formatNotionDate,
  getCombinedPhotos,
  getLocalizedBlogPosts,
  localizeCategory,
  localizeTag,
  parseMultiLang,
  parsePhotoSummary,
  parseNotionWorkProject,
  projects as defaultProjects,
  resolveLocalizedBlockMap
} from './data'

export const FieldNotesContext = createContext()
export const useFieldNotes = () => useContext(FieldNotesContext)

/**
 * Inner base layout connecting LangContext, 4-way Notion data dispatch,
 * progressive left Polaroid rope, and global darkroom Lightbox.
 */
const LayoutBaseInner = props => {
  const {
    children,
    allNavPages,
    posts: rawPropsPosts,
    workProjectPages,
    customMenu
  } = props
  const { lang, changeLang, t } = useLang()
  const router = useRouter()

  const isArticlePage =
    router.pathname !== '/' &&
    (router.pathname.includes('[prefix]') ||
      router.pathname.includes('[slug]') ||
      router.pathname.includes('archive') ||
      router.pathname.includes('category') ||
      router.pathname.includes('tag') ||
      router.pathname.includes('search') ||
      router.asPath.startsWith('/article/'))

  const allPagesSource = useMemo(() => {
    const navList = Array.isArray(allNavPages) ? allNavPages : []
    const postList = Array.isArray(rawPropsPosts) ? rawPropsPosts : []
    const workList = Array.isArray(workProjectPages) ? workProjectPages : []
    const getPageKey = item =>
      item?.slug || item?.href || item?.id || item?.short_id || ''

    const merged = new Map()
    for (const item of navList) {
      const k = getPageKey(item)
      if (k) merged.set(k, item)
    }
    for (const item of postList) {
      const k = getPageKey(item)
      if (k) merged.set(k, { ...merged.get(k), ...item })
    }
    for (const item of workList) {
      const k = getPageKey(item)
      if (k) merged.set(k, { ...merged.get(k), ...item })
    }
    return Array.from(merged.values())
  }, [allNavPages, rawPropsPosts, workProjectPages])

  // Enforce warm light paper palette even when NotionNext _document.js sets html.dark at night / macOS Dark Mode
  useEffect(() => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    root.classList.remove('dark')
    root.classList.add('light')
  }, [router.asPath])

  // 1. Localized Notion posts
  const allLocalizedItems = useMemo(
    () => getLocalizedBlogPosts(allPagesSource, lang),
    [allPagesSource, lang]
  )

  // 2. Section A: 01 / HOME LAB
  const homeLabPosts = useMemo(
    () => allLocalizedItems.filter(p => p.section === 'homelab'),
    [allLocalizedItems]
  )

  // 3. Section B: 02 / FIELD NOTES (#notes) — includes both general notes and Home Lab articles
  const notePosts = useMemo(
    () =>
      allLocalizedItems.filter(
        p => p.section === 'notes' || p.section === 'homelab'
      ),
    [allLocalizedItems]
  )

  // 4. Left Polaroid rope photos (Notion photo posts + 17 local photos)
  const combinedPhotos = useMemo(
    () => getCombinedPhotos(allPagesSource, lang),
    [allPagesSource, lang]
  )

  // 5. Section C: 03 / WORK (#work) — Notion-first override, local R2FileBox / EdgeKintai only when Notion has 0 work items
  const combinedProjects = useMemo(() => {
    const prefetchedMap = new Map()
    if (Array.isArray(workProjectPages)) {
      for (const wp of workProjectPages) {
        if (wp?.id) prefetchedMap.set(wp.id, wp)
      }
    }

    const notionProjectItems = allLocalizedItems
      .filter(p => p.section === 'work')
      .map(p => (prefetchedMap.has(p.id) ? { ...p, blockMap: prefetchedMap.get(p.id).blockMap } : p))

    if (notionProjectItems.length > 0) {
      return notionProjectItems
        .map(p => parseNotionWorkProject(p, lang, t))
        .sort((a, b) => {
          if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder
          return (b.publishDate || 0) - (a.publishDate || 0)
        })
    }

    return [
      {
        name: defaultProjects[0].name,
        url: defaultProjects[0].url,
        tags: defaultProjects[0].tags,
        deck: t('projectDeck'),
        desc: t('projectDesc'),
        features: [t('feature1'), t('feature2'), t('feature3')],
        screens: [t('screenShare'), t('screenAdmin')],
        alts: [t('screenAltShare'), t('screenAltAdmin')],
        images: [
          `/themes/field-notes/assets/${defaultProjects[0].files[0]}.jpg`,
          `/themes/field-notes/assets/${defaultProjects[0].files[1]}.jpg`
        ],
        caption: t('screenshotCaption')
      },
      {
        name: defaultProjects[1].name,
        url: defaultProjects[1].url,
        tags: defaultProjects[1].tags,
        deck: edgeCopy?.[lang]?.deck || edgeCopy?.zh?.deck,
        desc: edgeCopy?.[lang]?.desc || edgeCopy?.zh?.desc,
        features: edgeCopy?.[lang]?.features || edgeCopy?.zh?.features,
        screens: edgeCopy?.[lang]?.screens || edgeCopy?.zh?.screens,
        alts: edgeCopy?.[lang]?.alts || edgeCopy?.zh?.alts,
        images: [
          `/themes/field-notes/assets/${defaultProjects[1].files[0]}.jpg`,
          `/themes/field-notes/assets/${defaultProjects[1].files[1]}.jpg`
        ],
        caption: edgeCopy?.[lang]?.caption || edgeCopy?.zh?.caption
      },
      {
        name: defaultProjects[2].name,
        url: defaultProjects[2].url,
        tags: defaultProjects[2].tags,
        deck: transitCopy?.[lang]?.deck || transitCopy?.zh?.deck,
        desc: transitCopy?.[lang]?.desc || transitCopy?.zh?.desc,
        features: transitCopy?.[lang]?.features || transitCopy?.zh?.features,
        screens: transitCopy?.[lang]?.screens || transitCopy?.zh?.screens,
        alts: transitCopy?.[lang]?.alts || transitCopy?.zh?.alts,
        images: [
          `/themes/field-notes/assets/${defaultProjects[2].files[0]}.png`,
          `/themes/field-notes/assets/${defaultProjects[2].files[1]}.png`
        ],
        caption: transitCopy?.[lang]?.caption || transitCopy?.zh?.caption
      }
    ]
  }, [allLocalizedItems, workProjectPages, lang, t])

  // ==================== Progressive Polaroid Rope State ====================
  const [ropeHighlight, setRopeHighlight] = useState(false)
  const [scrollActiveIdx, setScrollActiveIdx] = useState(0)
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const [mobileExpanded, setMobileExpanded] = useState(false)
  const [isMobileViewport, setIsMobileViewport] = useState(false)
  const lastExpandScrollYRef = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(max-width: 1024px)')
    const syncViewport = () => {
      const mobile = mq.matches
      setIsMobileViewport(mobile)
      if (!mobile) {
        setMobileExpanded(false)
      }
    }
    syncViewport()
    if (mq.addEventListener) {
      mq.addEventListener('change', syncViewport)
      return () => mq.removeEventListener('change', syncViewport)
    }
    mq.addListener(syncViewport)
    return () => mq.removeListener(syncViewport)
  }, [])

  // Collapse mobile Polaroid when navigating between routes
  useEffect(() => {
    setMobileExpanded(false)
    setHoveredIdx(null)
  }, [router.asPath])

  useEffect(() => {
    if (!combinedPhotos.length) return
    const handleScroll = () => {
      const docMax = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      )
      const progress = Math.min(1, Math.max(0, window.scrollY / docMax))
      const targetIdx = Math.min(
        combinedPhotos.length - 1,
        Math.floor(progress * combinedPhotos.length)
      )
      setScrollActiveIdx(targetIdx)

      // Auto-tuck mobile Polaroid on real vertical scroll (>18px avoids iOS tap bounce jitter)
      if (
        window.innerWidth <= 1024 &&
        Math.abs(window.scrollY - lastExpandScrollYRef.current) > 18
      ) {
        setMobileExpanded(false)
      }
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [combinedPhotos.length])

  // ==================== Lightbox Viewer State ====================
  const [viewerState, setViewerState] = useState({
    open: false,
    mode: 'photo',
    index: 0,
    screen: 'share',
    projectIndex: 0
  })

  const openViewer = (mode, index = 0, screen = 'share', projectIndex = 0) => {
    setMobileExpanded(false)
    setViewerState({
      open: true,
      mode,
      index,
      screen,
      projectIndex
    })
  }

  const closeViewer = () => {
    setViewerState(prev => ({ ...prev, open: false }))
  }

  const stepViewer = direction => {
    setViewerState(prev => {
      if (prev.mode === 'hero') {
        const nextIdx =
          (prev.index + direction + heroPhotos.length) % heroPhotos.length
        return { ...prev, index: nextIdx }
      }
      if (prev.mode === 'photo' && combinedPhotos.length > 0) {
        const nextIdx =
          (prev.index + direction + combinedPhotos.length) %
          combinedPhotos.length
        return { ...prev, index: nextIdx }
      }
      return prev
    })
  }

  const handleNavPhotosClick = () => {
    setRopeHighlight(true)
    setTimeout(() => setRopeHighlight(false), 700)
    openViewer('photo', scrollActiveIdx)
  }

  // Sliding window: 4 cards on desktop home (1 unfolded + 3 mini), 5 cards on mobile & quiet article mode
  const windowSize = isMobileViewport || isArticlePage ? 5 : 4
  const activeOffset = windowSize === 5 ? 2 : 1
  const totalPhotos = combinedPhotos.length
  const windowStart = Math.max(
    0,
    Math.min(
      Math.max(0, totalPhotos - windowSize),
      scrollActiveIdx - activeOffset
    )
  )
  const visiblePhotos = combinedPhotos.slice(
    windowStart,
    windowStart + windowSize
  )
  const remainingBelow = Math.max(
    0,
    totalPhotos - (windowStart + visiblePhotos.length)
  )

  const handleMorePendantClick = e => {
    e.stopPropagation()
    if (remainingBelow > 0 && typeof window !== 'undefined') {
      const docMax = document.documentElement.scrollHeight - window.innerHeight
      if (docMax > 24 && window.scrollY < docMax - 12) {
        window.scrollBy({
          top: Math.max(260, Math.round(window.innerHeight * 0.65)),
          behavior: 'smooth'
        })
        return
      }
      openViewer('photo', Math.min(totalPhotos - 1, windowStart + visiblePhotos.length))
      return
    }
    openViewer('photo', scrollActiveIdx)
  }

  return (
    <FieldNotesContext.Provider
      value={{
        lang,
        changeLang,
        t,
        combinedPhotos,
        allLocalizedItems,
        homeLabPosts,
        notePosts,
        combinedProjects,
        openViewer,
        scrollActiveIdx,
        hoveredIdx,
        setHoveredIdx
      }}
    >
      <div id='theme-field-notes'>
        <Style />

        {/* Left progressive Polaroid rope (4-card sliding window on desktop & peeking corner on mobile) */}
        <aside
          className={`polaroid-rope-rail ${ropeHighlight ? 'rope-attention' : ''} ${mobileExpanded ? 'is-mobile-expanded' : ''}`}
          aria-label='Polaroid photo timeline rope'
        >
          <button
            type='button'
            className='rope-header-tag mono'
            onClick={e => {
              e.stopPropagation()
              openViewer('photo', scrollActiveIdx)
            }}
          >
            <span className='rope-cam-emoji' aria-hidden='true'>
              📷
            </span>
            <span>
              {String(scrollActiveIdx + 1).padStart(2, '0')}/
              {String(totalPhotos).padStart(2, '0')}
            </span>
          </button>

          <div className='rope-viewport'>
            <div className='rope-track'>
              {visiblePhotos.map((photo, relIdx) => {
                const absIdx = windowStart + relIdx
                const isScrollActive = absIdx === scrollActiveIdx
                const isUnfolded = isMobileViewport
                  ? mobileExpanded && absIdx === (hoveredIdx ?? scrollActiveIdx)
                  : isArticlePage
                  ? hoveredIdx === absIdx
                  : absIdx === (hoveredIdx !== null ? hoveredIdx : scrollActiveIdx)

                const shortDate = String(photo.date || '')
                  .replace(/^20/, '')
                  .split('.')
                  .slice(0, 2)
                  .join('.')

                return (
                  <div
                    key={photo.key || absIdx}
                    className={`rope-node ${isScrollActive ? 'is-scroll-active' : ''} ${isUnfolded ? 'is-unfolded' : ''}`}
                    onMouseEnter={() => {
                      if (!isMobileViewport) setHoveredIdx(absIdx)
                    }}
                    onMouseLeave={() => {
                      if (!isMobileViewport) setHoveredIdx(null)
                    }}
                  >
                    <span className='rope-tick' aria-hidden='true' />
                    <span className='rope-active-date mono' aria-hidden='true'>
                      {shortDate || 'NOTE'}
                    </span>

                    <button
                      type='button'
                      className='rope-polaroid'
                      aria-label={photo.title}
                      onClick={e => {
                        e.stopPropagation()
                        if (isMobileViewport) {
                          const alreadyUnfolded =
                            mobileExpanded &&
                            absIdx === (hoveredIdx ?? scrollActiveIdx)
                          if (!alreadyUnfolded) {
                            lastExpandScrollYRef.current = window.scrollY
                            setHoveredIdx(absIdx)
                            setMobileExpanded(true)
                            return
                          }
                        }
                        openViewer('photo', absIdx)
                      }}
                    >
                      <span className='rope-tape' aria-hidden='true' />
                      <div className='rope-img-wrap'>
                        <img
                          src={photo.thumbSrc}
                          alt={photo.alt || ''}
                          loading='lazy'
                        />
                      </div>
                      <div className='rope-mini-bar mono'>
                        <b>{String(absIdx + 1).padStart(2, '0')}</b>
                        <span>{shortDate || 'NOTE'}</span>
                      </div>
                      <div className='rope-full-caption'>
                        <strong>{photo.title}</strong>
                        <span className='rope-sub mono'>
                          <span>{photo.place || photo.date}</span>
                          <span>↗</span>
                        </span>
                      </div>
                    </button>
                  </div>
                )
              })}

              {totalPhotos > 0 && (
                <button
                  type='button'
                  className='rope-more-pendant mono'
                  onClick={handleMorePendantClick}
                >
                  {remainingBelow > 0 ? (
                    <span>
                      <span className='rope-more-word'>[ </span>↓ +{remainingBelow}
                      <span className='rope-more-word'> MORE ]</span>
                    </span>
                  ) : (
                    <span>
                      <span className='rope-more-word'>[ </span>
                      {totalPhotos}
                      <span className='rope-more-word'> ALL</span> ↗
                      <span className='rope-more-word'> ]</span>
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>
        </aside>

        {/* Right main content stage: quiet rope mode when reading articles */}
        <div
          className={`fieldnotes-shell ${isArticlePage ? 'is-reading-article' : ''}`}
          onClick={() => {
            if (mobileExpanded) {
              setMobileExpanded(false)
              setHoveredIdx(null)
            }
          }}
        >
          <Header
            customMenu={customMenu}
            onNavPhotos={handleNavPhotosClick}
          />

          <main id='main'>{children}</main>

          <Footer />
        </div>

        {/* Global darkroom Polaroid & project screenshot viewer */}
        <Lightbox
          viewerState={viewerState}
          onClose={closeViewer}
          onStep={stepViewer}
          photoList={combinedPhotos}
          projectList={combinedProjects}
        />
      </div>
    </FieldNotesContext.Provider>
  )
}

/**
 * Base Layout wrapper
 */
const LayoutBase = props => {
  return (
    <LangProvider>
      <LayoutBaseInner {...props} />
    </LangProvider>
  )
}

/**
 * Homepage Layout
 */
const LayoutIndex = () => {
  const { notePosts, combinedProjects, openViewer } = useFieldNotes()

  const openHeroPhoto = idx => {
    openViewer('hero', idx)
  }

  const openProjectScreen = (projIdx, screenType) => {
    openViewer('screen', 0, screenType, projIdx)
  }

  return (
    <>
      <Hero onOpenHeroPhoto={openHeroPhoto} />
      <Ticker />
      <NowSection />
      <ArticleSection posts={notePosts} />
      <WorkSection
        projectList={combinedProjects}
        onOpenProjectScreen={openProjectScreen}
      />
      <Closing />
    </>
  )
}

/**
 * Polaroid Dossier Article Detail Component
 */
const ArticleDetail = ({ post, lock, validPassword }) => {
  const { lang, changeLang, t, allLocalizedItems } = useContext(FieldNotesContext)
  const router = useRouter()

  const localizedResolution = useMemo(
    () => resolveLocalizedBlockMap(post?.blockMap, post?.id, lang),
    [post?.blockMap, post?.id, lang]
  )

  useEffect(() => {
    if (!post?.slug || !allLocalizedItems?.length) return
    if (localizedResolution.hasMultiLangBlocks) return

    const currentBaseSlug = String(post.slug)
      .replace(/-(en|ja)$/i, '')
      .replace(/^(en|ja)\//i, '')

    const matchedGroup = allLocalizedItems.find(
      p => p.baseSlug === currentBaseSlug
    )
    const targetVariant = matchedGroup?.variants?.[lang]

    if (targetVariant && targetVariant.slug !== post.slug) {
      const targetUrl = targetVariant.href || `/${targetVariant.slug}`
      router.replace(targetUrl)
    }
  }, [lang, post?.slug, allLocalizedItems, router, localizedResolution.hasMultiLangBlocks])

  useEffect(() => {
    if (!post) {
      const timer = setTimeout(() => {
        if (isBrowser) {
          const article = document.querySelector('#notion-article')
          if (!article) router.push('/404')
        }
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [post, router])

  const photoInfo = useMemo(
    () =>
      post?.summary && String(post.summary).includes('@')
        ? parsePhotoSummary(post.summary, lang)
        : null,
    [post?.summary, lang]
  )

  const displayTitle = post
    ? localizedResolution.titleOverride || parseMultiLang(post.title, lang)
    : ''
  const displaySummary = post
    ? localizedResolution.summaryOverride ||
      (photoInfo?.description || parseMultiLang(post.summary, lang))
    : ''

  useEffect(() => {
    if (typeof document !== 'undefined' && displayTitle) {
      document.title = `${displayTitle} | H.mz`
    }
  }, [displayTitle])

  const localizedPost = useMemo(
    () =>
      post
        ? {
            ...post,
            title: displayTitle,
            summary: displaySummary,
            blockMap: localizedResolution.blockMap
          }
        : null,
    [post, displayTitle, displaySummary, localizedResolution.blockMap]
  )

  if (!post) {
    return (
      <div className='article-stage wrap'>
        <div className='article-paper'>
          <div className='article-inner'>
            <h1>404 — NOT FOUND</h1>
            <Link href='/' className='button ink' style={{ marginTop: 24 }}>
              <span>{t('backToLab')}</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const formattedDate = formatNotionDate(post)
  const coverImg = post.pageCover || post.pageCoverThumbnail
  const rawTags = post.tags || post.tagItems || []
  const cleanTags = filterDisplayTags(rawTags)

  const langBadges = [
    { code: 'zh', label: '中' },
    { code: 'en', label: 'EN' },
    { code: 'ja', label: '日' }
  ]

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <article className='article-stage wrap'>
      {displayTitle && (
        <Head>
          <title>{`${displayTitle} | H.mz`}</title>
        </Head>
      )}
      <div className='article-top-bar'>
        <Link href='/#notes' className='button ink'>
          <span>{t('backToLab')}</span>
        </Link>
        <span className='mono'>
          FIELD NOTES ARCHIVE{formattedDate ? ` // ${formattedDate}` : ''}
        </span>
      </div>

      <div className='article-paper'>
        <span className='article-paper-tape' aria-hidden='true' />

        <div className='article-window-bar mono'>
          <span>● ● ●</span>
          <span>FIELD NOTE / SNAPSHOT &amp; DOSSIER</span>
          <span>↗</span>
        </div>

        <div className='article-inner'>
          <header className={`article-header ${coverImg ? 'has-cover' : ''}`}>
            <div>
              <div className='note-meta mono'>
                {post.category && (
                  <span className='note-cat'>
                    {localizeCategory(post.category, lang)}
                  </span>
                )}
                {formattedDate && (
                  <span>
                    {t('articlePublished')} {formattedDate}
                  </span>
                )}
                {localizedResolution.hasMultiLangBlocks && (
                  <span className='article-lang-pills' role='group' aria-label={t('langLabel')}>
                    {langBadges
                      .filter(b => localizedResolution.availableLangs.includes(b.code))
                      .map(b => (
                        <button
                          key={b.code}
                          type='button'
                          className={
                            localizedResolution.activeLang === b.code ? 'is-active' : ''
                          }
                          aria-pressed={localizedResolution.activeLang === b.code}
                          onClick={() => changeLang(b.code)}
                        >
                          {b.label}
                        </button>
                      ))}
                  </span>
                )}
                {localizedResolution.hasMultiLangBlocks &&
                  localizedResolution.activeLang !== lang && (
                    <span className='article-lang-fallback'>
                      ({t('articleLangFallback')})
                    </span>
                  )}
              </div>

              <h1>{displayTitle}</h1>

              {displaySummary && (
                <p className='article-summary-quote'>{displaySummary}</p>
              )}

              {photoInfo && (photoInfo.place || photoInfo.settings) && (
                <div className='article-photo-meta mono'>
                  {[photoInfo.place, photoInfo.settings].filter(Boolean).join(' · ')}
                </div>
              )}

              {cleanTags.length > 0 && (
                <div className='note-meta mono' style={{ marginTop: 14 }}>
                  {cleanTags.map(tag => {
                    const tagName = typeof tag === 'string' ? tag : tag.name
                    return (
                      <Link
                        key={tagName}
                        href={`/tag/${encodeURIComponent(tagName)}`}
                        className='note-tag'
                      >
                        #{localizeTag(tagName, lang)}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            {coverImg && (
              <div className='article-cover-polaroid'>
                <span className='article-cover-tape' aria-hidden='true' />
                <img src={coverImg} alt={displayTitle} />
                <div className='article-cover-caption mono'>
                  <span>FIG. COVER — SNAPSHOT</span>
                  <span>{formattedDate || 'FIELD NOTE'}</span>
                </div>
              </div>
            )}
          </header>

          <div id='article-wrapper' className='article-body'>
            {lock ? (
              <ArticleLock validPassword={validPassword} />
            ) : (
              <>
                <NotionPage
                  key={`${post.id}-${localizedResolution.activeLang}`}
                  post={localizedPost}
                />
                <ShareBar post={localizedPost} />
              </>
            )}
          </div>

          {!lock && (
            <div style={{ marginTop: 36 }}>
              <Comment frontMatter={post} />
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          marginTop: 32,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Link href='/#notes' className='button ink'>
          <span>{t('backToLab')}</span>
        </Link>
        <button
          type='button'
          className='back-top'
          onClick={scrollToTop}
          aria-label={t('backTop')}
        >
          ↑
        </button>
      </div>
    </article>
  )
}

const LayoutSlug = props => <ArticleDetail {...props} />

/**
 * Post List / Archive Layout
 */
const LayoutPostList = props => {
  const { posts = [], category, tag } = props
  const { lang, t } = useLang()

  const visiblePosts = useMemo(() => {
    const base =
      category || tag
        ? posts
        : posts.filter(p => {
            const cat = String(p?.category || '').trim()
            return cat !== '拍的照片' && cat !== '做的东西'
          })
    return [...base].sort((a, b) => (b?.publishDate || 0) - (a?.publishDate || 0))
  }, [posts, category, tag])

  const headingTitle = category
    ? `${t('category')}: ${localizeCategory(category, lang)}`
    : tag
    ? `#${localizeTag(tag, lang)}`
    : t('allNotes')

  return (
    <div className='wrap' style={{ padding: '40px 0 80px' }}>
      <div className='article-top-bar'>
        <Link href='/#notes' className='button ink'>
          <span>{t('backToLab')}</span>
        </Link>
        <span className='mono'>NOTEBOOK ARCHIVE // {visiblePosts.length} NOTES</span>
      </div>

      <div className='section-heading'>
        <div>
          <span className='eyebrow mono'>NOTEBOOK ARCHIVE</span>
          <h2>{headingTitle}</h2>
        </div>
      </div>

      <div className='notes-memo-grid' style={{ marginTop: '30px' }}>
        {visiblePosts.map((post, idx) => {
          const postDate = formatNotionDate(post)
          const postSlug = post?.slug || post?.id
          const href = post?.href || `/${postSlug}`
          const cleanTags = filterDisplayTags(post.tags || post.tagItems)

          return (
            <Link key={post.id || idx} href={href} className='note-memo-card'>
              <div className='note-memo-tape' aria-hidden='true' />

              <div className='note-memo-header mono'>
                <span className='article-card-category'>
                  {localizeCategory(post.category || 'NOTE', lang)}
                </span>
                <span
                  className='mono'
                  style={{ fontSize: '11px', color: '#686960' }}
                >
                  {postDate}
                </span>
              </div>

              {post.pageCoverThumbnail || post.pageCover ? (
                <img
                  className='note-memo-cover'
                  src={post.pageCoverThumbnail || post.pageCover}
                  alt={parseMultiLang(post.title || '', lang)}
                  loading='lazy'
                />
              ) : null}

              <h3 className='note-memo-title'>
                {parseMultiLang(post.title, lang)}
              </h3>

              {post.summary && (
                <p className='note-memo-desc'>
                  {parseMultiLang(post.summary, lang)}
                </p>
              )}

              {cleanTags.length > 0 && (
                <div className='note-memo-tags'>
                  {cleanTags.map(tg => {
                    const tagName = typeof tg === 'string' ? tg : tg.name
                    return (
                      <span key={tagName} className='note-memo-tag'>
                        #{localizeTag(tagName, lang)}
                      </span>
                    )
                  })}
                </div>
              )}

              <div className='note-memo-foot mono'>
                <span>{`NOTE #${String(idx + 1).padStart(2, '0')}`}</span>
                <span className='note-memo-arrow'>
                  <span>{t('readMore')}</span>
                  <span>↗</span>
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

/**
 * Category Index Page (/category)
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions = [] } = props
  const { lang, t } = useLang()

  return (
    <div className='wrap' style={{ padding: '40px 0 80px' }}>
      <div className='article-top-bar'>
        <Link href='/#notes' className='button ink'>
          <span>{t('backToLab')}</span>
        </Link>
        <span className='mono'>
          FIELD NOTES // {categoryOptions.length} CATEGORIES
        </span>
      </div>

      <div className='section-heading'>
        <div>
          <span className='eyebrow mono'>INDEX BY CATEGORY</span>
          <h2>{t('category')}</h2>
        </div>
      </div>

      <div className='notes-memo-grid' style={{ marginTop: 28 }}>
        {categoryOptions.map((cat, idx) => (
          <Link
            key={cat.name || idx}
            href={`/category/${encodeURIComponent(cat.name)}`}
            className='note-memo-card'
          >
            <div className='note-memo-tape' aria-hidden='true' />
            <div className='note-memo-header mono'>
              <span className='note-cat'>FOLDER #{String(idx + 1).padStart(2, '0')}</span>
              <span>{cat.count || 0} NOTES</span>
            </div>
            <h3 className='note-memo-title' style={{ marginTop: 8 }}>
              {localizeCategory(cat.name, lang)}
            </h3>
            <div className='note-memo-foot mono'>
              <span>OPEN DOSSIER</span>
              <span className='note-memo-arrow'>
                <span>{t('readMore')}</span>
                <span>↗</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

/**
 * Tag Index Page (/tag)
 */
const LayoutTagIndex = props => {
  const { tagOptions = [] } = props
  const { lang, t } = useLang()
  const visibleTags = filterDisplayTags(tagOptions)

  return (
    <div className='wrap' style={{ padding: '40px 0 80px' }}>
      <div className='article-top-bar'>
        <Link href='/#notes' className='button ink'>
          <span>{t('backToLab')}</span>
        </Link>
        <span className='mono'>FIELD NOTES // {visibleTags.length} TAGS</span>
      </div>

      <div className='section-heading'>
        <div>
          <span className='eyebrow mono'>INDEX BY TAG</span>
          <h2>{t('tags')}</h2>
        </div>
      </div>

      <div className='article-paper' style={{ marginTop: 28 }}>
        <span className='article-paper-tape' aria-hidden='true' />
        <div className='article-window-bar mono'>
          <span>● ● ●</span>
          <span>FIELD NOTE / TAGS DIRECTORY</span>
          <span>↗</span>
        </div>
        <div
          className='article-inner'
          style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}
        >
          {visibleTags.map(tg => {
            const name = typeof tg === 'string' ? tg : tg.name
            const count = typeof tg === 'object' ? tg.count : undefined
            return (
              <Link
                key={name}
                href={`/tag/${encodeURIComponent(name)}`}
                className='nav-dropdown-trigger mono'
                style={{ padding: '8px 14px', fontSize: 13 }}
              >
                <span>#{localizeTag(name, lang)}</span>
                {count !== undefined && (
                  <span style={{ color: 'var(--muted)' }}>({count})</span>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const LayoutArchive = LayoutPostList
const LayoutSearch = LayoutPostList

const Layout404 = () => {
  const { t } = useLang()
  return (
    <div
      className='wrap'
      style={{
        padding: '120px 0',
        textAlign: 'center',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <span className='hello sticker' style={{ marginBottom: '20px' }}>
        PAGE NOT FOUND
      </span>
      <h1 style={{ fontSize: '72px', fontWeight: 900, marginBottom: '20px' }}>
        404
      </h1>
      <p style={{ color: 'var(--muted)', marginBottom: '30px' }}>
        这一页好像还没折腾出来，或者已经移走了。
      </p>
      <Link href='/' className='button ink'>
        <span>{t('backToHome')}</span>
        <span aria-hidden='true'>↗</span>
      </Link>
    </div>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
