import React from "react"
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

// https://github.com/contentful/rich-text/tree/master/packages/rich-text-react-renderer

// \n => <br/> https://github.com/contentful/rich-text/issues/96#issuecomment-511100434

const Bold = ({ children }) => <span className="bold">{children}</span>

// eslint-disable-next-line
const Text = ({ children }) => <p>{children}</p>

const Hyperlink = ({ node: { data }, children }) => (
  <a className="" href={data.uri} rel="noopener noreferrer" target="_blank">
    {children}
  </a>
)

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    // eslint-disable-next-line
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [INLINES.HYPERLINK]: (node, children) => (
      <Hyperlink node={node}>{children}</Hyperlink>
    ),
  },
  renderText: text =>
    text.split("\n").flatMap((text, i) => [i > 0 && <br />, text]),
}

export default json => documentToReactComponents(json, options)
