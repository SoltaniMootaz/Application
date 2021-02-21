import React from 'react'
import{Container, Nav, Row, Col, Navbar, Form, FormControl, Button} from 'react-bootstrap'
function Sidebar() {
    return (
        <Nav className="col-3 d-none d-md-block sidebar"
        activeKey="/"
        style={{backgroundColor:'#00A600'}}
        >
            <div className="sidebar-sticky"></div>
        <Nav.Item>
            <Nav.Link href="/home">Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="link-1">Link</Nav.Link>
        </Nav.Item>
       
        </Nav>
    )
}

export default Sidebar
