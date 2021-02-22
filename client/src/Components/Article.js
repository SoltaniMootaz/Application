import React, {useState, useEffect} from 'react'
import './css/Article.css'
import{Container,  Row, Col, Spinner} from 'react-bootstrap'
import Navbarup from './ArticleComponents/Navbarup.js'
import Sidebar from './ArticleComponents/Sidebar.js'
import Axios from 'axios'
import TousArticle from './ArticleComponents/TousArticle.js'
function Article() {
    const urlcat="http://localhost:3001/api/afficherCategorie";
    const urlart="http://localhost:3001/api/afficherArticles&";
    var isLoading=true;



    const [dataCat,setDataCat]=useState([]);
    const [dataArt,setDataArt]=useState([]);
    const [isLoading1, setLoading1] = useState(true);
    const [isLoading2, setLoading2] = useState(true);



    const getCategories=()=>{
    Axios.get(urlcat).then(res => setDataCat(res.data)).catch(err=>console.log(err))
    setLoading1(false)
}


   const getArticles=()=>{
   Axios.get(urlart).then(res => setDataArt(res.data)).catch(err=>console.log(err))
   setLoading2(false)
}


    useEffect(() => {
        getCategories();
        getArticles();
      
                 }, [])


        
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
                    <Row>  <Col  xs={12} id="page-content-wrapper"><Navbarup /></Col> </Row>
                    <Row>
                    <Col style={{marginTop:'5%'}}>

                      <TousArticle dataCat={dataCat} dataArt={dataArt}  isLoading={isLoading}></TousArticle>
                    
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
