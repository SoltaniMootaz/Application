import React, {useState} from 'react'
import Vente from './vente'
import {Button } from "react-bootstrap";


function Ticket() {
    const [state, setState] = useState({
        isOpen: Boolean(false),
      });

    return (
        <>
        <Button variant="primary" onClick={() => setState({ isOpen: true })}>Vendre</Button>

        <Vente
        handleOpen={state.isOpen}
        handleClose={() => setState({ isOpen: false })}
        />
      </>
    )
}

export default Ticket; 