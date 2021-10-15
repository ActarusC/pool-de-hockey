import React from "react"
//import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ChoisirPooler from "../components/indexdraftpicks"

const IndexPagePicks = () => (
  <Layout>
    <SEO title="Choix de repêchage" />
    <ChoisirPooler />
    
  </Layout>
)

export default IndexPagePicks