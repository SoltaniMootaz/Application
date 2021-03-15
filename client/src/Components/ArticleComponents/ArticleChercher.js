import React from 'react'
import { Row, Card, Col, Image} from 'react-bootstrap'
import def from './img/def.jpg'
function ArticleChercher(props) {
  const article = props.articles.filter((art) =>
      art.nom.toLowerCase().indexOf(props.value) > -1
  );

  var src = def;

  const isSRC = (data) => {
    if (data == null) {
      return true;
    } else return false;
  };
  const handleClick=(a)=>
  {
      //if(!array.includes(a)) {
          props.handleTicketClick(a);
      //}
  }

    return (
        <>
        <Row>
            {article.map((data1,index)=>{
                return( 
                    <div key={index}>                    
                    
                        <Col xs={3}   style={{padding:'1em'}}>               
                    <Card  style={{ width: '14rem' }} >
            
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
