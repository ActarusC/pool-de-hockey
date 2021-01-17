import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Pooler = ({ pageContext }) => (
  <Layout>
      <SEO title={pageContext.nom} />
      <p>La page de {pageContext.nom}</p>
  </Layout>
)

export default Pooler