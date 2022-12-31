import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

import { Container, Row, Col, Card, ListGroup, ListGroupItem } from "react-bootstrap"

const Joueur = ({ pageContext }) => {

  // ----------------------
  // RUNTIME DATA FETCHING
  // ----------------------
  const [Infos, setInfos] = useState(0)
  const [infoEquipe, setInfoEquipe] = useState("")
  const [infoPosition, setInfoPosition] = useState("")


  useEffect(() => {
    // get data from NHL api
    fetch('https://statsapi.web.nhl.com/api/v1/people/' + pageContext.idNHL + '?stats=statsSingleSeason&season=20212022')
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        setInfos(resultData.people[0])
        setInfoEquipe(resultData.people[0].currentTeam.name)
        setInfoPosition(resultData.people[0].primaryPosition.name)
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps



  return (
    <Layout>
      <Seo title={pageContext.nom} />

      <Container fluid>
        <Row>
          <Col>
            <Card border="primary" className="text-center" style={{ width: 168 }}>
              <Card.Img variant="top" src={"https://cms.nhl.bamgrid.com/images/headshots/current/168x168/" + pageContext.idNHL + ".jpg"}
                alt={pageContext.nom + " headshot"} />
              <Card.Body>
                <Card.Title style={{ padding: 0 }}>{pageContext.nom}</Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>Position <b>{pageContext.position}</b></ListGroupItem>
                <ListGroupItem>Salaire <b>{(pageContext.salaireActuel / 10 ** 6).toFixed(2)} M$</b></ListGroupItem>

              </ListGroup>
              <Card.Body>
                <ListGroup>
                  <ListGroupItem>
                    <Card.Link href={"https://www.nhl.com/player/" + pageContext.idNHL}>NHL.com</Card.Link>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Card.Link href={"https://www.hockey-reference.com/players/" + pageContext.idHockeyRef.substr(0, 1) + "/" + pageContext.idHockeyRef + ".html"}>Hockey Reference</Card.Link>
                  </ListGroupItem>
                </ListGroup>

              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Title className="text-center" >
                Infos de NHL.com
              </Card.Title>
              <ListGroup className="list-group-flush">
                <ListGroupItem>Numéro <b>{Infos.primaryNumber}</b></ListGroupItem>
                <ListGroupItem>Âge <b>{Infos.currentAge}</b></ListGroupItem>
                <ListGroupItem>
                  Né le <b>{Infos.birthDate}</b><br />
                  Endroit <b>{Infos.birthCity}, {Infos.birthStateProvince}, {Infos.birthCountry}</b>
                </ListGroupItem>
                <ListGroupItem>Nationalité <b>{Infos.birthCountry}</b></ListGroupItem>
                <ListGroupItem><b>{Infos.height}, {Infos.weight} lb</b></ListGroupItem>
                {Infos.alternateCaptain &&
                  <ListGroupItem><b>Assistant capitaine</b></ListGroupItem>
                }
                {Infos.captain &&
                  <ListGroupItem><b>Capitaine</b></ListGroupItem>
                }
                {Infos.rookie &&
                  <ListGroupItem><b>Recrue</b></ListGroupItem>
                }
                {Infos.shootsCatches === "L" &&
                  <ListGroupItem><b>Gaucher</b></ListGroupItem>
                }
                {Infos.shootsCatches === "R" &&
                  <ListGroupItem><b>Droitier</b></ListGroupItem>
                }
                <ListGroupItem>Équipe <b>{infoEquipe}</b></ListGroupItem>
                <ListGroupItem>Positon <b>{infoPosition}</b></ListGroupItem>

              </ListGroup>
            </Card>
          </Col>
          <Col>
            <table>
              <thead><strong>Prochains matchs</strong></thead>
             <tr>
                <th>Date</th>
                <th>Adversaire</th>
              </tr>
              <tr>
                <td>Alfreds Futterkiste</td>
                <td>Maria Anders</td>
              </tr>
              <tr>
                <td>Centro comercial Moctezuma</td>
                <td>Francisco Chang</td>
              </tr>
            </table>
          </Col>
        </Row>
        <Row style={{ padding: 5 }}>
          <img src={"https://cms.nhl.bamgrid.com/images/actionshots/" + pageContext.idNHL + ".jpg"}
            alt={pageContext.nom + "  in action"}></img>

        </Row>
      </Container>

    </Layout>
  )
}

export default Joueur
