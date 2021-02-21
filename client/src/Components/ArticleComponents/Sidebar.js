import React from 'react'
import '../css/Article.css'
import{Nav, Button} from 'react-bootstrap'
import {BiPlusCircle} from "react-icons/bi";
function Sidebar() {
    return (
        <Nav className="col-2 d-none d-md-block sidebar"
        activeKey="/"
        style={{backgroundColor:'#00A600'}}
        >
            <div className="sidebar-sticky"></div>
            <div className="s-link">
        <Nav.Item >
            <Nav.Link href="/Article" style={{color:'white'}}><BiPlusCircle  style={{width:'30px' ,height:'30px'}}/> Ajouter article</Nav.Link>
        </Nav.Item>
        <Nav.Item > 
            <Nav.Link href="/Article" style={{color:'white'}}><BiPlusCircle style={{width:'30px' ,height:'30px'}}/> Ajouter catégorie</Nav.Link>
        </Nav.Item>
        </div>
        </Nav>
    )
}

export default Sidebar
