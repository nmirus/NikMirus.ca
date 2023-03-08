import React from "react"
import Modal from "react-modal"

import SiteContext from "../context/SiteContext"

export default ({ children, title }) => (
  <div>
    <SiteContext.Consumer>
      {({
        changeTitle,
        setIndexVisibility,
        setInfoVisibility,
        indexVisible,
        infoVisible,
      }) => {
        if (indexVisible || infoVisible) {
          return null
        }

        return (
          <div className="info-button">
            <button
              onClick={() => {
                setInfoVisibility(true)
                setIndexVisibility(false)
                changeTitle(title)
              }}
            >
              Info
            </button>
          </div>
        )
      }}
    </SiteContext.Consumer>
    <SiteContext.Consumer>
      {({ resetTitle, setInfoVisibility, infoVisible }) => (
        <Modal
          isOpen={infoVisible}
          onRequestClose={() => {
            setInfoVisibility(false)
            resetTitle()
          }}
          className="ContentInfo"
          overlayClassName="OverlayInfo"
          closeTimeoutMS={350}
          shouldCloseOnOverlayClick={false}
        >
          <div className="py-12">
            {children && children}
            <button
              className="fixed left-0 bottom-0 py-4 px-4 md:px-5"
              onClick={() => {
                setInfoVisibility(false)
                resetTitle()
              }}
            >
              <img
                className="h-5 md:h-auto"
                src={require("../images/arrow-down.svg")}
                alt="Close"
              />
            </button>
          </div>
        </Modal>
      )}
    </SiteContext.Consumer>
  </div>
)
