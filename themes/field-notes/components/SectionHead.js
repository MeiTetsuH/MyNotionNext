import React from 'react'

/**
 * Section opener: a sprayed number, a small label, the title, and an
 * optional handwritten aside on the right.
 */
export const SectionHead = ({ no, eyebrow, title, titleId, note, titleHtml }) => (
  <header className='fn-head'>
    {no && (
      <span className='fn-head-no' aria-hidden='true'>
        {no}
      </span>
    )}
    <div className='fn-head-main'>
      {eyebrow && <span className='fn-eyebrow'>{eyebrow}</span>}
      {titleHtml ? (
        <h2 id={titleId} dangerouslySetInnerHTML={{ __html: titleHtml }} />
      ) : (
        <h2 id={titleId}>{title}</h2>
      )}
    </div>
    {note && <span className='fn-head-note'>{note}</span>}
  </header>
)

export default SectionHead
