import React from "react"
import Transition from "./Transition"
// import { delayUnmounting } from "../utils"
import Img from "./ImageWithOrientation"

class Intro extends React.Component {
  render() {
    const { isOpen, onClose, title, fluid } = this.props

    return (
      <div className="Intro" onClick={() => onClose && onClose()}>
        <div className={isOpen ? "Intro-Overlay" : "Intro-Overlay Close"}>
          <Img
            className="w-screen h-screen"
            background="transparent"
            fluid={fluid}
            imgStyle={{
              objectFit: "cover",
            }}
          />
        </div>
        <Transition id={isOpen} timeout={200}>
          {isOpen && <div className="Intro-Title">{title}</div>}
        </Transition>
      </div>
    )
  }
}

// export default delayUnmounting(Intro)
export default Intro
