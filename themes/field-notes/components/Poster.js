import React from 'react'
import Link from 'next/link'

/**
 * One note pasted on the wall. Used by the home grid and by every list page.
 */
export const Poster = ({
  href,
  no,
  category,
  date,
  cover,
  title,
  summary,
  tags = [],
  cta
}) => (
  <Link href={href} className={`fn-poster ${cover ? '' : 'is-bare'}`}>
    {no && (
      <span className='fn-poster-no' aria-hidden='true'>
        {no}
      </span>
    )}
    {cover && (
      <span className='fn-poster-cover'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cover} alt='' loading='lazy' />
      </span>
    )}
    <span className='fn-poster-body'>
      <span className='fn-poster-meta'>
        {category && <span className='fn-chip-tag'>{category}</span>}
        {date && <span className='mono'>{date}</span>}
      </span>
      <strong className='fn-poster-title'>{title}</strong>
      {summary && <span className='fn-poster-desc'>{summary}</span>}
      {tags.length > 0 && (
        <span className='fn-tags'>
          {tags.map(tag => (
            <span key={tag}>#{tag}</span>
          ))}
        </span>
      )}
    </span>
    <span className='fn-poster-foot'>
      <span>{cta}</span>
      <span aria-hidden='true'>↗</span>
    </span>
  </Link>
)

export default Poster
