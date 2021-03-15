import React,{useState, useEffect} from 'react'
import { Row, Card, Col, Image} from 'react-bootstrap'
import def from './img/def.jpg'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  
function AfficheArticle(props) {
    console.log(props.dataArt);
    
    var src=def;
    const classes = useStyles();
    const isSRC=(data)=>{
        if (data == null) return true
        else return false
    };

    const handleClick=(a,i)=>
    {
        props.handleTicketClick(a,i);
    }
  
    return (
        <div className={classes.root} style={{marginLeft:'3em'}}>
               <Grid container spacing={3}>
      
               {props.dataArt.map((data1,index)=>{
                           return( 
                            <div key={index} >                    
                            <Grid item xs={6} sm={3} style={{padding:'1em'}}>
                        
                                     <div>
                                           

                                     <div className="card"  style={{ width: '14rem' ,border:'0px'}} onClick={()=>handleClick(props.dataArt[index],index)}>
                                    <img alt="Avatar"  as={Image} variant="top" src={isSRC(data1.image) ? src: data1.image} className='border-bottom border-dark'  style={{height:'150px'}} />
                                    <div className="container">
                                        <h4><b><center>{data1.nom}</center></b></h4> 
                                       
                                    </div>
                                    </div>
               
                                    </div> 
                
                        
                     </Grid></div>
                      
                    
                    )
                  })
                }
                </Grid>
        </div>
    )
}

export default AfficheArticle
