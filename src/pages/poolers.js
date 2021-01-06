import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

export default function Poolers({ data }) {
  console.log(data)
  return (
    <Layout>
      <div>
        <h1>Poolers</h1>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {data.allPoolersJson.edges.map(({ node }, index) => (
              <tr key={index}>
                <td>{node.nom}</td>
                <td>{node.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allPoolersJson {
      edges {
        node {
          nom
          score
        }
      }
    }
  }
`
