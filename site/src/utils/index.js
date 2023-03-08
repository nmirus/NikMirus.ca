import useIntersect from "./useIntersect"
import debounce from "lodash/debounce"
import richTextRenderer from "./richTextRenderer"
import delayUnmounting from "./delayUmmounting"
import Storage from "./Storage"

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

const isClient =
  typeof window !== "undefined" && typeof document !== "undefined"

const isTouch =
  typeof document !== "undefined" && "ontouchstart" in document.documentElement

const vh = debounce(() => {
  if (isClient) {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty("--vh", `${vh}px`)
  }
}, 100)

export {
  isClient,
  isTouch,
  useIntersect,
  vh,
  getRandomArbitrary,
  richTextRenderer,
  delayUnmounting,
  Storage,
}
