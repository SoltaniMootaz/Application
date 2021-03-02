import React, {useState} from 'react'
import Vente from './vente'
import {Button,Nav } from "react-bootstrap";


function Ticket(props) {
    const [state, setState] = useState({
        isOpen: Boolean(false),
      });
console.log(props.tickeTab)
    return (
        <>
       
      <h4 style={{paddingTop:'2.05em'}}><center>Ticket</center></h4>
        <hr />
     
         <Nav className="justify-content-start navbar fixed-bottom navbar-light ">   
       
          <Button variant="primary" onClick={() => setState({ isOpen: true })}>Vendre</Button>
          
        </Nav>

        <Vente
        handleOpen={state.isOpen}
        handleClose={() => setState({ isOpen: false })}
        />
    
      </>
    )
}

export default Ticket; 