import React from 'react'
import{Container, Nav, Row, Col, Navbar, Form, FormControl, Button} from 'react-bootstrap'
function Navbarup() {
    return (
      <>
        <Navbar expand="lg" >
        <Navbar.Brand href="#home"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
       <Navbar.Collapse id="basic-navbar-nav">
       <Nav className="mr-auto">
  <Nav.Link href="#home">Home</Nav.Link>
  
  
</Nav>
<Form inline>
  <FormControl type="text" placeholder="Search"  className="mr-sm-2"  style={{borderTop:'0px',borderLeft:'0px',borderRight:'0px',borderRadius:'0px', }}/>
</Form>
</Navbar.Collapse>
</Navbar>
<hr style={{width:'100%'}}></hr>
</>
    )
}

export default Navbarup
