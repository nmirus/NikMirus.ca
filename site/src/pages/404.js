import React from "react"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <div className="h-screen w-screen fixed inset-0 flex flex-col justify-center items-center text-center">
      <h1>404: NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  </>
)

export default NotFoundPage
