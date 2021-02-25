import React, {useState, useEffect} from 'react'
import './css/Article.css'
import{Container,  Row, Col, Spinner,Navbar,Form,FormControl} from 'react-bootstrap'
import Navbarup from './ArticleComponents/Navbarup.js'
import Sidebar from './ArticleComponents/Sidebar.js'
import Axios from 'axios'
import TousArticle from './ArticleComponents/TousArticle.js'
import ArticlesChercher from './ArticleComponents/ArticleChercher.js'
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


    const getCategories=()=>{
    Axios.get(urlcat)
        .then(res => setDataCat([res.data]))
        .catch(err=>console.log(err))
    setLoading1(false)
}


   const getArticles=()=>{
   Axios.get(urlart)
   .then(res => setDataArt([res.data]))
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
                <Col  xs={9} id="page-content-wrapper" className="nopadding" > 
                    <Row>  <Col  xs={12} id="page-content-wrapper">


                        <Navbar className="bg-light justify-content-between" expand="lg" style={{  boxShadow:'inset -1px 0 0 rgba(0, 0, 0, .1)'}}>
                        <Navbarup/>
                        <div style={{alignContent:'flex-end',float:'left'}}>
                        <Form inline >  
                        <FormControl type="text" placeholder="Search"  className="mr-sm-2" onChange={handleSearch}  style={{borderRadius:'0.8em'}}/>
                        </Form>
                        </div> 
                        </Navbar>


                        </Col> </Row>
                    <Row>
                    <Col style={{marginTop:'5%',marginLeft:'5%'}}>
                            { !isSearching ?
                      <TousArticle dataCat={dataCat} dataArt={dataArt}  isLoading={isLoading}></TousArticle>
                           :
                          <ArticlesChercher value={value}  chercherDans={dataArt} /> }
                    </Col>
                    </Row>
                     </Col>
                    <Col  xs={3} id="sidebar-wrapper" className="nopadding" >
                    <Sidebar />
                    </Col>
                </Row>
    </Container>
    </>
    );}
    
}

export default Article