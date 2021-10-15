import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"

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

  function unTypeDraft(idPooler, type, titreA) {
    return (
      <div>
        <h2>{titreA}</h2>
        <table>
          {entetePicks()}
          {bodyPicks(idPooler, type, annee)}
       </table>
      </div>
    )
  }


