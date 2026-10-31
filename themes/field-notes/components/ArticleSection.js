import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { useLang } from './LangContext'
import { localizeCategory, localizeTag } from '../data'

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

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null
  const gridPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : []

  return (
    <section
      className='articles-section wrap'
      id='notes'
      aria-labelledby='articles-title'
    >
      <div id='articles' style={{ position: 'relative', top: '-20px' }}></div>
      <div className='section-heading'>
        <div>
          <span className='eyebrow mono'>02 / FIELD NOTES & WRITINGS</span>
          <h2 id='articles-title'>{t('notesTitle')}</h2>
        </div>
        <span className='margin-note'>{t('notesNote')}</span>
      </div>

      {/* 和纸胶带 / 分类筛选工具栏 */}
      {categories.length > 0 && (
        <div
          className='filters'
          style={{
            marginBottom: '28px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px'
          }}
        >
          <button
            type='button'
            className={`mono ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
            style={{
              border: 'var(--border)',
              padding: '6px 14px',
              fontWeight: 700,
              background: activeCategory === 'all' ? 'var(--ink)' : 'var(--paper)',
              color: activeCategory === 'all' ? 'var(--paper)' : 'var(--ink)',
              boxShadow: activeCategory === 'all' ? '3px 3px var(--purple)' : '2px 2px var(--ink)',
              cursor: 'pointer'
            }}
          >
            {t('filterAll')?.split('/')[0] || '全部'} / {posts.length}
          </button>
          {categories.map(([catKey, { label, count }]) => (
            <button
              key={catKey}
              type='button'
              className={`mono ${activeCategory === catKey ? 'active' : ''}`}
              onClick={() => setActiveCategory(catKey)}
              style={{
                border: 'var(--border)',
                padding: '6px 14px',
                fontWeight: 700,
                background: activeCategory === catKey ? 'var(--ink)' : 'var(--paper)',
                color: activeCategory === catKey ? 'var(--paper)' : 'var(--ink)',
                boxShadow: activeCategory === catKey ? '3px 3px var(--purple)' : '2px 2px var(--ink)',
                cursor: 'pointer'
              }}
            >
              {label} / {count}
            </button>
          ))}
        </div>
      )}

      {filteredPosts.length === 0 ? (
        <p className='mono' style={{ padding: '30px 0', color: 'var(--muted)' }}>
          {t('noPosts')}
        </p>
      ) : (
        <>
          {/* Featured Field Note: Tactile Paper Layout */}
          {featuredPost && (
            <article className='featured-note-paper'>
              <div className='featured-note-copy'>
                <div className='featured-note-top mono'>
                  <span className='small-tag'>LATEST NOTE — 001</span>
                  {(featuredPost.localizedCategory || featuredPost.category) && (
                    <span className='article-card-category'>
                      {featuredPost.localizedCategory || featuredPost.category}
                    </span>
                  )}
                  <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#686960' }}>
                    {featuredPost.formattedDate ||
                      featuredPost?.date?.start_date ||
                      featuredPost?.publishDay ||
                      ''}
                  </span>
                </div>

                <Link href={featuredPost.href || `/${featuredPost.slug || featuredPost.id}`}>
                  <h3>
                    <span>{featuredPost.localizedTitle || featuredPost.title}</span>
                    <span aria-hidden='true'> ↗</span>
                  </h3>
                </Link>

                {(featuredPost.localizedSummary || featuredPost.summary) && (
                  <p className='featured-note-summary'>
                    {featuredPost.localizedSummary || featuredPost.summary}
                  </p>
                )}

                {featuredPost.displayTags && featuredPost.displayTags.length > 0 && (
                  <div className='note-memo-tags'>
                    {featuredPost.displayTags.map(tag => (
                      <span key={typeof tag === 'string' ? tag : tag.name} className='note-memo-tag'>
                        #{localizeTag(tag, lang)}
                      </span>
                    ))}
                  </div>
                )}

                <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
                  <Link
                    href={featuredPost.href || `/${featuredPost.slug || featuredPost.id}`}
                    className='button ink'
                  >
                    <span>{t('readMore')}</span>
                    <span aria-hidden='true'>↗</span>
                  </Link>
                </div>
              </div>

              <div className='featured-note-visual'>
                <div className='window-bar'>
                  <span className='window-dots'>● ● ●</span>
                  <span className='mono'>FIELD NOTE / SNAPSHOT</span>
                  <span>↗</span>
                </div>
                <Link
                  href={featuredPost.href || `/${featuredPost.slug || featuredPost.id}`}
                  style={{ display: 'block', overflow: 'hidden' }}
                >
                  {featuredPost.pageCoverThumbnail || featuredPost.pageCover ? (
                    <img
                      className='featured-note-cover'
                      src={featuredPost.pageCoverThumbnail || featuredPost.pageCover}
                      alt={featuredPost.localizedTitle || featuredPost.title || ''}
                      loading='lazy'
                    />
                  ) : (
                    <div
                      className='featured-note-cover'
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '48px',
                        background: '#f2f0e6'
                      }}
                    >
                      {featuredPost.pageIcon || '📝'}
                    </div>
                  )}
                </Link>
              </div>
            </article>
          )}

          {/* Grid of Note Memos with Washi Tape */}
          {gridPosts.length > 0 && (
            <div className='notes-memo-grid'>
              {gridPosts.map((post, idx) => {
                const postDate =
                  post.formattedDate ||
                  post?.date?.start_date ||
                  post?.publishDay ||
                  ''
                const href = post.href || `/${post.slug || post.id}`

                return (
                  <Link key={post.id || idx} href={href} className='note-memo-card'>
                    <div className='note-memo-tape' aria-hidden='true'></div>

                    <div className='note-memo-header mono'>
                      <span className='article-card-category'>
                        {post.localizedCategory || post.category || 'NOTE'}
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
                        alt={post.localizedTitle || post.title || ''}
                        loading='lazy'
                      />
                    ) : null}

                    <h3 className='note-memo-title'>
                      {post.localizedTitle || post.title}
                    </h3>

                    {(post.localizedSummary || post.summary) && (
                      <p className='note-memo-desc'>
                        {post.localizedSummary || post.summary}
                      </p>
                    )}

                    {post.displayTags && post.displayTags.length > 0 && (
                      <div className='note-memo-tags'>
                        {post.displayTags.map(tag => (
                          <span
                            key={typeof tag === 'string' ? tag : tag.name}
                            className='note-memo-tag'
                          >
                            #{localizeTag(tag, lang)}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className='note-memo-foot mono'>
                      <span>{`NOTE #${String(idx + 2).padStart(2, '0')}`}</span>
                      <span className='note-memo-arrow'>
                        <span>{t('readMore')}</span>
                        <span>↗</span>
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}

          <div className='article-action-bar'>
            <Link href='/archive' className='button ink'>
              <span>{t('allNotes')}</span>
              <span aria-hidden='true'>↗</span>
            </Link>
          </div>
        </>
      )}
    </section>
  )
}
