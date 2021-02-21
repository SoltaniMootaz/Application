import React, {useState} from 'react'
import '../css/Article.css'
import{Nav, Button} from 'react-bootstrap'
import AjouterCat from './ajouterCategorie'
import {BiPlusCircle} from 'react-icons/bi'

function Sidebar() {
    const [state, setState] = useState({
        isOpen: Boolean(false)
    })

    return (
        <>
        <Nav className="col-3 d-none d-md-block sidebar"
        activeKey="/"
        style={{backgroundColor:'#00A600'}}
        >
        <div className="sidebar-sticky"></div>
        <div className="s-link">
            <Nav.Item >
                <Nav.Link  style={{color:'white',fontSize:"25px"}}><BiPlusCircle style={{width:"45px",height:"45px"}} /> Ajouter article</Nav.Link>
            </Nav.Item>
            <hr />
            <Nav.Item > 
                <Nav.Link style={{color:'white',fontSize:"25px"}} onClick={() => setState({ isOpen: true })}><BiPlusCircle style={{width:"45px",height:"45px"}} /> Ajouter catégorie</Nav.Link>
            </Nav.Item>
        </div>
        </Nav>
            <AjouterCat 
                handleOpen={state.isOpen}
                handleClose={() => setState({ isOpen: false })}
            />
        </>
    )
}

export default Sidebar
