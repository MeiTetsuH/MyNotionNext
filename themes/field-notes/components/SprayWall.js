import React, { useCallback, useEffect, useRef, useState } from 'react'

// Each can sprays one of the theme tokens, so the cans follow the palette
const CANS = [
  { id: 'ink', token: '--ink' },
  { id: 'blue', token: '--blue' },
  { id: 'pink', token: '--pink' },
  { id: 'white', token: '--card' }
]

const RADIUS = 20
const DOTS_PER_STAMP = 22
const MAX_DRIPS = 40

/**
 * A canvas laid over its parent that takes spray paint from the pointer.
 * Nothing is stored: the wall is clean again on the next visit.
 */
export const SprayWall = ({ labels }) => {
  const canvasRef = useRef(null)
  const stateRef = useRef({ drawing: false, last: null, drips: [], raf: 0, color: '#17161a' })
  const [can, setCan] = useState(CANS[0].id)
  const [dirty, setDirty] = useState(false)

  useEffect(() => {
    const token = (CANS.find(c => c.id === can) || CANS[0]).token
    const value = canvasRef.current
      ? getComputedStyle(canvasRef.current).getPropertyValue(token).trim()
      : ''
    if (value) stateRef.current.color = value
  }, [can])

  // Keep the bitmap matched to the element, carrying the paint across resizes
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || typeof ResizeObserver === 'undefined') return undefined
    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.round(canvas.clientWidth * dpr)
      const h = Math.round(canvas.clientHeight * dpr)
      if (!w || !h || (canvas.width === w && canvas.height === h)) return
      const keep = document.createElement('canvas')
      keep.width = canvas.width
      keep.height = canvas.height
      if (keep.width && keep.height) keep.getContext('2d').drawImage(canvas, 0, 0)
      canvas.width = w
      canvas.height = h
      if (keep.width && keep.height) {
        const ctx = canvas.getContext('2d')
        if (keep.width !== w) {
          const scale = w / keep.width
          ctx.drawImage(
            keep,
            0,
            0,
            keep.width,
            keep.height,
            0,
            0,
            w,
            Math.round(keep.height * scale)
          )
        } else {
          ctx.drawImage(keep, 0, 0)
        }
      }
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(canvas)
    return () => ro.disconnect()
  }, [])

  useEffect(() => () => cancelAnimationFrame(stateRef.current.raf), [])

  const runDrips = useCallback(() => {
    const canvas = canvasRef.current
    const st = stateRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = canvas.width / Math.max(1, canvas.clientWidth)
    st.drips = st.drips.filter(d => d.left > 0)
    for (const d of st.drips) {
      ctx.fillStyle = d.color
      ctx.globalAlpha = 0.9
      ctx.beginPath()
      ctx.arc(d.x * dpr, d.y * dpr, d.w * dpr, 0, Math.PI * 2)
      ctx.fill()
      d.y += d.v
      d.v *= 0.992
      d.left -= d.v
      d.w = Math.max(0.9, d.w * 0.998)
    }
    ctx.globalAlpha = 1
    st.raf = st.drips.length ? requestAnimationFrame(runDrips) : 0
  }, [])

  const stamp = useCallback(
    (x, y, pressure) => {
      const canvas = canvasRef.current
      const st = stateRef.current
      const ctx = canvas.getContext('2d')
      const dpr = canvas.width / Math.max(1, canvas.clientWidth)
      ctx.fillStyle = st.color
      for (let i = 0; i < DOTS_PER_STAMP; i++) {
        const angle = Math.random() * Math.PI * 2
        const dist = RADIUS * ((Math.random() + Math.random()) / 2) * (0.6 + Math.random() * 0.7)
        ctx.globalAlpha = 0.25 + Math.random() * 0.6
        ctx.beginPath()
        ctx.arc(
          (x + Math.cos(angle) * dist) * dpr,
          (y + Math.sin(angle) * dist) * dpr,
          (0.5 + Math.random() * 1.5) * dpr,
          0,
          Math.PI * 2
        )
        ctx.fill()
      }
      ctx.globalAlpha = 1
      // Paint runs where the can lingers
      if (pressure > 0.55 && Math.random() < 0.09 && st.drips.length < MAX_DRIPS) {
        st.drips.push({
          x: x + (Math.random() - 0.5) * RADIUS * 0.8,
          y: y + RADIUS * 0.3,
          v: 0.7 + Math.random() * 1.1,
          w: 1.6 + Math.random() * 1.8,
          left: 30 + Math.random() * 110,
          color: st.color
        })
        if (!st.raf) st.raf = requestAnimationFrame(runDrips)
      }
    },
    [runDrips]
  )

  const pointOf = e => {
    const rect = canvasRef.current.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const onDown = e => {
    if (e.button !== undefined && e.button !== 0) return
    const st = stateRef.current
    st.drawing = true
    st.last = pointOf(e)
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch (err) {
      // capture is a nicety, drawing works without it
    }
    stamp(st.last.x, st.last.y, 1)
    setDirty(true)
  }

  const onMove = e => {
    const st = stateRef.current
    if (!st.drawing) return
    const p = pointOf(e)
    const dx = p.x - st.last.x
    const dy = p.y - st.last.y
    const dist = Math.hypot(dx, dy)
    const steps = Math.max(1, Math.floor(dist / 5))
    const pressure = Math.max(0, 1 - dist / 28)
    for (let i = 1; i <= steps; i++) {
      stamp(st.last.x + (dx * i) / steps, st.last.y + (dy * i) / steps, pressure)
    }
    st.last = p
  }

  const onUp = () => {
    stateRef.current.drawing = false
  }

  const wipe = () => {
    const canvas = canvasRef.current
    const st = stateRef.current
    st.drips = []
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    setDirty(false)
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className='fn-wall-canvas'
        aria-hidden='true'
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onPointerLeave={onUp}
      />
      <div className='fn-cans'>
        <span className='fn-cans-hint'>{labels.hint}</span>
        <div className='fn-cans-row' role='group' aria-label={labels.hint}>
          {CANS.map(c => (
            <button
              key={c.id}
              type='button'
              className='fn-can'
              style={{ '--can': `var(${c.token})` }}
              aria-pressed={can === c.id}
              aria-label={c.id}
              onClick={() => setCan(c.id)}>
              <i aria-hidden='true' />
            </button>
          ))}
          <button type='button' className='fn-can-wipe mono' onClick={wipe} disabled={!dirty}>
            {labels.wipe}
          </button>
        </div>
      </div>
    </>
  )
}

export default SprayWall
