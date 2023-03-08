import React, { useState, useContext, useEffect } from "react"
import { graphql, Link } from "gatsby"

import { richTextRenderer } from "../utils"
import SiteContext from "../context/SiteContext"
import SEO from "../components/seo"
import ProjectSlider, { SliderProvider } from "../components/ProjectSlider"
import ProjectIntro from "../components/ProjectIntro"
import Info from "../components/Info"
import Index from "../components/Index"
import Helmet from "react-helmet"
import get from "lodash/get"

const ProjectTemplate = ({ location, data, pageContext }) => {
  const totalSlides = data.contentfulProject.slides
    ? data.contentfulProject.slides.length
    : 0

  // détermine si la diapo initale est autre que la première (0)
  let initialSlide = 0
  initialSlide =
    location.state && location.state.last ? totalSlides - 1 : initialSlide
  initialSlide =
    location.state && location.state.slide ? location.state.slide : initialSlide
  const [slideIndex, setSlideIndex] = useState(initialSlide)

  const initialIntroVisibility =
    location.state && location.state.intro ? location.state.intro : true
  const [intro, setIntro] = useState(initialIntroVisibility)
  const [rendered, hasRendered] = useState(!initialIntroVisibility)
  const { setRootTitle, setTitleVisibility } = useContext(SiteContext)

  useEffect(() => {
    setRootTitle(data.contentfulProject.title)
    setTitleVisibility(rendered)
    hasRendered(true)

    return () => {}
  }, [data.contentfulProject.title])

  const fadeOutIntro = () => {
    setIntro(false)
    setTitleVisibility(true)
  }

  const [moving, isMoving] = useState(false)
  const mouseMove = () => {
    if (moving) {
      return
    }
    isMoving(true)
    setTimeout(() => isMoving(false), 250)
  }

  return (
    <div onMouseMove={mouseMove}>
      <SEO
        title={data.contentfulProject.title}
        description={data.contentfulProject.description}
        ogImage={get(
          data,
          "contentfulProject.featuredImage.localFile.childImageSharp.fixed.src",
          false
        )}
      />
      <SliderProvider>
        <ProjectIntro
          isOpen={intro}
          isMounted={intro}
          delayTime={550}
          onClose={fadeOutIntro}
          title={data.contentfulProject.title}
        />
        <div className="ProjectNavWrapper">
          {slideIndex === totalSlides - 1 && (
            <Link
              to={`/${pageContext.next.slug}`}
              className="ProjectNav ProjectNav-Next"
              state={{ last: false, intro: true }}
            >
              <img
                className="h-4 md:h-3"
                src={require("../images/arrow-right.svg")}
                alt="Next Project"
              />
            </Link>
          )}

          {slideIndex === 0 && (
            <Link
              to={`/${pageContext.prev.slug}`}
              className="ProjectNav ProjectNav-Prev"
              state={{ last: true, intro: true }}
            >
              <img
                className="h-4 md:h-3"
                src={require("../images/arrow-left.svg")}
                alt="Previous Project"
              />
            </Link>
          )}
        </div>
        <ProjectSlider
          slides={data.contentfulProject.slides}
          setSlideIndex={setSlideIndex}
          initialSlide={slideIndex}
        />
        <Index
          current={data.contentfulProject.slug}
          setSlideIndex={setSlideIndex}
        />
        {data.contentfulProject.infoCopy &&
          data.contentfulProject.infoCopy.json && (
            <Info title={data.contentfulProject.title}>
              <div>
                {richTextRenderer(data.contentfulProject.infoCopy.json)}
              </div>
            </Info>
          )}
        <div className="ProjectCounter">
          {slideIndex + 1}/{totalSlides}
        </div>
      </SliderProvider>
      <Helmet>
        {!moving && (
          <body
            data-info-disabled
            data-index-disabled
            data-counter-disabled
            data-arrows-disabled
          />
        )}
      </Helmet>
    </div>
  )
}

export const pageQuery = graphql`
  query ProjectBySlug($slug: String!) {
    contentfulProject(slug: { eq: $slug }) {
      title
      slug
      description
      featuredImage {
        localFile {
          childImageSharp {
            fluid(maxWidth: 1500, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
            fixed(width: 1080, quality: 90) {
              src
            }
          }
        }
      }
      slides {
        __typename
        ... on ContentfulSlideVideo {
          vimeo
          posterImage {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1500, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
        }
        ... on ContentfulSlideImage {
          image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1500, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
        }
        # ... on ContentfulSlideText {
        #   content {
        #     json
        #   }
        # }
      }
      infoCopy {
        json
      }
    }
  }
`

export default ProjectTemplate
