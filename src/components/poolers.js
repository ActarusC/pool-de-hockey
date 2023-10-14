import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"

function comparerPooler(a, b) {

  let comparison = 0;
  if (a.score > b.score) {
    comparison = 1;
  } else if (a.score < b.score) {
    comparison = -1;
  }
  return comparison * -1;
}

function manipData(oData) {
  //console.log(oData)
  let arrPoolers = oData.allDataJson.nodes.find(Boolean).data
  //console.log(arrPoolers)

  arrPoolers = arrPoolers.sort(comparerPooler)
  return (

    <div>
      <h1>Poolers</h1>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Équipe</th>

            <th>PJ</th>
            <th>Buts (V)</th>
            <th>Aides (JB) </th>
            <th>Score</th>
            <th>Masse $</th>
          </tr>
        </thead>
        <tbody>
          {arrPoolers.map(unPooler => (
            <tr key={unPooler.id}>
              <td><Link to={"/pooler/" + unPooler.id}>
                {unPooler.nom}
              </Link></td>
              <td>{unPooler.equipe}</td>
              <td>{unPooler.pj}</td>
              <td>{unPooler.b}</td>
              <td>{unPooler.a}</td>

              <td>{unPooler.score}</td>
              <td>{ (unPooler.massesalariale / 10**6).toFixed(2)  } M$</td>
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
        allDataJson(sort: {data: {score: DESC}}) {
          nodes {
            data {
              abbr
              id
              nom
              score
              equipe
              pj
              b
              a
              massesalariale
            }
          }
        }
      }
    `}
    render={data => manipData(data)}
  ></StaticQuery>
)

export default Poolers
