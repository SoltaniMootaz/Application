import React from 'react'
import{Button,Modal} from 'react-bootstrap'

function AjouterCat(props) {
    const btnStyle = {
      borderRadius:"1.2em",
      borderColor:"#00A600",
      color:'#00A600',
      fontSize:25,
      textAlign: "center",
      alignContent: "center"    
    }

    return (
      <>
        <Modal show={props.handleOpen} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
            <Button variant="outline" onClick={props.handleClose} style={btnStyle}>+</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default AjouterCat;