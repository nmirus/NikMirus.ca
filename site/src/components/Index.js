import React, { useContext } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"
import Modal from "react-modal"
import { navigate } from "@reach/router"
import get from "lodash/get"
import SiteContext from "../context/SiteContext"
import { SliderContext } from "./ProjectSlider"
import Transition from "./Transition"

const IndexImages = ({ onClick, current, setSlideIndex }) => {
  const data = useStaticQuery(graphql`
    query IndexPanel {
      contentfulHome(slug: { eq: "index" }) {
        projects {
          project {
            title
            slug
            slides {
              __typename
              ... on ContentfulSlideVideo {
                posterImage {
                  localFile {
                    childImageSharp {
                      fixed(width: 500, quality: 80) {
                        ...GatsbyImageSharpFixed_withWebp_noBase64
                      }
                    }
                  }
                }
              }
              ... on ContentfulSlideImage {
                image {
                  localFile {
                    childImageSharp {
                      fixed(width: 500, quality: 80) {
                        ...GatsbyImageSharpFixed_withWebp_noBase64
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const { changeTitle, resetTitle } = useContext(SiteContext)

  return data.contentfulHome.projects.map(({ project: p }) => {
    if (!p.slides) {
      return null
    }

    return (
      <>
        <div
          id={p.slug}
          className="flex flex-row flex-wrap justify-start pt-2 md:pt-4"
          key={p.slug}
          onMouseEnter={() => changeTitle(p.title)}
          onMouseLeave={() => resetTitle()}
        >
          {p.slides.map((i, index) => {
            const { slickGoTo } = useContext(SliderContext)

            let image

            switch (i.__typename) {
              case "ContentfulSlideVideo":
                image = i.posterImage
                break
              case "ContentfulSlideImage":
                image = i.image
                break
              default:
                return null
            }

            if (!image) {
              return null
            }

            return (
              <div
                className="w-1/2 md:w-1/4 relative"
                key={`${get(
                  image,
                  "localFile.childImageSharp.fixed.src",
                  ""
                )}-${index}`}
              >
                <div style={{ paddingBottom: "100%" }} />
                <Link
                  to={`/${p.slug}`}
                  state={{
                    intro: true,
                    slide: index,
                  }}
                  onClick={e => {
                    if (current === p.slug) {
                      e.preventDefault()
                      slickGoTo(index)
                    }
                    onClick && onClick()
                  }}
                >
                  <div className="absolute inset-0 w-full h-full flex justify-center items-center pt-4 md:pt-8 px-2 md:px-4">
                    {image.localFile.childImageSharp && (
                      <Img
                        className="w-auto h-auto max-h-full max-w-full"
                        imgStyle={{ objectFit: "contain" }}
                        fixed={image.localFile.childImageSharp.fixed}
                      />
                    )}
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
        <div className="h-6 md:h-12" />
      </>
    )
  })
}

export default ({ current, setSlideIndex }) => {
  const {
    indexVisible,
    infoVisible,
    setIndexVisibility,
    setInfoVisibility,
    resetTitle,
  } = useContext(SiteContext)

  return (
    <>
      <div className="index-button">
        <Transition id={!infoVisible && !indexVisible} timeout={250}>
          {!infoVisible && !indexVisible && (
            <button
              onClick={() => {
                setIndexVisibility(true)
                setInfoVisibility(false)
              }}
            >
              {/* Index */}
              <img
                className="block h-4 md:h-auto"
                src={require("../images/grid.svg")}
                alt="Close"
              />
            </button>
          )}
        </Transition>
      </div>
      <Modal
        isOpen={indexVisible}
        onRequestClose={() => {
          setIndexVisibility(false)
          resetTitle()
        }}
        className="ContentIndex"
        overlayClassName="OverlayIndex"
        closeTimeoutMS={350}
        shouldCloseOnOverlayClick={false}
        onAfterOpen={() => navigate(`#${current}`)}
      >
        <div className="relative">
          <IndexImages
            onClick={() => setIndexVisibility(false)}
            setSlideIndex={setSlideIndex}
            current={current}
          />
          <button
            className="fixed right-0 top-0 p-4 md:p-5"
            onClick={() => {
              setIndexVisibility(false)
              resetTitle()
            }}
          >
            <img
              className="h-5 md:h-auto"
              src={require("../images/arrow-up.svg")}
              alt="Close"
            />
          </button>
        </div>
      </Modal>
    </>
  )
}
