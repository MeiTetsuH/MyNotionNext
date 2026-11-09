import React, { useEffect, useState } from 'react'
import { useLang } from './LangContext'

const MIN_HEADINGS = 3
const INDENT_BY_CLASS = [
  ['notion-h-indent-0', 1],
  ['notion-h-indent-1', 2],
  ['notion-h-indent-2', 3]
]
const LEVEL_BY_CLASS = [
  ['notion-h1', 1],
  ['notion-h2', 2],
  ['notion-h3', 3],
  ['notion-h4', 4]
]

const readHeadings = container => {
  if (!container) return []
  const raw = Array.from(container.querySelectorAll('.notion-h'))
    .map(el => {
      const id = el.getAttribute('data-id') || el.querySelector('[id]')?.id
      const text = String(el.innerText || el.textContent || '').trim()
      const indentLevel = INDENT_BY_CLASS.find(([cls]) =>
        el.classList.contains(cls)
      )?.[1]
      const rawLevel =
        LEVEL_BY_CLASS.find(([cls]) => el.classList.contains(cls))?.[1] || 3
      return id && text ? { id, text, indentLevel, rawLevel } : null
    })
    .filter(Boolean)

  if (raw.length === 0) return []
  const minRaw = Math.min(...raw.map(item => item.rawLevel))
  return raw.map(item => {
    const normalized = Math.min(3, Math.max(1, item.rawLevel - minRaw + 1))
    return {
      id: item.id,
      text: item.text,
      level: item.indentLevel || normalized
    }
  })
}

/**
 * Sticky "in this note" index built from the rendered (already localized)
 * Notion headings, so multi-language articles only list the active language.
 */
export const ArticleToc = ({ containerId, contentKey, onAvailabilityChange }) => {
  const { t } = useLang()
  const [items, setItems] = useState([])
  const [activeId, setActiveId] = useState(null)

  // Re-scan after the Notion renderer (re)mounts for a new post or language
  useEffect(() => {
    const container = document.getElementById(containerId)
    if (!container) return undefined
    const signature = list =>
      list.map(i => `${i.id}:${i.level}:${i.text}`).join('|')
    const scan = () => {
      const next = readHeadings(container)
      setItems(prev => (signature(prev) === signature(next) ? prev : next))
    }
    scan()
    const timer = setTimeout(scan, 600)
    let observer = null
    if (typeof MutationObserver !== 'undefined') {
      observer = new MutationObserver(scan)
      observer.observe(container, { childList: true, subtree: true })
    }
    return () => {
      clearTimeout(timer)
      if (observer) observer.disconnect()
    }
  }, [containerId, contentKey])

  const visible = items.length >= MIN_HEADINGS

  useEffect(() => {
    if (onAvailabilityChange) onAvailabilityChange(visible)
  }, [visible, onAvailabilityChange])

  // Scroll spy: the last heading above the upper third of the viewport is active
  useEffect(() => {
    if (!visible) return undefined
    let ticking = false
    const update = () => {
      ticking = false
      const threshold = window.innerHeight * 0.3
      let current = items[0]?.id || null
      for (const item of items) {
        const el = document.querySelector(`[data-id="${item.id}"]`)
        if (!el) continue
        if (el.getBoundingClientRect().top - threshold <= 0) {
          current = item.id
        } else {
          break
        }
      }
      setActiveId(prev => (prev === current ? prev : current))
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [items, visible])

  if (!visible) return null

  return (
    <nav className='article-toc' aria-label={t('toc')}>
      <div className='article-toc-card'>
        <span className='article-toc-tape' aria-hidden='true' />
        <p className='article-toc-title mono'>{t('toc')}</p>
        <ol>
          {items.map(item => (
            <li
              key={item.id}
              className={`toc-level-${item.level} ${activeId === item.id ? 'is-active' : ''}`}>
              <a
                href={`#${item.id}`}
                aria-current={activeId === item.id ? 'location' : undefined}>
                <span>{item.text}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}

export default ArticleToc
