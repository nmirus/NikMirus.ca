import React from "react"
import { default as GatsbyImg } from "gatsby-image"
import ErrorBoundary from "./ErrorBoundary"

// we only care about `aspectRatio`, the rest will be passed directly to `Img`
const Img = ({ className, ...rest }) => {
  const aspectRatio =
    (rest && rest.fluid && rest.fluid.aspectRatio) ||
    (rest && rest.fixed && rest.fixed.aspectRatio)
  let orientation
  if (aspectRatio >= 1.2) orientation = "landscape"
  if (aspectRatio <= 0.8) orientation = "portrait"
  if (aspectRatio > 0.8 && aspectRatio < 1.2) orientation = "square"

  return (
    <ErrorBoundary>
      <GatsbyImg className={`${orientation} ${className}`} {...rest} />
    </ErrorBoundary>
  )
}

export default Img
