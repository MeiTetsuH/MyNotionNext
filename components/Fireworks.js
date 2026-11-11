/**
 * https://codepen.io/juliangarnier/pen/gmOwJX
 * custom by hexo-theme-yun @YunYouJun
 */
import { useEffect } from 'react'
import { siteConfig } from '@/lib/config'
import { loadExternalResource } from '@/lib/utils'

/**
 * 鼠标点击烟花特效
 * @returns
 */
const Fireworks = () => {
  const fireworksColor = siteConfig('FIREWORKS_COLOR')

  useEffect(() => {
    let cancelled = false
    let cleanup = null

    loadExternalResource('/js/fireworks.js', 'js').then(() => {
      if (cancelled || !window.createFireworks) return
      cleanup = window.createFireworks({
        config: { colors: fireworksColor }
      })
    })

    return () => {
      cancelled = true
      if (typeof cleanup === 'function') {
        cleanup()
      } else {
        const fireworksElements = document.getElementsByClassName('fireworks')
        while (fireworksElements.length > 0) {
          fireworksElements[0].parentNode.removeChild(fireworksElements[0])
        }
      }
    }
  }, [fireworksColor])

  return null
}

export default Fireworks
