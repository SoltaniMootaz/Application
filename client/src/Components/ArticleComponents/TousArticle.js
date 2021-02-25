<<<<<<< HEAD
import React  from 'react'
import { Row, Card, Col, Image} from 'react-bootstrap'
import def from './img/def.jpg'



function TousArticle(props) {
  
  var src=def;
  console.log(props.dataCat);
=======
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
>>>>>>> 49b9f916b9040913d56d6cbdf4b7e011492ed915
  const isSRC=(data)=>{
      if (data == null) {
      return true;
      }
      else return false;};


       if(!props.isLoading){
               return (
                <>
<<<<<<< HEAD
                   {props.dataCat.map(((data)=> {
                        return (<div  key={data.nom} >
                           <Row style={{marginLeft:'5%', color:'#00886C', textTransform:'uppercase'}}>
                           <h3>{data.nom}</h3> 
=======
                   {props.dataCat.map((data)=> {
                        return (<div  key={data.nom} >
                           <Row style={{marginLeft:'5%', color:'#00886C', textTransform:'uppercase',width:'100%'}}>
                           <h3>{data.nom}</h3> 
                           
>>>>>>> 49b9f916b9040913d56d6cbdf4b7e011492ed915
                           </Row>
            
                          <Row style={{marginLeft:'4%'}}>
                       
                        {props.dataArt.map((data1)=>{
                           return( <div key={data1.nom}>                    
                           {(data1.nomCategorie===data.nom)?
                            <Col xs={3}  key={data1.nomCategorie} >
                                      
                                    
                                        
                                      
<<<<<<< HEAD
                        <Card    style={{ width: '15rem' }}>
                  
                          <Card.Img as={Image} variant="top" src={isSRC(data1.image) ? src: data1.image}   style={{height:'150px'}}/>
                            <Card.Body>
                              
                                <Card.Title >{data1.nom}</Card.Title>                
=======
                        <Card    style={{ width: '10rem' ,border:'0'}}>
                  
                          <Card.Img as={Image} variant="top" src={isSRC(data1.image) ? src: data1.image}   style={{height:'8em'}}/>
                            <Card.Body>
                              
                                <Card.Title style={{textAlign:'center'}}>{data1.nom} <MdDelete style={{width:'1.5em',height:'1.5em',color:'red',cursor:'pointer'}}
                           onClick={DeleteCat(data1.nom)}/></Card.Title>   .
                                             
>>>>>>> 49b9f916b9040913d56d6cbdf4b7e011492ed915
                            </Card.Body>
                        </Card> 
                        
                          </Col>: ""}</div>
                      
                    
                    )
                  })
                }
            </Row> 
            <hr></hr> 
            </div>
<<<<<<< HEAD
            ) }) )}
=======
            ) } )}
>>>>>>> 49b9f916b9040913d56d6cbdf4b7e011492ed915
                </>
            )}
}

export default TousArticle
