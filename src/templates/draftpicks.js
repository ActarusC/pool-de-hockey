import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const picks = require("../data/picks.json").data

function filtrerPicks(picks, idPooler, type, annee) {
  let picksF = picks.filter(unP => (unP.Actuel === idPooler))
  picksF = picksF.filter(unP => (unP.Type === type))
  picksF = picksF.filter(unP => (unP.Annee === annee))
  picksF = picksF.sort(picksF.Ronde)
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
        <tr key={unPick.idChoix}>
          <td>{unPick.Annee} </td>
          <td>{unPick.Ronde} </td>
          <td>{unPick.Original} </td>
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
        <h2>{"Entr\u00e9e"}</h2>
        { unTypeDraft(idPooler, "ENT", 2022) }
        { unTypeDraft(idPooler, "ENT", 2023) }
        { unTypeDraft(idPooler, "ENT", 2024) }
        </div>
        <div class="column">
        <h2>{"Pro"}</h2>
        { unTypeDraft(idPooler, "PRO", 2022) }
        { unTypeDraft(idPooler, "PRO", 2023) }
        { unTypeDraft(idPooler, "PRO", 2024) }
        </div>
      </div>
    )
  }

  const Pooler = ({ pageContext }) => (
    <Layout>
      <SEO title={pageContext.Equipe} />
      <h1>{pageContext.Equipe}</h1>
      <p>Dirigée par <b>{pageContext.nom}</b> </p>
  
      { typesDrafts(pageContext.Id) }
  
    </Layout>
  )
  
  export default Pooler