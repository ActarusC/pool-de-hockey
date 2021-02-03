import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"

const alignements = require("../data/alignements.json").data

function filtrerAlignement(align, idPooler, statusA) {
  const alignF = align.filter(unA => (unA.idPooler === idPooler && unA.statutJoueur === statusA))
  return alignF
}

function enteteAlignement() {
  return(
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
      <th>Date de fin</th>
    </tr>
  </thead>
  )
}

function bodyAlignement(idPooler, statusA){
  return (
    <tbody>
    {filtrerAlignement(alignements, idPooler, statusA).map(unJoueur => (
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
        {unJoueur.dateFin !== "2100-01-01" &&
                <td>{unJoueur.dateFin} </td>
                }
      </tr>

    ))
    }
  </tbody>
  )
}

function unTypeAlignement(idPooler, statusA, titreA) {
  return (
    <div>
      <h2>{titreA}</h2>
      <table>
        {enteteAlignement()}
        {bodyAlignement(idPooler, statusA)}
     </table>
    </div>
  )
}

function typesAlignements(idPooler) {
  return(
    <div>
      { unTypeAlignement(idPooler, "Alignement", "Alignement actif") }
      { unTypeAlignement(idPooler, "R\u00e9serve", "R\u00e9serve") }
      { unTypeAlignement(idPooler, "Espoir", "Espoirs") }
      { unTypeAlignement(idPooler, "Bless\u00e9", "Liste des bless\u00e9s") }
      
    </div>
  )
}

const Pooler = ({ pageContext }) => (
  <Layout>
    <SEO title={pageContext.Equipe} />
    <h1>{pageContext.Equipe}</h1>
    <p>Dirigée par <b>{pageContext.nom}</b> </p>

    { typesAlignements(pageContext.Id) }

  </Layout>
)

export default Pooler