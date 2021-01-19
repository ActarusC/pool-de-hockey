import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"

const alignements = require("../data/alignements.json").data

function filtrerAlignement(align, idPooler) {
  const alignF = align.filter((unA => {
    return (unA.idPooler === idPooler)
  }))
  return alignF
}

const Pooler = ({ pageContext }) => (
  <Layout>
    <SEO title={pageContext.Equipe} />
    <h1>{pageContext.Equipe}</h1>
    <p>Dirigée par <b>{pageContext.nom}</b> </p>
    <table>
      <thead>
        <tr>
          <th>Joueur</th>
          <th>Position</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {filtrerAlignement(alignements, pageContext.Id).map(unJoueur => (
          <tr key={unJoueur.idAlignement}>
            <td>
              <Link to={"/joueur/" + unJoueur.idNHL}>
                {unJoueur.prenomJoueur + " " + unJoueur.nomJoueur}
              </Link></td>
            <td>{unJoueur.position} </td>
            <td>{unJoueur.pointsActuels} </td>
          </tr>

        ))
        }
      </tbody>
    </table>
  </Layout>
)
// "idAlignement":1,
// "idPooler":"gab",
// "idNHL":8471675,
// "idHockeyRef":"crosbsi01",
// "prenomJoueur":"Sidney",
// "nomJoueur":"Crosby",
// "position":"A",
// "statutJoueur":"Alignement",
// "dateDebut":"2020-11-26",
// "dateFin":"2020-12-07",
// "pointsActuels":0,
// "salaireActuel":8700000
export default Pooler