import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import AllPoolers from "../components/allPoolers"

const IndexPage = () => (
  <Layout>
    <SEO title="Accueil" />
    <p>Site en construction</p>
    <div style={{ maxWidth: `200px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <AllPoolers />
    
  </Layout>
)

export default IndexPage
