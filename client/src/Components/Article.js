import React, {useState, useEffect} from 'react'
import './css/Article.css'
import{Container,  Row, Col, Spinner,Navbar,Form,FormControl,Nav,AccordionToggle} from 'react-bootstrap'
import Navbarup from './ArticleComponents/Navbarup.js'
import Sidebar from './ArticleComponents/Sidebar.js'
import Axios from 'axios'
import TousArticle from './ArticleComponents/TousArticle.js'
import ArticlesChercher from './ArticleComponents/ArticleChercher.js'
import AjouterCat from "./ArticleComponents/ajouterCategorie";
import AjouterArt from "./ArticleComponents/ajouterArticle";
function Article() {
    const urlcat="http://localhost:3001/api/afficherCategorie";
    const urlart="http://localhost:3001/api/afficherArticles&";
    var isLoading=true;
 

    const [dataCat,setDataCat]=useState([]);
    const [dataArt,setDataArt]=useState([]);
    const [isLoading1, setLoading1] = useState(true);
    const [isLoading2, setLoading2] = useState(true);
    const [isSearching,setIsSearching]=useState(false);
    const [value,setValue]=useState();

    const [state, setState] = useState({
        isOpen: Boolean(false),
      });
    
      const [state1, setState1] = useState({
        isOpen: Boolean(false),
      });

    const getCategories=()=>{
    Axios.get(urlcat)
        .then(res => setDataCat(res.data))
        .catch(err=>console.log(err))
    setLoading1(false)
}


   const getArticles=()=>{
   Axios.get(urlart)
   .then(res => setDataArt(res.data))
   .catch(err=>console.log(err))
   setLoading2(false)
}


    useEffect(() => {
        getCategories();
        getArticles();
      
                 }, [])

                 const handleSearch=(e)=>{
                     if (e.target.value===""){
                
                      setIsSearching(false);
                      setValue(e.target.value)
                    }
                    else {
                    setValue(e.target.value)
                    setIsSearching(true);
                    
                    }
                }
            
        
     if(isLoading1&&isLoading2){
     return (<Spinner animation="border" role="status">
     <span className="sr-only">Loading...</span>
   </Spinner>);

      }else{     
      isLoading=false;
      
    return (
        <>
     <Container fluid>
                <Row>
                <Col  xs={12} sm={12} md={9} xl={9} id="page-content-wrapper" className="nopadding" > 
                    <Row>  <Col  xs={12} sm={12} md={12} xl={12} id="page-content-wrapper">
                    <Navbar className=" justify-content-center border-bottom " expand="lg" style={{  boxShadow:'inset -1px 0 0 rgba(0, 0, 0, .1)',}}>
                    <Navbarup/>
                    <Nav.Item className="navItem">
                        <Form className="searchForm" inline>
                        <FormControl type="text" placeholder="Search" onChange={handleSearch} className="searchBarr" style={{
                            marginRight:'3em',
                            borderLeft: 0,
                            borderTop: 0,
                            borderRight: 0,
                            borderColor: "#176cd4",
                            borderRadius: "0em",
                        }}/>
                        </Form>
                        </Nav.Item>
                        
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Item className="navItem">
                        <Nav.Link
                        style={{ textAlign:'center' }}
                        onClick={() => setState1({ isOpen: true })}
                        >
                        Ajouter article
                        </Nav.Link >
                        </Nav.Item>
                        <Nav.Item className="navItem">
                        <Nav.Link
                        style={{textAlign:'center'  }}
                        onClick={() => setState({ isOpen: true })}
                        >
                        Ajouter catégorie
                        </Nav.Link>
                        </Nav.Item>
                        </Nav>
                        </Navbar.Collapse>    
                        <Nav.Item>
                        <Form className="searchForm1" inline>
                        <FormControl type="text" placeholder="Search" onChange={handleSearch} className="searchBar1" style={{
                            marginRight:'3em', 
                            borderLeft: 0,
                            borderTop: 0,
                            borderRight: 0,
                            borderColor: "#176cd4",
                            borderRadius: "0em",
                        }}/>
                        </Form>
                        </Nav.Item>                 
                        </Navbar>

                        
                     
      

                        </Col> </Row>
                    <Row>
                        <Col style={{marginTop:'5%',marginLeft:'5%'}} >
                            { !isSearching ?
                            <TousArticle dataCat={dataCat} dataArt={dataArt}  isLoading={isLoading}></TousArticle>
                            :
                            <ArticlesChercher value={value}  chercherDans={dataArt} /> }
                        </Col>
                    </Row>
                     </Col>
                    <Col   sm={3} md={3} xl={3}  id="sidebar-wrapper" className="nopadding" >
                    <Sidebar />
                    </Col>
                </Row>
    </Container>
    <AjouterCat
        handleOpen={state.isOpen}
        handleClose={() => setState({ isOpen: false })}
        />
        <AjouterArt
        handleOpen={state1.isOpen}
        handleClose={() => setState1({ isOpen: false })}
      />
    </>
    );}
}

export default Article