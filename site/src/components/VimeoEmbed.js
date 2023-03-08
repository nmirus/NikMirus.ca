import React, { Component } from "react"

export default class VimeoEmbed extends Component {
  static defaultProps = {
    playerOptions: { autoplay: 0 },
  }

  getIframeUrl = () => {
    const { videoId } = this.props
    const query = this.getIframeUrlQuery()
    return `//player.vimeo.com/video/${videoId}?${query}`
  }

  getIframeUrlQuery = () => {
    let str = []
    Object.keys(this.props.playerOptions).forEach(key => {
      str.push(`${key}=${this.props.playerOptions[key]}`)
    })

    return str.join("&")
  }

  render() {
    return (
      <div className="vimeo-embed w-full h-full">
        <iframe
          title={this.getIframeUrl()}
          frameBorder="0"
          className="w-full h-full pointer-events-auto z-50"
          src={this.getIframeUrl()}
        />
      </div>
    )
  }
}
