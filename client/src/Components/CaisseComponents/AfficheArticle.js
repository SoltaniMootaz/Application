import React,{useState} from 'react'
import { Row, Card, Col, Image} from 'react-bootstrap'
import def from './img/def.jpg'
import PropTypes from 'prop-types';

function AfficheArticle(props) {
    var array=new Array();

    var src=def;
    const isSRC=(data)=>{
        if (data == null) return true
        else return false
    };
    const handleClick=(a)=>
 
    {
        array.push(a)
        props.handleTicketClick(array);
    }
  
    return (
        < >
               
               {props.dataArt.map((data1,index)=>{
                           return( 
                            <div key={index} >                    
                            
                              <Col xs={3}  key={data1.nomCategorie} style={{padding:'1em'}} >
                                      
                                    
                               
                                     <div>
                                           

                                     <div className="card"  style={{ width: '14rem' ,border:'0px'}} onClick={()=>handleClick(props.dataArt[index])}>
                                    <img alt="Avatar"  as={Image} variant="top" src={isSRC(data1.image) ? src: data1.image} className='border-bottom border-dark'  style={{height:'150px'}} />
                                    <div className="container">
                                        <h4><b><center>{data1.nom}</center></b></h4> 
                                       
                                    </div>
                                    </div>
               
                                    </div> 
                
                        
                          </Col></div>
                      
                    
                    )
                  })
                }
        </>
    )
}

export default AfficheArticle
