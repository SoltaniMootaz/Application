import React  from 'react'
import { Row, Card, Col, Image} from 'react-bootstrap'
import def from './img/def.jpg'



function TousArticle(props) {
  
  var src=def;
  console.log(props.dataCat);
  const isSRC=(data)=>{
      if (data == null) {
      return true;
      }
      else return false;};


       if(!props.isLoading){
               return (
                <>
                   {props.dataCat.map(((data)=> {
                        return (<div  key={data.nom} >
                           <Row style={{marginLeft:'5%', color:'#00886C', textTransform:'uppercase'}}>
                           <h3>{data.nom}</h3> 
                           </Row>
            
                          <Row style={{marginLeft:'4%'}}>
                       
                        {props.dataArt.map((data1)=>{
                           return( <div key={data1.nom}>                    
                           {(data1.nomCategorie===data.nom)?
                            <Col xs={3}  key={data1.nomCategorie} >
                                      
                                    
                                        
                                      
                        <Card    style={{ width: '15rem' }}>
                  
                          <Card.Img as={Image} variant="top" src={isSRC(data1.image) ? src: data1.image}   style={{height:'150px'}}/>
                            <Card.Body>
                              
                                <Card.Title >{data1.nom}</Card.Title>                
                            </Card.Body>
                        </Card> 
                        
                          </Col>: ""}</div>
                      
                    
                    )
                  })
                }
            </Row> 
            <hr></hr> 
            </div>
            ) }) )}
                </>
            )}
}

export default TousArticle
