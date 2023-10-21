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
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentSeason = currentMonth < 6 ? currentYear : currentYear + 1;

    return (
        <div className="row">
            <div className="column">
                {Array.from({ length: 2030 - currentSeason + 1 }, (_, i) => {
                    const season = currentSeason + i;
                    return (
                        <div key={season}>
                            <h2>{season}</h2>
                            <h3>Entrée</h3>
                            {unTypeDraft(idPooler, "ENT", season)}
                            <h3>Pro</h3>
                            {unTypeDraft(idPooler, "PRO", season)}
                        </div>
                    );
                })}
            </div>
        </div>
    );
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