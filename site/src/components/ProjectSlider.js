import React, { Component } from "react"
import Slider from "react-slick"
import Img from "../components/ImageWithOrientation"
import VimeoEmbed from "../components/VimeoEmbed"
import { richTextRenderer } from "../utils"

const SliderContext = React.createContext({
  slickGoTo: () => {},
})

class SliderProvider extends Component {
  constructor(props) {
    super(props)

    this.ref = React.createRef()
  }

  slickGoTo = index => {
    this.ref.current.slickGoTo(index)
  }

  render() {
    return (
      <SliderContext.Provider
        value={{
          slickGoTo: this.slickGoTo,
          ref: this.ref,
        }}
      >
        {this.props.children}
      </SliderContext.Provider>
    )
  }
}

class ProjectSlider extends Component {
  render() {
    const { slides, initialSlide } = this.props

    const settings = {
      dots: false,
      infinite: false,
      autoplay: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      initialSlide,
      fade: true,
      afterChange: next => this.props.setSlideIndex(next),
    }

    return (
      <SliderContext.Consumer>
        {({ ref }) => (
          <div className="h-screen w-screen fixed inset-0 pointer-events-none">
            <Slider {...settings} ref={ref}>
              {slides &&
                slides.map((slide, index) => {
                  switch (slide.__typename) {
                    case "ContentfulSlideVideo":
                      return (
                        <React.Fragment key={index}>
                          <div className="h-screen w-screen flex justify-center items-center">
                            {/* <div style={{ width: "80vmin", height: "80vmin" }}> */}
                            <div className="w-4/6 h-full">
                              <VimeoEmbed videoId={slide.vimeo} />
                            </div>
                          </div>
                        </React.Fragment>
                      )

                    case "ContentfulSlideImage":
                      return (
                        <React.Fragment key={index}>
                          <div className="h-screen w-screen flex justify-center items-center">
                            <Img
                              className="ProjectImage"
                              backgroundColor="transparent"
                              fluid={
                                slide.image.localFile.childImageSharp &&
                                slide.image.localFile.childImageSharp.fluid
                              }
                            />
                          </div>
                        </React.Fragment>
                      )

                    case "ContentfulSlideText":
                      return (
                        <React.Fragment key={index}>
                          <div className="h-screen w-screen flex justify-center items-center text-center">
                            <div
                              style={{
                                maxWidth: "95vmin",
                                maxHeight: "95vmin",
                              }}
                            >
                              {richTextRenderer(slide.content.json)}
                            </div>
                          </div>
                        </React.Fragment>
                      )

                    default:
                      console.log("I am so sorry")
                      return null
                  }
                })}
            </Slider>
          </div>
        )}
      </SliderContext.Consumer>
    )
  }
}

export default ProjectSlider
export { SliderContext, SliderProvider }
