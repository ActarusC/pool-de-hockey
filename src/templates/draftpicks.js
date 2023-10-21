import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Link } from "gatsby"

const picks = require("../data/picks.json").data

function filtrerPicks(picks, idPooler, type, annee) {
  let picksF = picks.filter(unP => (unP.actuel === idPooler))
  picksF = picksF.filter(unP => (unP.type === type))
  picksF = picksF.filter(unP => (unP.annee === annee))
  picksF = picksF.sort((a, b) => a.ronde - b.ronde)
  /* picksF = picksF.sort(picksF.ronde) */
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
        <h2>2024</h2>
        <h3>Entrée</h3>
        { unTypeDraft(idPooler, "ENT", 2024) }
        <h3>Pro</h3>
        { unTypeDraft(idPooler, "PRO", 2024) }
        <h2>2025</h2>
        <h3>Entrée</h3>
        { unTypeDraft(idPooler, "ENT", 2025) }
        <h3>Pro</h3>
        { unTypeDraft(idPooler, "PRO", 2025) }
        <h2>2026</h2>
        <h3>Entrée</h3>
        { unTypeDraft(idPooler, "ENT", 2026) }
        <h3>Pro</h3>
        { unTypeDraft(idPooler, "PRO", 2026) }
        <h2>2027</h2>
        <h3>Entrée</h3>
        { unTypeDraft(idPooler, "ENT", 2027) }
        <h3>Pro</h3>
        { unTypeDraft(idPooler, "PRO", 2027) }
        <h2>2028</h2>
        <h3>Entrée</h3>
        { unTypeDraft(idPooler, "ENT", 2028) }
        <h3>Pro</h3>
        { unTypeDraft(idPooler, "PRO", 2028) }
        <h2>2029</h2>
        <h3>Entrée</h3>
        { unTypeDraft(idPooler, "ENT", 2029) }
        <h3>Pro</h3>
        { unTypeDraft(idPooler, "PRO", 2029) }
        <h2>2030</h2>
        <h3>Entrée</h3>
        { unTypeDraft(idPooler, "ENT", 2030) }
        <h3>Pro</h3>
        { unTypeDraft(idPooler, "PRO", 2030) }
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