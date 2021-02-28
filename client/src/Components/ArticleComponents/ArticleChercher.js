import React from 'react'
import { Row, Card, Col, Image} from 'react-bootstrap'
import def from './img/def.jpg'
function ArticleChercher(props) {
  const article = props.chercherDans.filter(
    (art) =>
      art.nomCategorie.toLowerCase().indexOf(props.value) > -1 ||
      art.nom.toLowerCase().indexOf(props.value) > -1
  );
  console.log(article);

  var src = def;

  const isSRC = (data) => {
    if (data == null) {
      return true;
    } else return false;
  };

    return (
        <>
        <Row>
            {article.map((data1)=>{
                           return( 
                           <div key={data1.nom}>                    
                           
                            <Col xs={3}  key={data1.nomCategorie} style={{padding:'1em'}}>               
                        <Card    style={{ width: '14rem' }}>
                  
                        <Card.Img as={Image} variant="top" src={isSRC(data1.image) ? src: data1.image} className='border-bottom border-dark'  style={{height:'150px'}}/>
                            <Card.Body className="bg-light">
                              
                                <Card.Title ><center>{data1.nom}</center></Card.Title>                
                            </Card.Body>
                        </Card> 
                          </Col>
                          </div>)
                          }
                 )         
            } 
            </Row>
        </>
    )
}

export default ArticleChercher;
