import React from "react"
import Layout from "./src/components/layout"

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<div id="header" />)
}

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
