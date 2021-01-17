import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"

function comparerPooler(a, b) {
  
    let comparison = 0;
    if (a.Score > b.Score) {
      comparison = 1;
    } else if (a.Score < b.Score) {
      comparison = -1;
    }
    return comparison * -1;
  }

function manipData(oData) {
    //console.log(oData)
    let arrPoolers = oData.allDataJson.nodes.find(Boolean).data
    console.log(arrPoolers)

    arrPoolers = arrPoolers.sort(comparerPooler)
    return(
          
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
                <td><Link to={ "/pooler/" + unPooler.Id }>
                  {unPooler.Nom}
                  </Link></td>
                <td>{unPooler._quipe}</td>
                <td>{unPooler.Score}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>  
    )
}

const Poolers = () => (
  <StaticQuery
    query={graphql`
      {
        allDataJson(sort: {fields: data___Score, order: DESC}) {
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
    `}
    render={data => manipData(data)}
  ></StaticQuery>
)

export default Poolers
