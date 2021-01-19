import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"

const alignements = require("../data/alignements.json").data

function filtrerAlignement(align, idPooler, statusA) {
  const alignF = align.filter(unA => (unA.idPooler == idPooler && unA.statutJoueur == statusA))
  return alignF
}

const Pooler = ({ pageContext }) => (
  <Layout>
    <SEO title={pageContext.Equipe} />
    <h1>{pageContext.Equipe}</h1>
    <p>Dirigée par <b>{pageContext.nom}</b> </p>
    <h2>Alignement actif</h2>
    <table>
      <thead>
        <tr>
          <th>Joueur</th>
          <th>Position</th>
          <th>Score</th>
          <th>Salaire</th>
          <th>Date d'ajout</th>
        </tr>
      </thead>
      <tbody>
        {filtrerAlignement(alignements, pageContext.Id, "Alignement").map(unJoueur => (
          <tr key={unJoueur.idAlignement}>
            <td>
              <Link to={"/joueur/" + unJoueur.idNHL}>
                {unJoueur.prenomJoueur + " " + unJoueur.nomJoueur}
              </Link></td>
            <td>{unJoueur.position} </td>
            <td>{unJoueur.pointsActuels} </td>
            <td>{unJoueur.salaireActuel} </td>
            <td>{unJoueur.dateDebut} </td>
          </tr>

        ))
        }
      </tbody>
    </table>

    <h2>Réserve</h2>
    <table>
      <thead>
        <tr>
          <th>Joueur</th>
          <th>Position</th>
          <th>Score</th>
          <th>Salaire</th>
          <th>Date d'ajout</th>
        </tr>
      </thead>
      <tbody>
        {filtrerAlignement(alignements, pageContext.Id, "R\u00e9serve").map(unJoueur => (
          <tr key={unJoueur.idAlignement}>
            <td>
              <Link to={"/joueur/" + unJoueur.idNHL}>
                {unJoueur.prenomJoueur + " " + unJoueur.nomJoueur}
              </Link></td>
            <td>{unJoueur.position} </td>
            <td>{unJoueur.pointsActuels} </td>
            <td>{unJoueur.salaireActuel} </td>
            <td>{unJoueur.dateDebut} </td>
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