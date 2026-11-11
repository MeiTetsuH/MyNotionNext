import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { useLang } from './LangContext'
import { Poster } from './Poster'
import { SectionHead } from './SectionHead'
import { localizeCategory, localizeTag, resolvePostHref } from '../data'

// Home shows one featured note plus a single full row; the rest live in the archive
const HOME_GRID_LIMIT = 3

const hrefOf = post => resolvePostHref(post, post.slug || post.id)
const dateOf = post =>
  post.formattedDate || post?.date?.start_date || post?.publishDay || ''
const coverOf = post => post.pageCoverThumbnail || post.pageCover || ''
const tagNames = (post, lang) =>
  (post.displayTags || []).map(tag => localizeTag(tag, lang))

export const ArticleSection = ({ posts = [] }) => {
  const { lang, t } = useLang()
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = useMemo(() => {
    const map = new Map()
    for (const p of posts) {
      const rawKey = p.category || '随笔'
      const label = p.localizedCategory || localizeCategory(rawKey, lang)
      const prev = map.get(rawKey)
      map.set(rawKey, { label, count: (prev?.count || 0) + 1 })
    }
    return Array.from(map.entries())
  }, [posts, lang])

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'all') return posts
    return posts.filter(p => (p.category || '随笔') === activeCategory)
  }, [posts, activeCategory])

  const featured = filteredPosts[0] || null
  const gridPosts = filteredPosts.slice(1, 1 + HOME_GRID_LIMIT)
  const allLabel = t('filterAll') || '全部'

  return (
    <section className='fn-notes' id='notes' aria-labelledby='articles-title'>
      <div className='wrap'>
        <span id='articles' className='fn-anchor' />
        <SectionHead
          no='02'
          eyebrow='FIELD NOTES & WRITINGS'
          title={t('notesTitle')}
          titleId='articles-title'
          note={t('notesNote')}
        />

        {categories.length > 0 && (
          <div className='fn-chips' role='toolbar' aria-label={t('category')}>
            <button
              type='button'
              className='fn-chip'
              aria-pressed={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}>
              {allLabel} <b>{posts.length}</b>
            </button>
            {categories.map(([catKey, { label, count }]) => (
              <button
                key={catKey}
                type='button'
                className='fn-chip'
                aria-pressed={activeCategory === catKey}
                onClick={() => setActiveCategory(catKey)}>
                {label} <b>{count}</b>
              </button>
            ))}
          </div>
        )}

        {!featured ? (
          <p className='fn-empty mono'>{t('noPosts')}</p>
        ) : (
          <>
            <article className='fn-bill'>
              <Link href={hrefOf(featured)} className='fn-bill-cover' tabIndex={-1} aria-hidden='true'>
                {coverOf(featured) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={coverOf(featured)} alt='' loading='lazy' />
                ) : (
                  <span className='fn-bill-icon'>{featured.pageIcon || '✎'}</span>
                )}
                <span className='fn-bill-stamp'>LATEST</span>
              </Link>

              <div className='fn-bill-copy'>
                <div className='fn-poster-meta'>
                  {(featured.localizedCategory || featured.category) && (
                    <span className='fn-chip-tag'>
                      {featured.localizedCategory || featured.category}
                    </span>
                  )}
                  <span className='mono'>{dateOf(featured)}</span>
                </div>
                <h3>
                  <Link href={hrefOf(featured)}>
                    {featured.localizedTitle || featured.title}
                  </Link>
                </h3>
                {(featured.localizedSummary || featured.summary) && (
                  <p>{featured.localizedSummary || featured.summary}</p>
                )}
                {tagNames(featured, lang).length > 0 && (
                  <div className='fn-tags'>
                    {tagNames(featured, lang).map(tag => (
                      <span key={tag}>#{tag}</span>
                    ))}
                  </div>
                )}
                <Link href={hrefOf(featured)} className='fn-btn'>
                  <span>{t('readMore')}</span>
                  <span aria-hidden='true'>↗</span>
                </Link>
              </div>
            </article>

            {gridPosts.length > 0 && (
              <div className='fn-posters'>
                {gridPosts.map((post, idx) => (
                  <Poster
                    key={post.id || idx}
                    href={hrefOf(post)}
                    no={`#${String(idx + 2).padStart(2, '0')}`}
                    category={post.localizedCategory || post.category || 'NOTE'}
                    date={dateOf(post)}
                    cover={coverOf(post)}
                    title={post.localizedTitle || post.title}
                    summary={post.localizedSummary || post.summary}
                    tags={tagNames(post, lang)}
                    cta={t('readMore')}
                  />
                ))}
              </div>
            )}

            <div className='fn-more'>
              <Link href='/archive' className='fn-btn fn-btn--paper'>
                <span>{t('allNotes')}</span>
                <span aria-hidden='true'>↗</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default ArticleSection
