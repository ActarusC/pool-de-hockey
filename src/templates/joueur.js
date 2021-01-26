import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import { Container, Row, Col } from "react-bootstrap"


const Joueur = ({ pageContext }) => (

  <Layout>
    <SEO title={pageContext.nom} />

    <Container fluid>
      <Row>
        <Col><h1>{pageContext.nom}</h1>
        </Col>
      </Row>
      <Row>
        <Col><div>
          <a href='{"https://www.nhl.com/player/" + pageContext.idNHL}'>
            <img src={"https://cms.nhl.bamgrid.com/images/headshots/current/168x168/" + pageContext.idNHL + ".jpg"}
              alt={pageContext.nom + " headshot"}
            ></img>
          </a></div>
        </Col>
        <Col>
          <Row>
            <Col>Position</Col>
            <Col>{pageContext.position}</Col>
          </Row>
          <Row>
            <Col>Salaire</Col>
            <Col>{pageContext.salaireActuel}</Col>
          </Row>
        </Col>
        <Col>
          <img src="https://www-league.nhlstatic.com/images/logos/league-dark/133-flat.svg" width={64} alt="Voir sur NHL.COM"></img></Col>
      </Row>
      <Row>
        <Col> <img src={"https://cms.nhl.bamgrid.com/images/actionshots/" + pageContext.idNHL + ".jpg"}
          alt={pageContext.nom + "  in action"}></img>
        </Col>
      </Row>

    </Container>

  </Layout>
)

export default Joueur

// context: {
//   nom: joueur.prenomJoueur + " " + joueur.nomJoueur,
//   idNHL: joueur.idNHL,
//   idHockeyRef: joueur.idHockeyRef,
//   position: joueur.position,
//   salaireActuel: joueur.salaireActuel,