import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

export default function Poolers({ data }) {
  let arrPoolers = data.allDataJson.nodes.find(Boolean).data
  //console.log(arrPoolers)

  //arrPoolers.map(unPooler => (console.log(unPooler.Nom, unPooler.Id)))

  function comparerPooler(a, b) {
  
    let comparison = 0;
    if (a.Score > b.Score) {
      comparison = 1;
    } else if (a.Score < b.Score) {
      comparison = -1;
    }
    return comparison * -1;
  }
  
  arrPoolers = arrPoolers.sort(comparerPooler)
  
  return (
    <Layout>
      <div>
        <h1>Poolers</h1>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Équipe</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {arrPoolers.map(unPooler => (
              <tr key={unPooler.Id}>
                <td>{unPooler.Nom}</td>
                <td>{unPooler._quipe}</td>
                <td>{unPooler.Score}</td>
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
  allDataJson {
    nodes {
      data {
        Abbr_viation
        Id
        Nom
        Score
        _quipe
      }
    }
  }
}
`
