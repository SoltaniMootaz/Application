import React from 'react'
import{ Nav, Navbar, Form, FormControl} from 'react-bootstrap'
import { AiFillHome } from "react-icons/ai";
function Navbarup() {
    return (
      <>
        <Navbar className="bg-light justify-content-between" expand="lg" style={{  boxShadow:'inset -1px 0 0 rgba(0, 0, 0, .1)'}}>
        <Navbar.Brand href="#home"><AiFillHome /></Navbar.Brand>
       
      
       <Nav className="mr-auto">
       <Nav.Link href="#home" style={{marginTop:'17%'}}>Home</Nav.Link>
       </Nav>

        <div style={{alignContent:'flex-end',float:'left'}}>
        <Form inline >
          <FormControl type="text" placeholder="Search"  className="mr-sm-2"  style={{borderRadius:'0.8em',}}/>
        </Form>
        </div>      
        </Navbar>

</>
    )
}

export default Navbarup
