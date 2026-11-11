import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect
} from 'react'
import { translations, edgeCopy, transitCopy } from './translations'

const LangContext = createContext()

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * Pure language resolver matching `_document.js` (`initLangScript`):
 * 1. Explicit URL query (`?lang=` / `?locale=`) — highest priority, also persisted
 * 2. Saved user preference (`localStorage` / `cookie` `h-mz-language`)
 * 3. Browser language list (`zh*` -> zh, `ja*` -> ja, `en*` or any other locale -> en)
 */
export function resolveInitialLang({
  search = '',
  saved = '',
  languages = []
} = {}) {
  const params = new URLSearchParams(search)
  const qLang = (params.get('lang') || params.get('locale') || '').toLowerCase()
  if (qLang.startsWith('ja')) return { lang: 'ja', fromQuery: true }
  if (qLang.startsWith('en')) return { lang: 'en', fromQuery: true }
  if (qLang.startsWith('zh')) return { lang: 'zh', fromQuery: true }

  if (saved && translations[saved]) {
    return { lang: saved, fromQuery: false }
  }

  const nonEmptyLangs = (Array.isArray(languages) ? languages : [])
    .map(item => String(item || '').trim().toLowerCase())
    .filter(Boolean)

  if (nonEmptyLangs.length > 0) {
    for (const l of nonEmptyLangs) {
      if (l.startsWith('zh')) return { lang: 'zh', fromQuery: false }
      if (l.startsWith('ja')) return { lang: 'ja', fromQuery: false }
      if (l.startsWith('en')) return { lang: 'en', fromQuery: false }
    }
    return { lang: 'en', fromQuery: false }
  }

  return { lang: 'zh', fromQuery: false }
}

function persistLang(nextLang) {
  try {
    localStorage.setItem('h-mz-language', nextLang)
    document.cookie = `h-mz-language=${nextLang};path=/;max-age=31536000;SameSite=Lax`
  } catch (e) {}
}

export const LangProvider = ({ children }) => {
  // Always render 'zh' during SSR and initial hydration pass so React 18 never
  // hits a text/head hydration mismatch, then switch synchronously before paint.
  const [lang, setLang] = useState('zh')

  useIsomorphicLayoutEffect(() => {
    try {
      const saved =
        localStorage.getItem('h-mz-language') ||
        document.cookie.match(/(?:^|;\s*)h-mz-language=([^;]+)/)?.[1] ||
        ''
      const navLangs =
        Array.isArray(navigator.languages) && navigator.languages.length > 0
          ? navigator.languages
          : navigator.language
          ? [navigator.language]
          : []

      const { lang: resolved, fromQuery } = resolveInitialLang({
        search: window.location.search,
        saved,
        languages: navLangs
      })

      const finalLang =
        !fromQuery &&
        window.__INIT_LANG__ &&
        translations[window.__INIT_LANG__]
          ? window.__INIT_LANG__
          : resolved

      if (fromQuery) {
        persistLang(finalLang)
      }
      window.__INIT_LANG__ = finalLang
      setLang(finalLang)
    } catch (e) {}
  }, [])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang =
        lang === 'zh' ? 'zh-CN' : lang === 'ja' ? 'ja' : 'en'
    }
  }, [lang])

  const changeLang = newLang => {
    if (translations[newLang]) {
      setLang(newLang)
      if (typeof window !== 'undefined') {
        window.__INIT_LANG__ = newLang
      }
      persistLang(newLang)
    }
  }

  const t = key => {
    return translations[lang]?.[key] ?? translations.zh?.[key] ?? key
  }

  return (
    <LangContext.Provider value={{ lang, changeLang, t, edgeCopy, transitCopy }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
