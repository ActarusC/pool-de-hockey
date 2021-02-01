import React, { useState, useEffect }  from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import { Container, Row, Card, ListGroup, ListGroupItem } from "react-bootstrap"


const Joueur = ({ pageContext }) => {
  
  // ----------------------
  // RUNTIME DATA FETCHING
  // ----------------------
  const [Infos, setInfos] = useState(0)
  //console.log(pageContext)
  useEffect(() => {
    // get data from NHL api
      fetch('https://statsapi.web.nhl.com/api/v1/people/' + pageContext.idNHL + '?stats=statsSingleSeason&season=20202021')
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        setInfos(resultData.people[0])
      }) // set Infos
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  console.log(Infos)
  return (
  <Layout>
    <SEO title={pageContext.nom} />

    <Container fluid>
      <Row>
        <Card>
          <Card.Img variant="top" src={"https://cms.nhl.bamgrid.com/images/headshots/current/168x168/" + pageContext.idNHL + ".jpg"}
            alt={pageContext.nom + " headshot"} style={{ width: 168 }} />
          <Card.Body>
            <Card.Title>{pageContext.nom}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Position {pageContext.position}</ListGroupItem>
            <ListGroupItem>Salaire {pageContext.salaireActuel} $</ListGroupItem>
          </ListGroup>
          <Card.Body>
            <Card.Link href={"https://www.nhl.com/player/" + pageContext.idNHL}>NHL.com</Card.Link>
            <Card.Link href={"https://www.hockey-reference.com/players/"+ pageContext.idHockeyRef.substr(0,1) + "/" + pageContext.idHockeyRef + ".html"}>Hockey Reference</Card.Link>
          </Card.Body>
        </Card>
        <Card>
          <Card.Title>
            Infos de NHL.com
          </Card.Title>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Numéro { Infos.primaryNumber }</ListGroupItem>
            <ListGroupItem>Date naissance { Infos.birthDate }</ListGroupItem>
            <ListGroupItem>Âge { Infos.currentAge }</ListGroupItem>
            <ListGroupItem>Pays de naissance { Infos.birthCountry }</ListGroupItem>
            <ListGroupItem>Ville de naissance { Infos.birthCity }, { Infos.birthStateProvince }</ListGroupItem>
            <ListGroupItem>Nationalité { Infos.birthCountry }</ListGroupItem>
            <ListGroupItem>Taille { Infos.height }</ListGroupItem>
            <ListGroupItem>Poids { Infos.weight } lb</ListGroupItem>
            { Infos.alternateCaptain && 
              <ListGroupItem>Assistant capitaine</ListGroupItem>              
            }
            { Infos.captain && 
              <ListGroupItem>Capitaine</ListGroupItem>              
            }
            { Infos.rookie && 
              <ListGroupItem>Recrue</ListGroupItem>              
            }
            { Infos.shootsCatches == "L" && 
              <ListGroupItem>Gaucher</ListGroupItem>              
            }
            { Infos.shootsCatches == "R" && 
              <ListGroupItem>Droitier</ListGroupItem>              
            }
            <ListGroupItem>Équipe { Infos.currentTeam.name }</ListGroupItem>
            <ListGroupItem>Positon { Infos.primaryPosition.name }</ListGroupItem>
            
          </ListGroup>
        </Card>
      </Row>
      <Row>
        <img src={"https://cms.nhl.bamgrid.com/images/actionshots/" + pageContext.idNHL + ".jpg"}
          alt={pageContext.nom + "  in action"}></img>

      </Row>
    </Container>

  </Layout >
  )
}


export default Joueur

// context: {
//   nom: joueur.prenomJoueur + " " + joueur.nomJoueur,
//   idNHL: joueur.idNHL,
//   idHockeyRef: joueur.idHockeyRef,
//   position: joueur.position,
//   salaireActuel: joueur.salaireActuel,