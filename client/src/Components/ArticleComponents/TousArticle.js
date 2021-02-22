import React  from 'react'
import { Row, Card, Col, Image} from 'react-bootstrap'
import def from './img/def.jpg'



function TousArticle(props) {
  var src=def;

  const isSRC=(data)=>{
    if (data == null) {
      return true;
    }else return false;
  };
if(!props.isLoading){
    return (
        <>
      {props.dataCat.map((data)=> {
         return (<>
         <Row key={data.nom}  style={{marginLeft:'5%', color:'#00886C', textTransform:'uppercase'}}>
           <h3>{data.nom}</h3> 
           </Row>
     <Row style={{marginLeft:'4%'}}>
        {
           props.dataArt.map((data1)=>{
             
             return(
               <>
              {(data1.nomCategorie===data.nom)?
                 <Col xs={3}  key={data1.nomCategorie} >
                               
                            
                                 
                               
                 <Card   key={data1.nom} style={{ width: '15rem' }}>
           
                  <Card.Img as={Image} variant="top" src={isSRC(data1.image) ? src: data1.image}  key={data1.image} style={{height:'150px'}}/>
                    <Card.Body>
                      
                        <Card.Title  key={data1.nom}>{data1.nom}</Card.Title>                
                    </Card.Body>
                </Card> 
                 
                  </Col>: ""}</>
              
            
             )
           })
        }
     </Row> 
     <hr></hr> 
     </>
     ) } )}
        </>
    )}
}

export default TousArticle
