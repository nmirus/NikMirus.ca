import React, { useEffect } from "react"
import PropTypes from "prop-types"
import Modal from "react-modal"

import { vh, isClient } from "../utils"

import SiteContext, { SiteProvider } from "../context/SiteContext"

import Transition from "./Transition"
import Header from "./Header"

import "../styles/style.css"

Modal.setAppElement("#___gatsby")

const Layout = ({ children, headerVisible, location }) => {
  useEffect(() => {
    if (isClient) {
      window.addEventListener("resize", vh)
      vh()
    }

    return () => {
      if (isClient) {
        window.removeEventListener("resize", vh)
      }
    }
  })

  return (
    <SiteProvider>
      <SiteContext.Consumer>
        {({ setInfoVisibility, setIndexVisibility, titleVisible }) => (
          <Header
            onClick={() => {
              setInfoVisibility(false)
              setIndexVisibility(false)
            }}
            visible={titleVisible}
          />
        )}
      </SiteContext.Consumer>
      <div>
        <main>
          <Transition id={location.pathname} timeout={250}>
            {children}
          </Transition>
        </main>
        <footer />
      </div>
    </SiteProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
