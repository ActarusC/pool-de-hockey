import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"

const alignements = require("../data/alignements.json").data

function filtrerAlignement(align, idPooler, statusA) {
  const alignF = align.filter(unA => (unA.idPooler === idPooler && unA.statutJoueur === statusA))
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
          <th>PJ</th>
          <th>Buts</th>
          <th>Aides</th>
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
            <td>{unJoueur.pjActuels} </td>
            <td>{unJoueur.butsActuels} </td>
            <td>{unJoueur.assistActuels} </td>
            <td>{unJoueur.pointsActuels} </td>
            <td>{(unJoueur.salaireActuel / 10**6).toFixed(2)  } M$</td>
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

export default Pooler