import React from "react"
//import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Poolers from "../components/poolers"

const IndexPage = () => (
  <Layout>
    <SEO title="Accueil" />
    <div style={{ maxWidth: `200px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Poolers />
    
  </Layout>
)

export default IndexPage
