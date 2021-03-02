import React,{ useState, useEffect } from 'react'
import Ticket from './CaisseComponents/ticket'
import AfficheArticle from './CaisseComponents/AfficheArticle'
import {
    Container,
    Row,
    Col,
    Spinner,
    Navbar,
    Form,
    FormControl,
    Nav
  } from "react-bootstrap";
  import { AiFillHome } from "react-icons/ai";
  import Axios from "axios";
function Caisse() {
  const urlart = "http://localhost:3001/api/afficherArticles&";
  const [dataArt, setDataArt] = useState([]);
  const [isLoading2, setLoading2] = useState(true);

  const getArticles = () => {
    Axios.get(urlart)
      .then((res) => setDataArt(res.data))
      .catch((err) => console.log(err));
    setLoading2(false);
  };

  useEffect(() => {

    getArticles();
  }, []);


  if (isLoading2) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  } else {
  
    return (
        <Container fluid>
            <Row>       
                <Col xs={4} md={4} xl={4}  id="sidebar-wrapper" className="nopadding border-right" > 
                <Ticket></Ticket>
                </Col>
                <Col xs={12} sm={12} md={8} xl={8} id="page-content-wrapper" className="nopadding">
                    <Row> 
                    <Col  xs={12} sm={12} md={12} xl={12} id="page-content-wrapper">
                        <Navbar className=" justify-content-center border-bottom border-left" expand="lg" style={{  boxShadow:'inset -1px 0 0 rgba(0, 0, 0, .1)',}}>
                        <Navbar.Brand href="#home"><AiFillHome  className="icon" style={{width:'1.7em',height:'1.7em'}}/></Navbar.Brand>
                        <Nav className="mr-auto " >
                        <Nav.Link href=""  ><p className="homeBtn" >Home</p></Nav.Link>
                        </Nav>
                        <Nav.Item className="navItem">
                        <Form className="searchForm" inline>
                        <FormControl type="text" placeholder="Search"  className="searchBarr" style={{
                                marginRight:'3em',
                                borderLeft: 0,
                                borderTop: 0,
                                borderRight: 0,
                                borderColor: "#176cd4",
                                borderRadius: "0em" }}/>
                        </Form>
                        </Nav.Item>                               
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Item className="navItem">
                        <Nav.Link
                        style={{ textAlign:'center' }} >
                            Ajouter article
                        </Nav.Link >
                        </Nav.Item>
                        <Nav.Item className="navItem">
                        <Nav.Link
                        style={{textAlign:'center'  }}>
                            Ajouter catégorie
                        </Nav.Link>
                        </Nav.Item>
                        </Nav>
                        </Navbar.Collapse>    
                        <Nav.Item>
                        <Form className="searchForm1" inline>
                        <FormControl type="text" placeholder="Search" className="searchBar1" style={{
                                marginRight:'3em', 
                                borderLeft: 0,
                                borderTop: 0,
                                borderRight: 0,
                                borderColor: "#176cd4",
                                borderRadius: "0em"}}/>
                            </Form>
                            </Nav.Item>                 
                        </Navbar>
                     </Col>
                    </Row>
                    <Row>   
                      <AfficheArticle dataArt={dataArt}></AfficheArticle>    
                    </Row>
                  </Col> 
                </Row>
        </Container>

    )
}}

export default Caisse; 