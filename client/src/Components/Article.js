import React from 'react'
import './css/Article.css'
import{Container, Nav, Row, Col, Navbar, Form, FormControl, Button} from 'react-bootstrap'
import Navbarup from './ArticleComponents/Navbarup.js'
import Sidebar from './ArticleComponents/Sidebar.js'
function Article() {
    return (
        <>
     <Container fluid>
                <Row>
                    <Col  xs={9} id="page-content-wrapper" className="nopadding" >     
                    <Navbarup />
                    </Col> 
                    <Col  id="sidebar-wrapper" className="nopadding" >
                    <Sidebar />
                    </Col>
                </Row>
    </Container>

    </>
    );
    
}

export default Article
