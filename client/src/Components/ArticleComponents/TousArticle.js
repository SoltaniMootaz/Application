import React,{useState} from 'react'
import { Row, Card, Col, Image} from 'react-bootstrap'
import def from './img/def.jpg'
import {MdDelete} from 'react-icons/md'
import Axios from 'axios'

function TousArticle(props) {
  const [url,setUrl]=useState("http://localhost:3001/api/deleteArt/")

  var src=def;
  function DeleteCat(name){
    window.location.reload(false);
console.log(name);
    Axios.delete(url, { params:{ nom: name} }).then(res => {
      
        console.log(res.data);
      }).catch(res=>{console.log(res);})
  }
  const isSRC=(data)=>{
      if (data == null) {
      return true;
      }
      else return false;};


       if(!props.isLoading){
               return (
                <>
                   {props.dataCat.map((data)=> {
                        return (<div  key={data.nom} >
                           <Row style={{marginLeft:'5%', color:'#00886C', textTransform:'uppercase',width:'100%'}}>
                           <h3>{data.nom}</h3> 
                           
                           </Row>
            
                          <Row style={{marginLeft:'4%'}}>
                       
                        {props.dataArt.map((data1)=>{
                           return( <div key={data1.nom}>                    
                           {(data1.nomCategorie===data.nom)?
                            <Col xs={3}  key={data1.nomCategorie} >
                                      
                                    
                                        
                                      
                        <Card    style={{ width: '10rem' ,border:'0'}}>
                  
                          <Card.Img as={Image} variant="top" src={isSRC(data1.image) ? src: data1.image}   style={{height:'8em'}}/>
                            <Card.Body>
                              
                                <Card.Title style={{textAlign:'center'}}>{data1.nom} <MdDelete style={{width:'1.5em',height:'1.5em',color:'red',cursor:'pointer'}}
                           onClick={DeleteCat(data1.nom)}/></Card.Title>   .
                                             
                            </Card.Body>
                        </Card> 
                        
                          </Col>: ""}</div>
                      
                    
                    )
                  })
                }
            </Row> 
            <hr></hr> 
            </div>
            ) } )}
                </>
            )}
}

export default TousArticle
