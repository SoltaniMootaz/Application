import React, {useState} from 'react'
import '../css/Article.css'
import{Nav, Button} from 'react-bootstrap'
import AjouterCat from './ajouterCategorie'

function Sidebar() {
    const [state, setState] = useState({
        isOpen: Boolean(false)
    })

    return (
        <>
        <Nav className="col-2 d-none d-md-block sidebar"
        activeKey="/"
        style={{backgroundColor:'#00A600'}}
        >
        <div className="sidebar-sticky"></div>
        <div className="s-link">
            <Nav.Item >
                <Nav.Link  style={{color:'white'}}><Button onClick={() => setState({ isOpen: true })} variant="outline" style={{borderRadius:"1.5em",borderColor:"white",color:'white'}}>+</Button> Ajouter article</Nav.Link>
            </Nav.Item>
            <Nav.Item > 
                <Nav.Link href="/Article" style={{color:'white'}}><Button variant="outline" style={{borderRadius:"1.5em",borderColor:"white",color:'white'}}>+</Button> Ajouter catégorie</Nav.Link>
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
