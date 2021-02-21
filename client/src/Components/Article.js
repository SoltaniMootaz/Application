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
                <Col  xs={10} id="page-content-wrapper" className="nopadding" > 
                    <Row>  <Col  xs={12} id="page-content-wrapper"><Navbarup /></Col> </Row>
                    <Row>
                    
                    </Row>
                     </Col>
                    <Col  xs={2} id="sidebar-wrapper" className="nopadding" >
                    <Sidebar />
                    </Col>
                </Row>
    </Container>

    </>
    );
    
}

export default Article
