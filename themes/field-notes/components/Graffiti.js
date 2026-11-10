import React from 'react'

/**
 * Shared SVG filters. Mounted once in the layout; referenced by id.
 *  - fn-rough: wobbles an edge so a stroke reads as marker, not vector
 *  - fn-spray: the same wobble plus a speckled halo of overspray
 */
export const GraffitiDefs = () => (
  <svg
    className='fn-defs'
    width='0'
    height='0'
    aria-hidden='true'
    focusable='false'
    style={{ position: 'absolute' }}>
    <defs>
      <filter id='fn-rough' x='-5%' y='-20%' width='110%' height='140%'>
        <feTurbulence type='fractalNoise' baseFrequency='0.045' numOctaves='2' seed='4' result='n' />
        <feDisplacementMap in='SourceGraphic' in2='n' scale='5' xChannelSelector='R' yChannelSelector='G' />
      </filter>
      <filter id='fn-spray' x='-25%' y='-25%' width='150%' height='150%'>
        <feTurbulence type='fractalNoise' baseFrequency='0.035' numOctaves='2' seed='9' result='wob' />
        <feDisplacementMap in='SourceGraphic' in2='wob' scale='9' xChannelSelector='R' yChannelSelector='G' result='body' />
        <feGaussianBlur in='SourceGraphic' stdDeviation='9' result='halo' />
        <feTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='1' seed='21' result='grain' />
        <feColorMatrix
          in='grain'
          type='matrix'
          values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 11 -6.1'
          result='specks'
        />
        <feComposite in='halo' in2='specks' operator='in' result='mist' />
        <feMerge>
          <feMergeNode in='mist' />
          <feMergeNode in='body' />
        </feMerge>
      </filter>
    </defs>
  </svg>
)

const Svg = ({ className = '', viewBox, children, ...rest }) => (
  <svg
    className={`fn-doodle ${className}`}
    viewBox={viewBox}
    aria-hidden='true'
    focusable='false'
    {...rest}>
    {children}
  </svg>
)

/** Full stop of the wordmark: a fat dot of paint that has started to run. */
export const DripDot = ({ className = '' }) => (
  <Svg className={`fn-dripdot ${className}`} viewBox='0 0 60 110'>
    <path d='M30 4A25 25 0 0 1 49 46V84a5 5 0 0 1-10 0V53q-4.5 1.5-9 1.5q-4 0-8-1.3V100a4.5 4.5 0 0 1-9 0V47A25 25 0 0 1 30 4Z' />
  </Svg>
)

/** Runs of paint hanging off the bottom edge of a block. */
export const Drips = ({ className = '' }) => (
  <Svg className={`fn-drips ${className}`} viewBox='0 0 400 90' preserveAspectRatio='none'>
    <path d='M0 0H400V8H372V30a7 7 0 0 1-14 0V8H300V58a8 8 0 0 1-16 0V8H214V22a6 6 0 0 1-12 0V8H128V74a9 9 0 0 1-18 0V8H62V38a7 7 0 0 1-14 0V8H0Z' />
  </Svg>
)

/** Two passes of a marker under a word. */
export const Scribble = ({ className = '' }) => (
  <Svg className={`fn-scribble ${className}`} viewBox='0 0 240 34' preserveAspectRatio='none'>
    <path
      d='M4 15C44 5 82 23 122 11S202 5 236 15M22 27C72 17 152 31 222 21'
      filter='url(#fn-rough)'
    />
  </Svg>
)

export const Arrow = ({ className = '' }) => (
  <Svg className={`fn-arrow ${className}`} viewBox='0 0 130 90'>
    <path d='M5 8C89 0 115 35 61 62M63 44L58 68 83 67' filter='url(#fn-rough)' />
  </Svg>
)

export const Crown = ({ className = '' }) => (
  <Svg className={`fn-crown ${className}`} viewBox='0 0 64 44'>
    <path d='M5 38L9 9 21 27 32 5 43 27 55 9 59 38ZM7 30H57' filter='url(#fn-rough)' />
  </Svg>
)

export const Burst = ({ className = '' }) => (
  <Svg className={`fn-burst ${className}`} viewBox='0 0 90 90'>
    <path d='M45 5L51 31 76 17 61 40 87 48 60 53 73 79 49 62 40 88 34 60 9 72 27 49 3 39 32 34Z' />
  </Svg>
)

export const Crosses = ({ className = '' }) => (
  <Svg className={`fn-crosses ${className}`} viewBox='0 0 120 40'>
    <path d='M6 8L30 32M30 8L6 32M48 8L72 32M72 8L48 32M90 8L114 32M114 8L90 32' filter='url(#fn-rough)' />
  </Svg>
)

/** A loose ring, the kind drawn around something worth a second look. */
export const Ring = ({ className = '' }) => (
  <Svg className={`fn-ring ${className}`} viewBox='0 0 120 90' preserveAspectRatio='none'>
    <path pathLength='1' d='M18 46C14 20 52 6 84 12c28 6 34 34 18 54-16 20-62 22-82 2C10 58 12 42 30 30' />
  </Svg>
)

/** A cloud of sprayed colour to sit behind a print. */
export const SprayBlob = ({ className = '' }) => (
  <Svg className={`fn-blob ${className}`} viewBox='0 0 300 300'>
    <path
      d='M150 46c58-8 104 34 104 92 0 62-44 112-110 110-60-2-102-44-100-104 2-52 48-92 106-98Z'
      filter='url(#fn-spray)'
    />
  </Svg>
)

export const Bolt = ({ className = '' }) => (
  <Svg className={`fn-bolt ${className}`} viewBox='0 0 40 70'>
    <path d='M26 3L6 38H19L13 67 35 28H22Z' />
  </Svg>
)
