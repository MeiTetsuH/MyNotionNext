import React from 'react'

const WORDS = [
  'SMALL TOOLS',
  'BIG CURIOSITY',
  'EVERYDAY FRAGMENTS',
  'ALWAYS TINKERING'
]

const Run = () => (
  <span className='fn-tape-run'>
    {WORDS.map(word => (
      <React.Fragment key={word}>
        <span>{word}</span>
        <i>✳</i>
      </React.Fragment>
    ))}
  </span>
)

const Tape = ({ tone }) => (
  <div className={`fn-tape fn-tape--${tone}`}>
    <div className='fn-tape-move'>
      <Run />
      <Run />
      <Run />
      <Run />
    </div>
  </div>
)

/** Two lengths of barrier tape pulled across the page where the hero ends. */
export const Ticker = () => (
  <div className='fn-tapes' aria-hidden='true'>
    <Tape tone='ink' />
    <Tape tone='acid' />
  </div>
)

export default Ticker
