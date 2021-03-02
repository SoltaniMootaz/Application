import React  from 'react'
import { Row, Card, Col, Image} from 'react-bootstrap'
import def from './img/def.jpg'
import PropTypes from 'prop-types';



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
                            <Row style={{color:'#0d478f', textTransform:'uppercase',marginTop:'5%',marginLeft:'1rem'}}>
                              
                            <h3 >{data.nom}</h3> 
                           

                            </Row>
                            
                          <Row >
                       
                        {props.dataArt.map((data1)=>{
                           return( 
                            <div key={data1.nom}>                    
                            {(data1.nomCategorie===data.nom)?
                              
                              <Col xs={3}  key={data1.nomCategorie} style={{padding:'1em'}} >
                                      
                                    
                               
                                     <div>
                                           

                                     <div className="card"  style={{ width: '14rem' ,border:'0px'}} >
                                    <img alt="Avatar"  as={Image} variant="top" src={isSRC(data1.image) ? src: data1.image} className='border-bottom border-dark'  style={{height:'150px'}} />
                                    <div className="container">
                                        <h4><b><center>{data1.nom}</center></b></h4> 
                                       
                                    </div>
                                    </div>
               
                                    </div> 
                
                        
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
TousArticle.propTypes = {
  dataArt: PropTypes.array,
  dataCat: PropTypes.array
};
export default TousArticle
