import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"

function manipData(oData) {
  //console.log(oData)
  let arrPoolers = oData.allDataJson.nodes.find(Boolean).data
  //console.log(arrPoolers)

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
            <tr key={unPooler.Id}>
              <td><Link to={"/pooler/" + unPooler.Id}>
                {unPooler.Nom}
              </Link></td>
              <td>{unPooler._quipe}</td>
              <td>{unPooler.PJ}</td>
              <td>{unPooler.B}</td>
              <td>{unPooler.A}</td>

              <td>{unPooler.Score}</td>
              <td>{ (unPooler.MasseSalariale / 10**6).toFixed(2)  } M$</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

const ChoisirPooler = () => (
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
              PJ
              B
              A
              MasseSalariale
            }
          }
        }
      }
    `}
    render={data => manipData(data)}
  ></StaticQuery>
)

export default ChoisirPooler
