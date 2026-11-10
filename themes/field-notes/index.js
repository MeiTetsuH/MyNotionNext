import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
  createContext,
  useContext
} from 'react'
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
import { ArticleToc } from './components/ArticleToc'
import { ContactSheet } from './components/ContactSheet'
import { GraffitiDefs } from './components/Graffiti'
import { PhotoRail, PhotoStrip } from './components/PhotoRail'
import { Poster } from './components/Poster'
import { SectionHead } from './components/SectionHead'
import { LegacyStyle } from './legacy-style'
import { heroPhotos } from './components/constants'

import {
  edgeCopy,
  transitCopy,
  filterDisplayTags,
  formatNotionDate,
  formatPostSummary,
  getCombinedPhotos,
  getLocalizedBlogPosts,
  getPostSection,
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

const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,500..900&family=Ma+Shan+Zheng&family=Noto+Sans+JP:wght@900&family=Noto+Sans+SC:wght@900&family=Permanent+Marker&family=Rubik+Spray+Paint&family=Yusei+Magic&display=swap'

/**
 * Inner base layout: language context, Notion data split into sections,
 * the photo roll on the left and the shared print viewer.
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

  const isHome = router.pathname === '/'

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
      .map(p => {
        const prefetched = prefetchedMap.get(p.id)
        if (prefetched?.parsedByLang?.[lang]) {
          return prefetched.parsedByLang[lang]
        }
        if (prefetched?.blockMap) {
          return parseNotionWorkProject(
            { ...p, blockMap: prefetched.blockMap },
            lang,
            t
          )
        }
        return parseNotionWorkProject(p, lang, t)
      })

    if (notionProjectItems.length > 0) {
      return notionProjectItems.sort((a, b) => {
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

  // ==================== Photo roll ====================
  const [railAttention, setRailAttention] = useState(false)
  const activePhotoRef = useRef(0)
  const handleActivePhoto = useCallback(idx => {
    activePhotoRef.current = idx
  }, [])

  // ==================== Lightbox Viewer State ====================
  const [viewerState, setViewerState] = useState({
    open: false,
    mode: 'photo',
    index: 0,
    screen: 'share',
    projectIndex: 0
  })

  const openViewer = useCallback(
    (mode, index = 0, screen = 'share', projectIndex = 0) => {
      setViewerState({ open: true, mode, index, screen, projectIndex })
    },
    []
  )

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

  const attentionTimerRef = useRef(null)
  useEffect(() => {
    return () => {
      if (attentionTimerRef.current) clearTimeout(attentionTimerRef.current)
    }
  }, [])

  const handleNavPhotosClick = () => {
    setRailAttention(true)
    if (attentionTimerRef.current) clearTimeout(attentionTimerRef.current)
    attentionTimerRef.current = setTimeout(() => setRailAttention(false), 700)
    openViewer('photo', activePhotoRef.current)
  }

  const openPhoto = useCallback(idx => openViewer('photo', idx), [openViewer])
  const openPhotoRoll = useCallback(() => {
    router.push(`/category/${encodeURIComponent('拍的照片')}`)
  }, [router])

  const contextValue = useMemo(
    () => ({
      lang,
      changeLang,
      t,
      combinedPhotos,
      allLocalizedItems,
      homeLabPosts,
      notePosts,
      combinedProjects,
      openViewer,
      openPhotoRoll
    }),
    [
      lang,
      changeLang,
      t,
      combinedPhotos,
      allLocalizedItems,
      homeLabPosts,
      notePosts,
      combinedProjects,
      openViewer,
      openPhotoRoll
    ]
  )

  return (
    <FieldNotesContext.Provider value={contextValue}>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel='stylesheet' href={FONT_URL} />
      </Head>
      <div id='theme-field-notes'>
        <LegacyStyle />
        <Style />
        <GraffitiDefs />

        {/* Film strip down the left edge with the photo roll clipped to it */}
        <PhotoRail
          photos={combinedPhotos}
          quiet={!isHome}
          attention={railAttention}
          onOpen={openPhoto}
          onActiveChange={handleActivePhoto}
          onEnd={openPhotoRoll}
        />

        <div className={`fn-shell ${isHome ? 'is-home' : 'is-inner'}`}>
          <Header customMenu={customMenu} onNavPhotos={handleNavPhotosClick} />

          <main id='main'>{children}</main>

          <Footer />
        </div>

        {/* Print viewer: polaroids flip, project screenshots just enlarge */}
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
  const { t, notePosts, combinedProjects, combinedPhotos, openViewer, openPhotoRoll } =
    useFieldNotes()

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
      <PhotoStrip
        photos={combinedPhotos}
        label={t('stripLabel')}
        onOpen={idx => openViewer('photo', idx)}
        onEnd={openPhotoRoll}
      />
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

/** Row above every inner page: way back on the left, a mono label on the right. */
const Crumbs = ({ href = '/#notes', label, children }) => (
  <div className='fn-crumbs'>
    <Link href={href} className='fn-btn fn-btn--sm fn-btn--paper'>
      <span>{label}</span>
    </Link>
    <span className='mono'>{children}</span>
  </div>
)

/**
 * Article detail: one sheet pasted on the wall
 */
const ArticleDetail = ({ post, lock, validPassword }) => {
  const { lang, changeLang, t, allLocalizedItems } = useContext(FieldNotesContext)
  const router = useRouter()

  const localizedResolution = useMemo(
    () => resolveLocalizedBlockMap(post?.blockMap, post?.id, lang),
    [post?.blockMap, post?.id, lang]
  )
  const [hasToc, setHasToc] = useState(false)
  const handleTocAvailability = useCallback(available => {
    setHasToc(available)
  }, [])

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

  // Only photo posts use the "place @ settings @ description" summary format
  const isPhotoPost = Boolean(post) && getPostSection(post) === 'photo'
  const photoInfo = useMemo(
    () =>
      isPhotoPost && post?.summary && String(post.summary).includes('@')
        ? parsePhotoSummary(post.summary, lang)
        : null,
    [isPhotoPost, post?.summary, lang]
  )

  const hasPhotoMeta = Boolean(
    photoInfo && (photoInfo.place || photoInfo.settings)
  )
  const displayTitle = post
    ? localizedResolution.titleOverride || parseMultiLang(post.title, lang)
    : ''
  const displaySummary = post
    ? localizedResolution.summaryOverride ||
      (hasPhotoMeta ? photoInfo.description : parseMultiLang(post.summary, lang))
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
      <div className='fn-page wrap'>
        <div className='fn-sheet'>
          <div className='fn-sheet-head'>
            <h1>404 — NOT FOUND</h1>
            <Link href='/' className='fn-btn'>
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
    <article className='fn-page wrap'>
      {displayTitle && (
        <Head>
          <title>{`${displayTitle} | H.mz`}</title>
        </Head>
      )}
      <Crumbs label={t('backToLab')}>
        FIELD NOTES ARCHIVE{formattedDate ? ` // ${formattedDate}` : ''}
      </Crumbs>

      <div className='fn-sheet'>
        <header className={`fn-sheet-head ${coverImg ? 'has-cover' : ''}`}>
          <div className='fn-sheet-title'>
            <div className='fn-poster-meta'>
              {post.category && (
                <Link
                  href={`/category/${encodeURIComponent(post.category)}`}
                  className='fn-chip-tag'>
                  {localizeCategory(post.category, lang)}
                </Link>
              )}
              {formattedDate && (
                <span className='mono'>
                  {t('articlePublished')} {formattedDate}
                </span>
              )}
              {localizedResolution.hasMultiLangBlocks && (
                <span className='fn-lang-pills' role='group' aria-label={t('langLabel')}>
                  {langBadges
                    .filter(b => localizedResolution.availableLangs.includes(b.code))
                    .map(b => (
                      <button
                        key={b.code}
                        type='button'
                        aria-pressed={localizedResolution.activeLang === b.code}
                        onClick={() => changeLang(b.code)}>
                        {b.label}
                      </button>
                    ))}
                </span>
              )}
              {localizedResolution.hasMultiLangBlocks &&
                localizedResolution.activeLang !== lang && (
                  <span className='mono'>({t('articleLangFallback')})</span>
                )}
            </div>

            <h1>{displayTitle}</h1>

            {displaySummary && <p className='fn-sheet-lede'>{displaySummary}</p>}

            {hasPhotoMeta && (
              <div className='fn-sheet-exif mono'>
                {[photoInfo.place, photoInfo.settings].filter(Boolean).join(' · ')}
              </div>
            )}

            {cleanTags.length > 0 && (
              <div className='fn-tags'>
                {cleanTags.map(tag => {
                  const tagName = typeof tag === 'string' ? tag : tag.name
                  return (
                    <Link key={tagName} href={`/tag/${encodeURIComponent(tagName)}`}>
                      #{localizeTag(tagName, lang)}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          {coverImg && (
            <figure className='fn-sheet-cover'>
              <span className='fn-gaffer' aria-hidden='true' />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={coverImg} alt={displayTitle} />
              <figcaption className='mono'>
                <span>FIG. COVER</span>
                <span>{formattedDate || 'FIELD NOTE'}</span>
              </figcaption>
            </figure>
          )}
        </header>

        <div className='fn-sheet-body'>
          <div className={`article-reading ${hasToc ? 'has-toc' : ''}`}>
            <div className='article-reading-main'>
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
                <div className='article-comments'>
                  <Comment frontMatter={post} />
                </div>
              )}
            </div>

            {!lock && (
              <ArticleToc
                containerId='article-wrapper'
                contentKey={`${post.id}-${localizedResolution.activeLang}`}
                onAvailabilityChange={handleTocAvailability}
              />
            )}
          </div>
        </div>
      </div>

      <div className='fn-page-end'>
        <Link href='/#notes' className='fn-btn fn-btn--paper'>
          <span>{t('backToLab')}</span>
        </Link>
        <button
          type='button'
          className='fn-top'
          onClick={scrollToTop}
          aria-label={t('backTop')}>
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
  const { combinedPhotos = [], openViewer } = useFieldNotes() || {}
  const isPhotoRoll =
    Boolean(category) &&
    getPostSection({ category }) === 'photo' &&
    combinedPhotos.length > 0

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
    ? localizeCategory(category, lang)
    : tag
    ? `#${localizeTag(tag, lang)}`
    : t('allNotes')

  if (isPhotoRoll) {
    return (
      <div className='fn-page wrap'>
        <Crumbs href='/' label={t('backToLab')}>
          CONTACT SHEET // {combinedPhotos.length} FRAMES
        </Crumbs>
        <ContactSheet
          photos={combinedPhotos}
          onOpen={idx => openViewer && openViewer('photo', idx)}
        />
      </div>
    )
  }

  return (
    <div className='fn-page wrap'>
      <Crumbs label={t('backToLab')}>
        NOTEBOOK ARCHIVE // {visiblePosts.length} NOTES
      </Crumbs>

      <SectionHead
        eyebrow={category ? t('category') : tag ? t('tags') : 'NOTEBOOK ARCHIVE'}
        title={headingTitle}
      />

      <div className='fn-posters'>
        {visiblePosts.map((post, idx) => {
          const postSlug = post?.slug || post?.id
          return (
            <Poster
              key={post.id || idx}
              href={post?.href || `/${postSlug}`}
              no={`#${String(idx + 1).padStart(2, '0')}`}
              category={localizeCategory(post.category || 'NOTE', lang)}
              date={formatNotionDate(post)}
              cover={post.pageCoverThumbnail || post.pageCover}
              title={parseMultiLang(post.title, lang)}
              summary={
                post.summary
                  ? getPostSection(post) === 'photo'
                    ? formatPostSummary(post.summary, lang)
                    : parseMultiLang(post.summary, lang)
                  : ''
              }
              tags={filterDisplayTags(post.tags || post.tagItems).map(tg =>
                localizeTag(typeof tg === 'string' ? tg : tg.name, lang)
              )}
              cta={t('readMore')}
            />
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
    <div className='fn-page wrap'>
      <Crumbs label={t('backToLab')}>
        FIELD NOTES // {categoryOptions.length} CATEGORIES
      </Crumbs>

      <SectionHead eyebrow='INDEX BY CATEGORY' title={t('category')} />

      <div className='fn-posters'>
        {categoryOptions.map((cat, idx) => (
          <Poster
            key={cat.name || idx}
            href={`/category/${encodeURIComponent(cat.name)}`}
            no={`#${String(idx + 1).padStart(2, '0')}`}
            category={`${cat.count || 0} NOTES`}
            title={localizeCategory(cat.name, lang)}
            cta={t('readMore')}
          />
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
    <div className='fn-page wrap'>
      <Crumbs label={t('backToLab')}>
        FIELD NOTES // {visibleTags.length} TAGS
      </Crumbs>

      <SectionHead eyebrow='INDEX BY TAG' title={t('tags')} />

      <div className='fn-tagwall'>
        {visibleTags.map(tg => {
          const name = typeof tg === 'string' ? tg : tg.name
          const count = typeof tg === 'object' ? tg.count : undefined
          return (
            <Link key={name} href={`/tag/${encodeURIComponent(name)}`} className='fn-chip'>
              #{localizeTag(name, lang)}
              {count !== undefined && <b>{count}</b>}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

const LayoutArchive = LayoutPostList
const LayoutSearch = LayoutPostList

const Layout404 = () => {
  const { t } = useLang()
  return (
    <div className='fn-page wrap fn-404'>
      <span className='fn-slap'>{t('pageNotFound')}</span>
      <h1>404</h1>
      <p>{t('notFoundDesc')}</p>
      <Link href='/' className='fn-btn'>
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
