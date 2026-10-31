import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations, edgeCopy, transitCopy } from './translations'

const LangContext = createContext()

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState('zh')

  useEffect(() => {
    try {
      // 1. 用户主动选过语言偏好（localStorage 或 cookie）
      const saved =
        localStorage.getItem('h-mz-language') ||
        (document.cookie.match(/(?:^|;\s*)h-mz-language=([^;]+)/)?.[1])
      if (saved && translations[saved]) {
        setLang(saved)
        return
      }

      // 2. URL 传参优先级（如分享链接自带 ?lang=en 或 ?locale=ja）
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search)
        const qLang = (params.get('lang') || params.get('locale') || '').toLowerCase()
        if (qLang.startsWith('ja')) {
          setLang('ja')
          localStorage.setItem('h-mz-language', 'ja')
          return
        }
        if (qLang.startsWith('en')) {
          setLang('en')
          localStorage.setItem('h-mz-language', 'en')
          return
        }
        if (qLang.startsWith('zh')) {
          setLang('zh')
          localStorage.setItem('h-mz-language', 'zh')
          return
        }
      }

      // 3. 自动检测浏览器/系统语言偏好
      // 逻辑规则：
      // - 中文系统（zh, zh-CN, zh-TW, zh-HK）-> 中文
      // - 日文系统（ja, ja-JP）-> 日文
      // - 英文系统（en, en-US, en-GB...）-> 英文
      // - 其他所有国家/语言（如法文 fr、西文 es、德文 de、韩文 ko 等）-> 统一兜底默认英文 en
      const navLangs = Array.isArray(navigator.languages) && navigator.languages.length > 0
        ? navigator.languages
        : [navigator.language || '']

      let matched = 'en' // 国际用户全量默认英文兜底
      for (const item of navLangs) {
        const l = String(item || '').toLowerCase()
        if (l.startsWith('zh')) {
          matched = 'zh'
          break
        }
        if (l.startsWith('ja')) {
          matched = 'ja'
          break
        }
        if (l.startsWith('en')) {
          matched = 'en'
          break
        }
      }

      setLang(matched)
    } catch (e) {}
  }, [])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang === 'ja' ? 'ja' : 'en'
    }
  }, [lang])

  const changeLang = newLang => {
    if (translations[newLang]) {
      setLang(newLang)
      try {
        localStorage.setItem('h-mz-language', newLang)
        document.cookie = `h-mz-language=${newLang};path=/;max-age=31536000;SameSite=Lax`
      } catch (e) {}
    }
  }

  const t = key => {
    return translations[lang]?.[key] ?? translations['zh']?.[key] ?? key
  }

  return (
    <LangContext.Provider value={{ lang, changeLang, t, edgeCopy, transitCopy }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
