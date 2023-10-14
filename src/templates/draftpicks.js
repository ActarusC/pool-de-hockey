import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Link } from "gatsby"

const picks = require("../data/picks.json").data

function filtrerPicks(picks, idPooler, type, annee) {
  let picksF = picks.filter(unP => (unP.actuel === idPooler))
  picksF = picksF.filter(unP => (unP.type === type))
  picksF = picksF.filter(unP => (unP.annee === annee))
  picksF = picksF.sort(picksF.ronde)
  return picksF
}

function entetePicks() {
    return(
      <thead>
      <tr>        
        <th>Année</th>
        <th>Ronde</th>
        <th>Original</th>
        </tr>
    </thead>
    )
  }

  function bodyPicks(idPooler, type, annee){
    return (
      <tbody>
      {filtrerPicks(picks, idPooler, type, annee).map(unPick => (
        <tr key={unPick.idchoix}>
          <td>{unPick.annee} </td>
          <td>{unPick.ronde} </td>
          <td>{unPick.original} </td>
          </tr>
  
      ))
      }
    </tbody>
    )
  }

  function unTypeDraft(idPooler, type, annee) {
    return (
      <div>
        <table>
          {entetePicks()}
          {bodyPicks(idPooler, type, annee)}
       </table>
      </div>
    )
  }


  function typesDrafts(idPooler) {
    return(
      <div class="row">
        <div class="column">
        <h2>Entrée</h2>
        { unTypeDraft(idPooler, "ENT", 2022) }
        { unTypeDraft(idPooler, "ENT", 2023) }
        { unTypeDraft(idPooler, "ENT", 2024) }
        </div>
        <div class="column">
        <h2>Pro</h2>
        { unTypeDraft(idPooler, "PRO", 2022) }
        { unTypeDraft(idPooler, "PRO", 2023) }
        { unTypeDraft(idPooler, "PRO", 2024) }
        </div>
      </div>
    )
  }

  const picksPooler = ({ pageContext }) => (
    <Layout>
      <Seo title={pageContext.Equipe} />
      <h1>{pageContext.Equipe}</h1>
      <p>Dirigée par <b><Link to={"/pooler/" + pageContext.Id}>{pageContext.Nom}</Link></b></p>
  
      { typesDrafts(pageContext.Id) }
  
    </Layout>
  )
  
  export default picksPooler