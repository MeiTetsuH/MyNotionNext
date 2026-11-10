import React from 'react'

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

const DRIP =
  'M30 4A25 25 0 0 1 49 46V84a5 5 0 0 1-10 0V53q-4.5 1.5-9 1.5q-4 0-8-1.3V100a4.5 4.5 0 0 1-9 0V47A25 25 0 0 1 30 4Z'

/** Full stop of the wordmark: a fat dot of paint that has started to run. */
export const DripDot = ({ className = '' }) => (
  <Svg className={`fn-dripdot ${className}`} viewBox='0 0 66 116'>
    <path className='fn-dripdot-shadow' d={DRIP} transform='translate(7 7)' />
    <path d={DRIP} />
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
     
    />
  </Svg>
)

export const Arrow = ({ className = '' }) => (
  <Svg className={`fn-arrow ${className}`} viewBox='0 0 130 90'>
    <path d='M5 8C89 0 115 35 61 62M63 44L58 68 83 67' />
  </Svg>
)

export const Crown = ({ className = '' }) => (
  <Svg className={`fn-crown ${className}`} viewBox='0 0 64 44'>
    <path d='M5 38L9 9 21 27 32 5 43 27 55 9 59 38ZM7 30H57' />
  </Svg>
)

export const Burst = ({ className = '' }) => (
  <Svg className={`fn-burst ${className}`} viewBox='0 0 90 90'>
    <path d='M45 5L51 31 76 17 61 40 87 48 60 53 73 79 49 62 40 88 34 60 9 72 27 49 3 39 32 34Z' />
  </Svg>
)

export const Crosses = ({ className = '' }) => (
  <Svg className={`fn-crosses ${className}`} viewBox='0 0 120 40'>
    <path d='M6 8L30 32M30 8L6 32M48 8L72 32M72 8L48 32M90 8L114 32M114 8L90 32' />
  </Svg>
)

/** A loose ring, the kind drawn around something worth a second look. */
export const Ring = ({ className = '' }) => (
  <Svg className={`fn-ring ${className}`} viewBox='0 0 120 90' preserveAspectRatio='none'>
    <path pathLength='1' d='M18 46C14 20 52 6 84 12c28 6 34 34 18 54-16 20-62 22-82 2C10 58 12 42 30 30' />
  </Svg>
)

const BLOB =
  'M251.4 150.0C248.7 164.7 242.7 176.6 237.2 190.4C231.8 204.1 229.7 224.6 218.6 232.7C207.6 240.8 186.5 235.8 171.1 238.7C155.7 241.7 140.4 252.2 126.2 250.3C112.0 248.3 96.3 237.2 86.1 227.0C75.9 216.9 72.0 202.2 65.0 189.3C57.9 176.5 43.6 163.1 43.7 150.0C43.8 136.9 58.6 124.0 65.5 110.9C72.3 97.8 74.4 79.9 85.0 71.6C95.5 63.4 114.6 63.1 128.9 61.3C143.3 59.5 156.9 59.1 171.2 60.8C185.5 62.6 201.2 64.9 214.9 71.8C228.6 78.7 247.3 89.1 253.4 102.2C259.5 115.2 254.1 135.3 251.4 150.0Z'
const BLOB_MIST =
  'M227.5 231.1a4.8 4.8 0 1 0 9.6 0a4.8 4.8 0 1 0 -9.6 0M50.7 95.2a3.8 3.8 0 1 0 7.6 0a3.8 3.8 0 1 0 -7.6 0M36.5 235.4a1 1 0 1 0 2 0a1 1 0 1 0 -2 0M41.5 110.8a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M216.6 238.2a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0M27.1 101.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0M35.4 86.4a1.6 1.6 0 1 0 3.2 0a1.6 1.6 0 1 0 -3.2 0M255.79999999999998 226a2.4 2.4 0 1 0 4.8 0a2.4 2.4 0 1 0 -4.8 0M252.2 192.1a4.8 4.8 0 1 0 9.6 0a4.8 4.8 0 1 0 -9.6 0M16.3 123.4a1.9 1.9 0 1 0 3.8 0a1.9 1.9 0 1 0 -3.8 0M42.4 86.8a1.6 1.6 0 1 0 3.2 0a1.6 1.6 0 1 0 -3.2 0M149.1 264.1a2 2 0 1 0 4 0a2 2 0 1 0 -4 0M249.9 208.2a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M242.4 56.2a1.6 1.6 0 1 0 3.2 0a1.6 1.6 0 1 0 -3.2 0M60.60000000000001 80.1a3.8 3.8 0 1 0 7.6 0a3.8 3.8 0 1 0 -7.6 0M32.300000000000004 215.8a1.3 1.3 0 1 0 2.6 0a1.3 1.3 0 1 0 -2.6 0M258.7 100.2a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M260.59999999999997 209.5a1.6 1.6 0 1 0 3.2 0a1.6 1.6 0 1 0 -3.2 0M82.7 251.2a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M40.7 90.6a1 1 0 1 0 2 0a1 1 0 1 0 -2 0M263.7 107.7a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M270.29999999999995 202.8a1.6 1.6 0 1 0 3.2 0a1.6 1.6 0 1 0 -3.2 0M62.699999999999996 36.8a1.9 1.9 0 1 0 3.8 0a1.9 1.9 0 1 0 -3.8 0M119.10000000000001 268.3a4.8 4.8 0 1 0 9.6 0a4.8 4.8 0 1 0 -9.6 0M68.30000000000001 264.8a1.6 1.6 0 1 0 3.2 0a1.6 1.6 0 1 0 -3.2 0M203.6 247.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0M168.6 265.4a4.8 4.8 0 1 0 9.6 0a4.8 4.8 0 1 0 -9.6 0M148.8 271.3a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M255.4 209.8a2.4 2.4 0 1 0 4.8 0a2.4 2.4 0 1 0 -4.8 0M127.4 260.9a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M224.1 61.4a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M278.8 138.9a1.9 1.9 0 1 0 3.8 0a1.9 1.9 0 1 0 -3.8 0M257.2 120.3a2 2 0 1 0 4 0a2 2 0 1 0 -4 0M224.8 256.1a1 1 0 1 0 2 0a1 1 0 1 0 -2 0M20.9 162.1a1.6 1.6 0 1 0 3.2 0a1.6 1.6 0 1 0 -3.2 0M123.7 260.7a3.8 3.8 0 1 0 7.6 0a3.8 3.8 0 1 0 -7.6 0M62 243.2a1.3 1.3 0 1 0 2.6 0a1.3 1.3 0 1 0 -2.6 0M101.8 33.1a2.4 2.4 0 1 0 4.8 0a2.4 2.4 0 1 0 -4.8 0M73.19999999999999 39.9a1.9 1.9 0 1 0 3.8 0a1.9 1.9 0 1 0 -3.8 0M255.60000000000002 70.6a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M183 34.1a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M50.2 226.8a1.9 1.9 0 1 0 3.8 0a1.9 1.9 0 1 0 -3.8 0M250 192a2 2 0 1 0 4 0a2 2 0 1 0 -4 0M42.1 190.7a3.8 3.8 0 1 0 7.6 0a3.8 3.8 0 1 0 -7.6 0M250.2 185a2 2 0 1 0 4 0a2 2 0 1 0 -4 0M11 118a2.4 2.4 0 1 0 4.8 0a2.4 2.4 0 1 0 -4.8 0'

/** A cloud of sprayed colour to sit behind a print: a body and its overspray. */
export const SprayBlob = ({ className = '' }) => (
  <Svg className={`fn-blob ${className}`} viewBox='0 0 300 300'>
    <path d={BLOB} />
    <path d={BLOB_MIST} />
  </Svg>
)

export const Bolt = ({ className = '' }) => (
  <Svg className={`fn-bolt ${className}`} viewBox='0 0 40 70'>
    <path d='M26 3L6 38H19L13 67 35 28H22Z' />
  </Svg>
)
