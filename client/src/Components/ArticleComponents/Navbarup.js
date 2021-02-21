import React from 'react'
import{Container, Nav, Row, Col, Navbar, Form, FormControl, Button} from 'react-bootstrap'
import { AiFillHome } from "react-icons/ai";
function Navbarup() {
    return (
      <>
        <Navbar expand="lg" >
        <Navbar.Brand href="#home"><AiFillHome /></Navbar.Brand>
       
      
       <Nav className="mr-auto">
  <Nav.Link href="#home" style={{marginTop:'17%'}}>Home</Nav.Link>
  
  
</Nav>
<Form inline>
  <FormControl type="text" placeholder="Search"  className="md-3"  style={{borderRadius:'0.8em', }}/>
</Form>

</Navbar>
<hr style={{width:'100%'}}></hr>
</>
    )
}

export default Navbarup
