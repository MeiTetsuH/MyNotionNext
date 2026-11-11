/**
 * Lightweight native Canvas click-fireworks effect (zero external runtime dependencies).
 * - Never sets pixel inline width/height (prevents mobile orientation/resize layout blowout)
 * - Runs requestAnimationFrame only while particles are active (0% idle CPU/battery drain)
 * - Returns a destroy() handle so React unmount / StrictMode leaves no leaked listeners
 */
function createFireworks({ config } = {}) {
  if (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return () => {}
  }

  const existing = document.querySelectorAll('canvas.fireworks')
  existing.forEach(node => node.parentNode && node.parentNode.removeChild(node))

  const canvasEl = document.createElement('canvas')
  canvasEl.id = 'fireworks'
  canvasEl.className = 'fireworks'
  canvasEl.setAttribute('aria-hidden', 'true')
  document.body.appendChild(canvasEl)

  const defaultColors = [
    '255, 20, 97',
    '24, 255, 146',
    '90, 135, 255',
    '251, 243, 140'
  ]
  const settings = Object.assign(
    {
      colors: defaultColors,
      numberOfParticules: 20,
      orbitRadius: { min: 50, max: 100 },
      circleRadius: { min: 10, max: 20 },
      diffuseRadius: { min: 50, max: 100 },
      animeDuration: { min: 900, max: 1500 }
    },
    config || {}
  )
  const palette =
    Array.isArray(settings.colors) && settings.colors.length > 0
      ? settings.colors
      : defaultColors

  const ctx = canvasEl.getContext('2d')
  if (!ctx) {
    return () => {
      if (canvasEl.parentNode) canvasEl.parentNode.removeChild(canvasEl)
    }
  }

  let viewW = 0
  let viewH = 0
  function setCanvasSize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    viewW = document.documentElement.clientWidth || window.innerWidth
    viewH = document.documentElement.clientHeight || window.innerHeight
    canvasEl.width = Math.max(1, Math.round(viewW * dpr))
    canvasEl.height = Math.max(1, Math.round(viewH * dpr))
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  const rand = (min, max) => min + Math.random() * (max - min)
  const randInt = (min, max) => Math.floor(rand(min, max + 1))
  const easeOutExpo = t => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t))

  const bursts = []
  let rafId = 0

  function spawnBurst(x, y) {
    const now = performance.now()
    const particles = []
    for (let i = 0; i < settings.numberOfParticules; i++) {
      const angle = rand(0, Math.PI * 2)
      const dist =
        (Math.random() < 0.5 ? -1 : 1) *
        rand(settings.diffuseRadius.min, settings.diffuseRadius.max)
      particles.push({
        startX: x,
        startY: y,
        endX: x + dist * Math.cos(angle),
        endY: y + dist * Math.sin(angle),
        startRadius: rand(settings.circleRadius.min, settings.circleRadius.max),
        color: `rgba(${palette[randInt(0, palette.length - 1)]},${rand(0.2, 0.85).toFixed(2)})`,
        duration: rand(settings.animeDuration.min, settings.animeDuration.max)
      })
    }

    const ring = {
      x,
      y,
      endRadius: rand(settings.orbitRadius.min, settings.orbitRadius.max),
      duration: rand(1200, 1800),
      alphaDuration: rand(600, 800)
    }

    const maxDuration = Math.max(
      ring.duration,
      ...particles.map(p => p.duration)
    )
    bursts.push({ start: now, maxDuration, particles, ring })

    if (!rafId) {
      rafId = window.requestAnimationFrame(tick)
    }
  }

  function tick(now) {
    ctx.clearRect(0, 0, viewW, viewH)

    for (let b = bursts.length - 1; b >= 0; b--) {
      const burst = bursts[b]
      const elapsed = now - burst.start
      if (elapsed >= burst.maxDuration) {
        bursts.splice(b, 1)
        continue
      }

      for (let i = 0; i < burst.particles.length; i++) {
        const p = burst.particles[i]
        if (elapsed >= p.duration) continue
        const progress = easeOutExpo(elapsed / p.duration)
        const px = p.startX + (p.endX - p.startX) * progress
        const py = p.startY + (p.endY - p.startY) * progress
        const pr = p.startRadius + (0.1 - p.startRadius) * progress
        if (pr <= 0.1) continue
        ctx.beginPath()
        ctx.arc(px, py, pr, 0, Math.PI * 2, true)
        ctx.fillStyle = p.color
        ctx.fill()
      }

      const ring = burst.ring
      if (elapsed < ring.duration && elapsed < ring.alphaDuration) {
        const rProgress = easeOutExpo(elapsed / ring.duration)
        const alpha = 0.5 * (1 - elapsed / ring.alphaDuration)
        const lineWidth = 6 * (1 - rProgress)
        if (alpha > 0.01 && lineWidth > 0.05) {
          ctx.save()
          ctx.globalAlpha = alpha
          ctx.beginPath()
          ctx.arc(
            ring.x,
            ring.y,
            0.1 + (ring.endRadius - 0.1) * rProgress,
            0,
            Math.PI * 2,
            true
          )
          ctx.lineWidth = lineWidth
          ctx.strokeStyle = '#000'
          ctx.stroke()
          ctx.restore()
        }
      }
    }

    if (bursts.length > 0) {
      rafId = window.requestAnimationFrame(tick)
    } else {
      rafId = 0
      ctx.clearRect(0, 0, viewW, viewH)
    }
  }

  function onPointerDown(e) {
    const touch = e.touches?.[0] || e.changedTouches?.[0]
    const x = typeof e.clientX === 'number' ? e.clientX : touch?.clientX
    const y = typeof e.clientY === 'number' ? e.clientY : touch?.clientY
    if (typeof x === 'number' && typeof y === 'number') {
      spawnBurst(x, y)
    }
  }

  setCanvasSize()
  document.addEventListener('mousedown', onPointerDown, { passive: true })
  window.addEventListener('resize', setCanvasSize, { passive: true })

  return function destroyFireworks() {
    if (rafId) {
      window.cancelAnimationFrame(rafId)
      rafId = 0
    }
    bursts.length = 0
    document.removeEventListener('mousedown', onPointerDown)
    window.removeEventListener('resize', setCanvasSize)
    if (canvasEl.parentNode) {
      canvasEl.parentNode.removeChild(canvasEl)
    }
  }
}

window.createFireworks = createFireworks
