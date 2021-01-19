import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Pooler = ({ pageContext }) => (
  <Layout>
      <SEO title={pageContext.Equipe} />
      <h1>{pageContext.Equipe}</h1>
      <p>Dirigée par <b>{pageContext.nom}</b> </p>
  </Layout>
)

export default Pooler