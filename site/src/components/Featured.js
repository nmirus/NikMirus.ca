import React, { useContext } from "react"
import { Link } from "gatsby"
import get from "lodash/get"
import SiteContext from "../context/SiteContext"
import Img from "./ImageWithOrientation"
import InlineVideo from "croustille-inline-video/index.js"

export default ({ project, setActive, disabled }) => {
  const { changeTitle, resetTitle } = useContext(SiteContext)
  const title = project.title
  const slug = project.slug

  const featuredImageFluid = get(
    project,
    "featuredImage.localFile.childImageSharp.fluid",
    false
  )
  const featuredMediaFluid = get(
    project,
    "featuredMedia.localFile.childImageSharp.fluid",
    false
  )
  const fluid = featuredMediaFluid || featuredImageFluid
  const media = get(project, "featuredMedia.file", false)
  const src =
    get(project, "featuredMedia.file.contentType", false) === "image/gif"
      ? get(project, "featuredMedia.file.url")
      : false

  return (
    <div disabled={disabled} className="featured-thumbnail">
      <div className="w-full relative my-12">
        <div className="md:pb-full" />
        <Link
          className="block md:absolute md:inset-0 w-fullmd:h-full flex justify-center items-center items-center"
          to={`/${slug}`}
          onMouseEnter={() => {
            changeTitle(title)
            setActive(slug)
          }}
          onMouseLeave={() => {
            resetTitle()
            setActive(false)
          }}
        >
          {media && media.contentType === "video/mp4" ? (
            <InlineVideo button={false} autoplay={true} sources={media.url} />
          ) : src ? (
            <img src={src} alt={title} />
          ) : (
            <Img
              fluid={fluid}
              imgStyle={{ objectFit: "contain" }}
              className="flex-grow"
              backgroundColor="transparent"
              style={{ maxHeight: "100%" }}
            />
          )}
        </Link>
      </div>
    </div>
  )
}
