import React from 'react'

/**
 * Wraps a cover image in a shared risograph treatment (soft tint + halftone)
 * so AI illustrations and real photos read as one printed series.
 * Hovering the parent card reveals the original colours.
 */
export const RisoCover = ({ className = '', frameClassName = '', ...imgProps }) => (
  <span className={`riso-cover ${frameClassName}`}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img className={className} {...imgProps} />
  </span>
)

export default RisoCover
