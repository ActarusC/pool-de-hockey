import React from "react"
//import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import Seo from "../components/seo"
import Poolers from "../components/poolers"

const IndexPage = () => (
  <Layout>
    <Seo title="Accueil" />
    <div style={{ maxWidth: `200px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Poolers />
    
  </Layout>
)

export default IndexPage
