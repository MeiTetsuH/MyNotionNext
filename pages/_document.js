// eslint-disable-next-line @next/next/no-document-import-in-page
import BLOG from '@/blog.config'
import Document, { Head, Html, Main, NextScript } from 'next/document'

const isLocalFontAwesome = BLOG.FONT_AWESOME?.startsWith(
  '/vendor/fontawesome/'
)

// 预先设置深色模式的脚本内容
const buildDarkModeScript = isFieldNotes => `
(function() {
  const isFieldNotes = ${isFieldNotes ? 'true' : `'${BLOG.THEME || ''}' === 'field-notes'`}
  if (isFieldNotes) {
    document.documentElement.classList.remove('dark')
    document.documentElement.classList.add('light')
    return
  }

  const darkMode = localStorage.getItem('darkMode')

  const prefersDark =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

  const defaultAppearance = '${BLOG.APPEARANCE || 'auto'}'

  let shouldBeDark = darkMode === 'true' || darkMode === 'dark'

  if (darkMode === null) {
    if (defaultAppearance === 'dark') {
      shouldBeDark = true
    } else if (defaultAppearance === 'auto') {
      // 检查是否在深色模式时间范围内
      const date = new Date()
      const hours = date.getHours()
      const darkTimeStart = ${BLOG.APPEARANCE_DARK_TIME ? BLOG.APPEARANCE_DARK_TIME[0] : 18}
      const darkTimeEnd = ${BLOG.APPEARANCE_DARK_TIME ? BLOG.APPEARANCE_DARK_TIME[1] : 6}
      
      shouldBeDark = prefersDark || (hours >= darkTimeStart || hours < darkTimeEnd)
    }
  }
  
  // 立即设置 html 元素的类
  document.documentElement.classList.add(shouldBeDark ? 'dark' : 'light')
})()
`

// 预先初始化语言脚本：?lang= 最高优先级并落盘 → 已存偏好 → 浏览器语言（非中/日统一回退 en）
const initLangScript = `
(function() {
  try {
    var supported = { zh: 1, en: 1, ja: 1 };
    var params = new URLSearchParams(window.location.search);
    var q = (params.get('lang') || params.get('locale') || '').toLowerCase();
    var fromQuery = '';
    if (q.indexOf('ja') === 0) fromQuery = 'ja';
    else if (q.indexOf('en') === 0) fromQuery = 'en';
    else if (q.indexOf('zh') === 0) fromQuery = 'zh';

    var lang = '';
    if (fromQuery) {
      lang = fromQuery;
      try {
        localStorage.setItem('h-mz-language', lang);
        document.cookie = 'h-mz-language=' + lang + ';path=/;max-age=31536000;SameSite=Lax';
      } catch (e) {}
    }

    if (!lang) {
      var rawSaved = localStorage.getItem('h-mz-language') || (document.cookie.match(/(?:^|;\\s*)h-mz-language=([^;]+)/) || [])[1] || '';
      if (supported[rawSaved]) lang = rawSaved;
    }

    if (!lang) {
      var nav = (navigator.languages && navigator.languages.length) ? navigator.languages : (navigator.language ? [navigator.language] : []);
      if (nav.length > 0) {
        lang = 'en';
        for (var i = 0; i < nav.length; i++) {
          var l = String(nav[i] || '').toLowerCase();
          if (!l) continue;
          if (l.indexOf('zh') === 0) { lang = 'zh'; break; }
          if (l.indexOf('ja') === 0) { lang = 'ja'; break; }
          if (l.indexOf('en') === 0) { lang = 'en'; break; }
        }
      }
    }

    if (!supported[lang]) lang = 'zh';
    window.__INIT_LANG__ = lang;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : (lang === 'ja' ? 'ja' : 'en');
  } catch(e) {}
})();
`

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const runtimeTheme =
      this.props.__NEXT_DATA__?.props?.pageProps?.NOTION_CONFIG?.THEME ||
      BLOG.THEME ||
      ''
    const isFieldNotes = runtimeTheme === 'field-notes'
    return (
      <Html lang={BLOG.LANG}>
        <Head>
          <link rel='preconnect' href='https://images.unsplash.com' />
          <link rel='dns-prefetch' href='//images.unsplash.com' />

          {/* 预加载字体 */}
          {BLOG.FONT_AWESOME && (
            <>
              {isLocalFontAwesome && (
                <>
                  <link
                    rel='preload'
                    href='/vendor/fontawesome/webfonts/fa-solid-900.woff2'
                    as='font'
                    type='font/woff2'
                    crossOrigin='anonymous'
                  />
                  <link
                    rel='preload'
                    href='/vendor/fontawesome/webfonts/fa-regular-400.woff2'
                    as='font'
                    type='font/woff2'
                    crossOrigin='anonymous'
                  />
                  <link
                    rel='preload'
                    href='/vendor/fontawesome/webfonts/fa-brands-400.woff2'
                    as='font'
                    type='font/woff2'
                    crossOrigin='anonymous'
                  />
                </>
              )}
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    '.fa,.fas,.far,.fab,.fa-solid,.fa-regular,.fa-brands{display:inline-flex;width:1.25em;min-width:1.25em;height:1em;align-items:center;justify-content:center;text-align:center;line-height:1}'
                }}
              />
              <link
                id='font-awesome-css'
                rel='preload'
                as='style'
                href={BLOG.FONT_AWESOME}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html:
                    "requestAnimationFrame(function(){var l=document.getElementById('font-awesome-css');if(l)l.rel='stylesheet'})"
                }}
              />
              <noscript>
                <link rel='stylesheet' href={BLOG.FONT_AWESOME} />
              </noscript>
            </>
          )}

          {/* 预先设置深色模式与语言，避免闪烁 */}
          <script dangerouslySetInnerHTML={{ __html: buildDarkModeScript(isFieldNotes) }} />
          <script dangerouslySetInnerHTML={{ __html: initLangScript }} />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
