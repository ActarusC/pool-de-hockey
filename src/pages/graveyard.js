import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

export default function Graveyard({ data }) {
  console.log(data)
  return (
    <Layout>
      <div>
        <h1>Graveyard</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Started</th>
              <th>Ended</th>
            </tr>
          </thead>
          <tbody>
            {data.allGraveyardJson.edges.map(({ node }, index) => (
              <tr key={index}>
                <td>{node.name}</td>
                <td>{node.description}</td>
                <td>{node.dateOpen}</td>
                <td>{node.dateClose}</td>
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
    allGraveyardJson {
      edges {
        node {
          dateClose
          dateOpen
          name
          description
        }
      }
    }
  }
`
