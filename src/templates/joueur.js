import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Joueur = ({ pageContext }) => (
  <Layout>
      <SEO title={pageContext.nom} />
      <h1>{pageContext.nom}</h1>
      <p>Position <b>{pageContext.position}</b> </p>
  </Layout>
)

export default Joueur