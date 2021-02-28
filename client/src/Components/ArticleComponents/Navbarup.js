import React  from 'react'
import{ Nav, Navbar,} from 'react-bootstrap'
import { AiFillHome } from "react-icons/ai";
function Navbarup(props) {

    return (
      <>
       
        <Navbar.Brand href="#home"><AiFillHome  className="icon" style={{width:'1.7em',height:'1.7em'}}/></Navbar.Brand>
        <Nav className="mr-auto " >
        <Nav.Link href=""  ><p className="homeBtn" >Home</p></Nav.Link>
        </Nav>

 
        
     
</>
    )
}

export default Navbarup
