import React, {useState, useEffect} from 'react'
import Vente from './vente'
import {Button, Nav, Row, Col, Table,Form } from "react-bootstrap";


function Ticket(props) {
    const [state, setState] = useState({
        isOpen: Boolean(false),
      });

    const [data,setData] = useState([])
    const [index,setIndex] = useState([]);

      useEffect(() => {
        if(typeof props.array != "undefined"&&!index.includes(props.index)) {
            setIndex(index =>[...index,props.index]);
            setData(data=>[...data,<tr key={props.index}>
              <td>{props.index}</td>
              <td>{props.array.nom}</td>
              <td>{props.array.prix}</td>
              <td>
                <Form.Control
                  type="number"
                  name="quantite"
                  value="1"
                />
              </td>
            </tr>]);
        }
      },[props.array])


    return (
        <>
        <h4 style={{paddingTop:'2.05em'}}><center>Ticket</center></h4>
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
            {data}
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