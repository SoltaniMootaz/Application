import React  from 'react'
import { Row, Card, Col, Image} from 'react-bootstrap'
import def from './img/def.jpg'



function TousArticle(props) {
  
  var src=def;
  const isSRC=(data)=>{
      if (data == null) {
      return true;
      }
      else return false;};


       if(!props.isLoading){
               return (
                <>
                   {props.dataCat.map(((data)=> {
                        return (
                          <div  key={data.nom} >
                            <Row style={{color:'#00886C', textTransform:'uppercase'}}>
                              
                            <h3>{data.nom}</h3> 
                           

                            </Row>
                            
                          <Row >
                       
                        {props.dataArt.map((data1)=>{
                           return( 
                            <div key={data1.nom}>                    
                            {(data1.nomCategorie===data.nom)?
                              <Col xs={3}  key={data1.nomCategorie} style={{padding:'1em'}}>
                                      
                                    
                                        
                                      
                        <Card    style={{ width: '14rem' ,border:'0px'}}>
                  
                          <Card.Img as={Image} variant="top" src={isSRC(data1.image) ? src: data1.image} className='border-bottom border-dark'  style={{height:'150px'}}/>
                            <Card.Body className="bg-light">
                              
                                <Card.Title ><center>{data1.nom}</center></Card.Title>                
                            </Card.Body>
                        </Card> 
                        
                          </Col>: ""}</div>
                      
                    
                    )
                  })
                }
            </Row> 
           
            </div>
            ) }) )}
                </>
            )}
}

export default TousArticle
