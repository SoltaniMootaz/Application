import React, {useState} from 'react'
import Vente from './vente'
import {Button, Nav, Row, Col, Table,Form } from "react-bootstrap";


function Ticket(props) {
    const [state, setState] = useState({
        isOpen: Boolean(false),
      });
console.log(props.tickeTab)
    return (
        <>
        <div style={{width:'100%  '}}>         
          <h4 style={{paddingTop:'2.05em'}}><center>Ticket</center></h4>
        </div>

        <hr />

        <Table responsive >
          <thead>
            <tr>
              <th>#</th>
              <th>Nom du produit</th>
              <th>Prix</th>
              <th>Quantité</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>
                <Form.Control
                  type="number"
                  name="quantite"
                  
                />
              </td>
            </tr>

            <tr>
              <td>2</td>
              <td>Table cell1</td>
              <td>Table cell</td>
              <td>
                <Form.Control
                  type="number"
                  name="quantite"

                />
              </td>
            </tr>
          </tbody>
        </Table>

     

        <Row>
        <Nav className="justify-content-start navbar fixed-bottom navbar-light border-top" style={{left:"4rem"}}>
          <Col md={2}>
             
              <Button variant="primary" onClick={() => setState({ isOpen: true })} style={{borderRadius:"10px",width:"50%"}}>Valider</Button> 

            <Vente
            handleOpen={state.isOpen}
            handleClose={() => setState({ isOpen: false })}
            />
          </Col>

          <Col md={2}>
              <Button variant="danger" style={{borderRadius:"10px",width:"50%"}}>Effacer</Button>
          </Col>
          </Nav>
      </Row>

      </>
    )
}

export default Ticket; 