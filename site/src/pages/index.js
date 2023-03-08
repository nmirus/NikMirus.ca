import React, { useContext, useEffect, useState } from "react"
import { graphql } from "gatsby"
import Helmet from "react-helmet"
import get from "lodash/get"
import classNames from "classnames"

import { richTextRenderer, getRandomArbitrary, isClient } from "../utils"
import SiteContext from "../context/SiteContext"
import SEO from "../components/seo"
import Carnet from "../components/Carnet"
import Featured from "../components/Featured"
import Info from "../components/Info"
import { default as IndexComponent } from "../components/Index"
import Intro from "../components/Intro"

const RIGHT = false
const LEFT = true

const ALIGNMENT = {
  LEFT: "LEFT",
  CENTER: "CENTER",
  RIGHT: "RIGHT",
}

const SIZE = {
  SM: "SM",
  MD: "MD",
  LG: "LG",
}

const alignmentClass = alignment => ({
  "self-center": alignment === null || alignment[0] === ALIGNMENT.CENTER,
  "self-start": alignment && alignment[0] === ALIGNMENT.LEFT,
  "self-end": alignment && alignment[0] === ALIGNMENT.RIGHT,
})

const sizeClass = size => ({
  "w-5/6": size === null || size[0] === SIZE.MD,
  "w-2/3": size && size[0] === SIZE.SM,
  "w-full": size && size[0] === SIZE.LG,
})

const MOBILE_WIDTH = 768

const cbk = toggle => {
  if (isClient && window.innerWidth < 575) {
    toggle && toggle(true)
  } else {
    toggle && toggle(false)
  }
}

let imageIndex = false

const getRandImage = images => {
  const length = images && images.length

  if (!length) {
    return false
  }

  if (!imageIndex) {
    imageIndex = getRandomArbitrary(0, length - 1)
  }

  return get(images, `${imageIndex}.localFile.childImageSharp.fluid`, null)
}

const IndexPage = ({ data }) => {
  const { introVisible, setIntroVisibility } = useContext(SiteContext)
  const [mobile, setMobile] = useState(false)
  const [active, setActive] = useState(false)

  const introImage = introVisible
    ? getRandImage(data.contentfulHome.introImages)
    : false

  useEffect(() => {
    const callback = () => cbk(setMobile)

    if (isClient) {
      window.addEventListener("resize", callback)
    }

    if (!mobile && isClient && window.innerWidth < MOBILE_WIDTH) {
      setMobile(true)
    }

    return () => {
      window.removeEventListener("resize", callback)
    }
  })

  const fadeOutIntro = () => {
    setIntroVisibility(false)
  }

  const right = data.contentfulHome.projects.filter(
    p => p.rightOrLeft === RIGHT
  )
  const left = data.contentfulHome.projects.filter(p => p.rightOrLeft === LEFT)

  return (
    <>
      <SEO
        title={data.contentfulHome.title}
        description={data.contentfulHome.description}
        ogImage={get(
          data,
          "contentfulHome.featuredImage.localFile.childImageSharp.fixed.src",
          false
        )}
      />
      {mobile && (
        <div>
          {data.contentfulHome.projects.map(({ project, size, alignment }) => (
            <div
              className={classNames(
                `px-3 mb-24 mx-auto`,
                alignmentClass(ALIGNMENT.CENTER),
                sizeClass(size)
              )}
              key={project.slug}
            >
              <Featured
                disabled={active !== false && active !== project.slug}
                project={project}
                setActive={setActive}
                size={size}
                alignment={"center"}
              />
            </div>
          ))}
        </div>
      )}
      {!mobile && (
        <Carnet
          leftChildren={left.map(({ project, size, alignment }) => (
            <div
              className={classNames(
                `px-6 mb-16`,
                alignmentClass(alignment),
                sizeClass(size)
              )}
              key={project.slug}
            >
              <Featured
                disabled={active !== false && active !== project.slug}
                project={project}
                setActive={setActive}
                size={size}
                alignment={alignment}
              />
            </div>
          ))}
          rightChildren={right.map(({ project, size, alignment }) => (
            <div
              className={classNames(
                `px-6 mb-16`,
                alignmentClass(alignment),
                sizeClass(size)
              )}
              key={project.slug}
            >
              <Featured
                disabled={active !== false && active !== project.slug}
                project={project}
                setActive={setActive}
              />
            </div>
          ))}
        />
      )}
      <Helmet>
        {active !== false && <body data-info-disabled data-index-disabled />}
      </Helmet>
      <IndexComponent />
      <Info title={data.contentfulHome.title}>
        <div className="md:flex md:flex-row md:justify-start">
          <div className="w-full md:w-1/2 md:mr-16">
            {richTextRenderer(data.contentfulHome.infoCopy.json)}
          </div>
          <div className="w-full mt-6 md:mt-0 md:w-1/3">
            {richTextRenderer(data.contentfulHome.infoContact.json)}
          </div>
        </div>
      </Info>
    </>
  )
}

export const pageQuery = graphql`
  query Index {
    contentfulHome(slug: { eq: "index" }) {
      title
      slug
      description
      featuredImage {
        localFile {
          childImageSharp {
            fluid(maxWidth: 1000, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
            fixed(width: 1080, quality: 90) {
              src
            }
          }
        }
      }
      projects {
        rightOrLeft
        alignment
        size
        project {
          title
          slug
          featuredImage {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1000, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
            file {
              contentType
              url
            }
          }
          featuredMedia {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1000, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
            file {
              contentType
              url
            }
          }
        }
      }
      infoCopy {
        json
      }
      infoContact {
        json
      }
      introText {
        json
      }
      # introImage {
      #   localFile {
      #     childImageSharp {
      #       fluid(maxWidth: 1500) {
      #         ...GatsbyImageSharpFluid_withWebp_noBase64
      #       }
      #     }
      #   }
      # }
      introImages {
        localFile {
          childImageSharp {
            fluid(maxWidth: 2500, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
    }
    site: contentfulResourceSet(name: { eq: "site" }) {
      resources {
        value
        key
      }
    }
  }
`

export default IndexPage
