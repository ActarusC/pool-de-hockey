import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Accueil" />
    <h1>Pool de hockey</h1>
    <p>Site en construction</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <p><Link to="/poolers">Les poolers</Link></p>
    <p><Link to="/doc">Voir la doc</Link></p> 
    
  </Layout>
)

export default IndexPage
