import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"

import SiteContext from "../context/SiteContext"

import HeaderPortal from "./HeaderPortal"
import Transition from "./Transition"

const Header = ({ onClick, visible }) => {
  const [hover, setHover] = useState(false)

  return (
    <HeaderPortal>
      <SiteContext.Consumer>
        {({ title, hoverTitle, resetTitle }) => {
          const t = hover ? hoverTitle : title

          return (
            <header
              className="header"
              onMouseEnter={() => setHover(true)}
              onMouseOut={() => setHover(false)}
            >
              <h1>
                {visible && (
                  <Link
                    to="/"
                    onClick={() => {
                      onClick && resetTitle() && onClick()
                    }}
                    className="pointer-events-auto"
                  >
                    <Transition id={t} timeout={125} exitTimeout={0}>
                      {t}
                    </Transition>
                  </Link>
                )}
              </h1>
            </header>
          )
        }}
      </SiteContext.Consumer>
    </HeaderPortal>
  )
}

Header.propTypes = {
  onClick: PropTypes.func,
}

Header.defaultProps = {
  onClick: () => {},
  visible: true,
}

export default Header
