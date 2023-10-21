import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Link } from "gatsby"

const alignements = require("../data/alignements.json").data

function filtrerAlignement(align, idPooler, statusA) {
  let alignF = align.filter(unA => (unA.idpooler === idPooler))
  if (statusA === "historique") {
    alignF = alignF.filter(unA => (unA.datefin < "2100-01-01"))
  }
  else {
    alignF = alignF.filter(unA => (unA.datefin === "2100-01-01" && unA.statutjoueur === statusA))
  }
  alignF = alignF.sort(comparerJoueur)
  return alignF
}

function comparerJoueur(a, b) {

  let comparison = 0;
  if (a.datefin > b.datefin) {
    comparison = 1;
  } else if (a.datefin < b.datefin) {
    comparison = -1;
  }
  return comparison * -1;
}

function enteteAlignement(afficheDateFin = false, afficheStatut = false) {
  return(
    <thead>
    <tr>
      <th>Joueur</th>
      <th>Position</th>
      {afficheStatut &&
        <th>Statut</th>
          }
      <th>PJ</th>
      <th>Buts (V)</th>
      <th>Aides (JB)</th>
      <th>Score</th>
      <th>Cap hit</th>
      <th>Date d'ajout</th>
      {afficheDateFin &&
        <th>Date de fin</th>
      }
      </tr>
  </thead>
  )
}

function bodyAlignement(idPooler, statusA, afficheDateFin = false, afficheStatut = false){
  return (
    <tbody>
    {filtrerAlignement(alignements, idPooler, statusA).map(unJoueur => (
      <tr key={unJoueur.idalignement}>
        <td>
          <Link to={"/joueur/" + unJoueur.idnhl}>
            {unJoueur.prenomjoueur + " " + unJoueur.nomjoueur}
          </Link></td>
        <td>{unJoueur.position} </td>
        {afficheStatut &&
                <td>{unJoueur.statutjoueur}</td>
                }
        <td>{unJoueur.pjactuels} </td>
        <td>{unJoueur.butsactuels} </td>
        <td>{unJoueur.assistactuels} </td>
        <td>{unJoueur.pointsactuels} </td>
        <td>{(unJoueur.team_caphit / 10**6).toFixed(2)  } M$</td>
        <td>{unJoueur.datedebut} </td>
        {afficheDateFin &&
                <td>{unJoueur.datefin} </td>
                }
        </tr>

    ))
    }
  </tbody>
  )
}

function unTypeAlignement(idPooler, statusA, titreA, afficheDateFin = false, afficheStatut = false) {
  return (
    <div>
      <h2>{titreA}</h2>
      <table>
        {enteteAlignement(afficheDateFin, afficheStatut)}
        {bodyAlignement(idPooler, statusA, afficheDateFin, afficheStatut)}
     </table>
    </div>
  )
}

function typesAlignements(idPooler) {
  return(
    <div>
      { unTypeAlignement(idPooler, "Alignement", "Alignement actif") }
      { unTypeAlignement(idPooler, "R\u00e9serve", "Réserve") }
      { unTypeAlignement(idPooler, "Espoir", "Espoirs") }
      { unTypeAlignement(idPooler, "Bless\u00e9", "Liste des blessés") }
      { unTypeAlignement(idPooler, "SalaireRetenu", "Salaires retenus") }
      { unTypeAlignement(idPooler, "historique", "Historique", true, true) }
    </div>
  )
}

const Pooler = ({ pageContext }) => (
  <Layout>
    <Seo title={pageContext.Equipe} />
    <h1>{pageContext.Equipe}</h1>
    <p>Dirigée par <b>{pageContext.Nom}</b> </p>
    <p><Link to="./picks">Choix de repêchage</Link></p>
    { typesAlignements(pageContext.Id) }

  </Layout>
)

export default Pooler