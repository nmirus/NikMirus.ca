import React, { useRef, useEffect } from "react"
import { useIntersect, isClient } from "../utils"
import Helmet from "react-helmet"

let interval = null
let last_known_scroll_position = 0
let ticking = false
let window_innerHeight = null
let left_height = null
let right_height = null

export default ({ leftChildren, rightChildren, footer }) => {
  const left = useRef()
  const right = useRef()
  const rightInner = useRef()
  const [panels, panelsEntry] = useIntersect({ threshold: 0 })
  const [panelsBottom, panelsBottomEntry] = useIntersect({ threshold: 0 })

  const onResize = () => {
    window_innerHeight = window.innerHeight
    left_height = left.current.offsetHeight
    right_height = rightInner.current.offsetHeight
  }

  const handler = () => {
    last_known_scroll_position = -1 * left.current.getBoundingClientRect().top

    if (!ticking) {
      window.requestAnimationFrame(() => {
        syncScroll(last_known_scroll_position)
        ticking = false
      })

      ticking = true
    }
  }

  const handleScroll = handler

  const syncScroll = scroll_pos => {
    const scroll_percent = scroll_pos / (left_height - window_innerHeight)
    const right_scroll_pos =
      (right_height - window_innerHeight) * scroll_percent

    if (right.current && typeof right.current.scrollTop !== "undefined") {
      right.current.scrollTop = right_scroll_pos
    }
  }

  useEffect(() => {
    if (isClient) {
      window.addEventListener("resize", onResize)
      onResize()

      interval = setInterval(() => {
        if (panelsEntry.isIntersecting && !panelsBottomEntry.isIntersecting) {
          handleScroll()
        }
      }, 10)
    }

    return () => {
      if (isClient) {
        window.removeEventListener("resize", onResize)
        clearInterval(interval)
      }
    }
  })

  return (
    <div className="carnet">
      <Helmet htmlAttributes={{ carnet: true }} />
      <div className="carnet__panels" ref={panels}>
        <div className="carnet__left" ref={left}>
          <div className="carnet-left">{leftChildren}</div>
        </div>
        <div className="carnet__right" ref={right}>
          <div className="carnet-right" ref={rightInner}>
            {rightChildren}
          </div>
        </div>
        <div
          className="carnet__bottom text-center w-screen text-sm h-px overflow-hidden"
          ref={panelsBottom}
        >
          <span role="img" aria-label="observer">
            🦟
          </span>
        </div>
      </div>
      {footer && <footer className="carnet__footer">{footer}</footer>}
    </div>
  )
}
