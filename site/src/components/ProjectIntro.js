import React from "react"
import Transition from "./Transition"
import { delayUnmounting } from "../utils"

class ProjectIntro extends React.Component {
  render() {
    const { isOpen, onClose, title } = this.props

    return (
      <div className="ProjectIntro" onClick={() => onClose && onClose()}>
        <div
          className={
            isOpen ? "ProjectIntro-Overlay" : "ProjectIntro-Overlay Close"
          }
        />
        <div className="ProjectIntro-Button">
          <button>
            <img
              className="h-4 md:h-auto"
              src={require("../images/arrow-right.svg")}
              alt="Look"
            />
          </button>
        </div>
        <Transition id={isOpen} timeout={200}>
          {isOpen && <div className="ProjectIntro-Title">{title}</div>}
        </Transition>
      </div>
    )
  }
}

export default delayUnmounting(ProjectIntro)
