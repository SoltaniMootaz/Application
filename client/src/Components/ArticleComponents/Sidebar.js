import React from 'react'
import '../css/Article.css'
import{Container, Nav, Row, Col, Navbar, Form, FormControl, Button} from 'react-bootstrap'
function Sidebar() {
    return (
        <Nav className="col-3 d-none d-md-block sidebar"
        activeKey="/"
        style={{backgroundColor:'#00A600'}}
        >
            <div className="sidebar-sticky"></div>
            <div className="s-link">
        <Nav.Item >
            <Nav.Link href="/Article" style={{color:'white'}}><Button variant="outline" style={{borderRadius:"1.5em",borderColor:"white",color:'white'}}>+</Button> Ajouter article</Nav.Link>
        </Nav.Item>
        <Nav.Item > 
            <Nav.Link href="/Article" style={{color:'white'}}><Button variant="outline" style={{borderRadius:"1.5em",borderColor:"white",color:'white'}}>+</Button> Ajouter catégorie</Nav.Link>
        </Nav.Item>
        </div>
        </Nav>
    )
}

export default Sidebar
