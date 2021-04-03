import React, { useState, useEffect } from "react";
import "./css/Article.css";
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

import Sidebar from "./ArticleComponents/Sidebar.js";
import Axios from "axios";
import TousArticle from "./ArticleComponents/TousArticle.js";
import ArticlesChercher from "./ArticleComponents/ArticleChercher.js";
import AjouterCat from "./ArticleComponents/ajouterCategorie";
import AjouterArt from "./ArticleComponents/ajouterArticle";
function Article() {
  const urlcat = "http://localhost:3001/api/afficherCategorie";
  const urlart = "http://localhost:3001/api/afficherArticles&";
  var isLoading = true;

  const [dataCat, setDataCat] = useState([]);
  const [dataArt, setDataArt] = useState([]);
  const [isLoading1, setLoading1] = useState(true);
  const [isLoading2, setLoading2] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [value, setValue] = useState();

  const getCategories = () => {
    Axios.get(urlcat)
      .then((res) => setDataCat(res.data))
      .catch((err) => console.log(err));
    setLoading1(false);
  };

  const getArticles = () => {
    Axios.get(urlart)
      .then((res) => setDataArt(res.data))
      .catch((err) => console.log(err));
    setLoading2(false);
  };

  useEffect(() => {
    getCategories();
    getArticles();
  }, []);

  const handleSearch = (e) => {
    if (e.target.value === "") {
      setIsSearching(false);
      setValue(e.target.value);
    } else {
      setValue(e.target.value);
      setIsSearching(true);
    }
  };
  
  const [state, setState] = useState({
    isOpen: Boolean(false),
  });

  const [state1, setState1] = useState({
    isOpen: Boolean(false),
  });


  if (isLoading1 && isLoading2) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  } else {
    isLoading = false;

    return (
      <>
        <Container fluid>
   
          <Col xs={12} sm={12} md={8} xl={8} id="page-content-wrapper" className="nopadding">
                    <Row> 
                   
                        <Navbar  className=" justify-content-center border-bottom border-left w-100" expand="lg" style={{  boxShadow:'inset -1px 0 0 rgba(0, 0, 0, .1)',}}>
                        <Navbar.Brand href="#home"><AiFillHome  className="icon" style={{width:'1.7em',height:'1.7em'}}/></Navbar.Brand>
                        <Nav className="mr-auto " >
                        <Nav.Link href=""  ><p className="homeBtn" >Home</p></Nav.Link>
                        </Nav>
                        <Nav.Item className="navItem">
                       
                    <div style={{ alignContent: "flex-end", float: "left" }}>
                      <Form inline>
                        <FormControl
                          type="text"
                          placeholder="Search"
                          className="searchForm"
                          onChange={handleSearch}
                          style={{
                            marginRight:'0%', 
                            
                            borderLeft: 0,
                            borderTop: 0,
                            borderRight: 0,
                            borderColor: "#176cd4",
                            borderRadius: "0em"}}
                        />
                      </Form>
                    </div>
                        </Nav.Item>                               
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Item className="navItem">
                        <Nav.Link
                        onClick={() => setState1({ isOpen: true })}
                        style={{ textAlign:'center' }} >
                            Ajouter article
                        </Nav.Link >
                        </Nav.Item>
                        <Nav.Item className="navItem">
                        <Nav.Link
                         onClick={() => setState({ isOpen: true })}
                        style={{textAlign:'center'  }}>
                            Ajouter catégorie
                        </Nav.Link>
                        </Nav.Item>
                        </Nav>
                        </Navbar.Collapse>    
                        <Nav.Item>
                        <Form className="searchForm1" inline>
                        <FormControl type="text" 
                        onChange={handleSearch} 
                        placeholder="Search" 
                        className="searchBar1" style={{
                                marginRight:'3em', 
                                borderLeft: 0,
                                borderTop: 0,
                                borderRight: 0,
                                borderColor: "#176cd4",
                                borderRadius: "0em"}}/>
                            </Form>
                            </Nav.Item>                 
                        </Navbar>
                        <AjouterCat
        handleOpen={state.isOpen}
        handleClose={() => setState({ isOpen: false })}
      />
      <AjouterArt
        handleOpen={state1.isOpen}
        handleClose={() => setState1({ isOpen: false })}
      />
       
                     {!isSearching ? (
                    <Row style={{marginLeft:'1em'}}>
                    <Col style={{ marginTop: "5%", marginLeft: "5%" }}>
                    <TousArticle
                      dataCat={dataCat}
                      dataArt={dataArt}
                      isLoading={isLoading}
                    ></TousArticle>
                    </Col>
                    </Row>
                  ) : (
                    <Row style={{marginLeft:'4em'}}>
                    <ArticlesChercher value={value} chercherDans={dataArt} />
                    </Row>
                  )}
        
                    </Row>
                 </Col>
              <Col xs={0} sm={0} md={4} xl={4} id="sidebar-wrapper" className="nopadding">
              <Sidebar />
              </Col>

        </Container>
      </>
    );
  }
}

export default Article;
