import React, { Component } from "react"
import PropTypes from "prop-types"

// TODO: poster image
// TODO: gatsby-image poster

const isClient = typeof window !== "undefined"

// props sources format :
//
// const sources = {
//   1920: "",
//   1280: "",
//   960: "",
//   640: "",
// }

class InlineVideo extends Component {
  state = {
    playing: true,
  }

  constructor(props) {
    super(props)

    this.video = React.createRef()
    this.removeEventsOnUnmount = false
  }

  componentDidMount() {
    if (isClient && !this.isPlaying()) {
      window.addEventListener("touchstart", this.touchStart)
      this.removeEventsOnUnmount = true
    }
  }

  componentWillUnmount() {
    if (this.removeEventsOnUnmount) {
      window.removeEventListener("touchstart", this.touchStart)
    }
  }

  touchStart = () => {
    this.setState({ playing: false })

    this.video.current.addEventListener("playing", this.playing)
    this.video.current.addEventListener("play", this.playing)
    this.video.current.addEventListener("stop", this.stop)
    this.video.current.addEventListener("pause", this.stop)
    this.video.current.addEventListener("click", this.videoOnClick)
  }

  playing = e => {
    this.setState({ playing: true })
  }

  stop = e => {
    this.setState({ playing: false })
  }

  isPlaying = () =>
    this.video.current.currentTime > 0 &&
    !this.video.current.paused &&
    !this.video.current.ended &&
    this.video.current.readyState > 2

  buttonOnClick = e => {
    e.stopPropagation()
    this.video.current.play()
  }

  videoOnClick = e => {
    e.stopPropagation()

    if (this.isPlaying()) {
      this.video.current.pause()
    } else {
      this.video.current.play()
    }
  }

  determineVideoSrc = () => {
    if (typeof this.props.sources === "string") {
      return this.props.sources
    }

    const wIW = isClient ? window.innerWidth : 0
    const keys = Object.keys(this.props.sources).sort((a, b) => b - a)
    let src = this.props.sources[keys[keys.length - 1]]

    keys.map(key => {
      if (wIW <= key) {
        src = this.props.sources[key]
      }
    })
    return src
  }

  render() {
    const { autoplay, videoStyle, button } = this.props

    return (
      <div className='InlineVideo'>
        <video
          className='InlineVideo-Video'
          ref={this.video}
          playsInline
          autoPlay={autoplay}
          loop
          muted
          style={videoStyle}
        >
          <source src={this.determineVideoSrc()} type='video/mp4' />
        </video>
        {!this.state.playing && button && (
          <button className='InlineVideo-Button' onClick={this.buttonOnClick}>
            Play
          </button>
        )}
      </div>
    )
  }
}

InlineVideo.defaultProps = {
  autoplay: true,
  button: true,
  videoStyle: {},
}

InlineVideo.propTypes = {
  autoplay: PropTypes.bool,
  // sources: PropTypes.object.isRequired,
}

export default InlineVideo
