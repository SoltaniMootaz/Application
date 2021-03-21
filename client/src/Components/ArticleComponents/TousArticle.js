import React  from 'react'

import def from './img/def.jpg'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Grid} from '@material-ui/core';
import { Divider, Menu , MenuItem, Paper } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { MdDelete } from "react-icons/md";

import axios from 'axios';
const useStyles = makeStyles((theme)=>({
  root: {
    width: '16rem',
    margin: theme.spacing(1)
  },
  media: {
    width:'100%',
    height: 0,
    paddingTop: '70%', // 16:9
  },
  menu: {
   
  },
  Paper:{
    width:'97%',
    marginTop:'1em'
  },
  typo:{
    paddingLeft:'1em'
  },
}));

function TousArticle(props) {
  



 

  const classes = useStyles();
  var src=def;
 
  const isSRC=(data)=>{
      if (data == null) {
      return true;
      }
      else return false;};
      
       if(!props.isLoading){
               return (
                <>
                   {props.dataCat.data.map(((data,index)=> {
                        return (
                          <Paper className={classes.Paper} >
                          <div  key={data.nom} style={{width:'100%'}}>
                            <Accordion square defaultExpanded={index===0}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                             
                            >
                        <Typography variant="h4" className={classes.typo}>{data.nom}</Typography>
                            </AccordionSummary>
                                                
                         
                         
                         <AccordionDetails >
                         <Grid container spacing={2} > 
                        {props.dataArt.data.map((data1)=>{
                           return( 
                             <>
                            
                             <div key={data1.id_categorie} style={{marginLeft:'0em',paddingTop:'1em'}}>                    
                            {(data1.id_categorie===data.id)?
                            <Grid item>
                            <Card className={classes.root} key={data1.nomCategorie}>
                              <CardHeader
                               
                                action={
                                  <IconButton aria-label="delete">
                                    <MdDelete  onClick={(e)=>{
                                      window.location.reload(false);
                                  axios.delete("http://localhost:3001/api/deletearticle/"+data1.id).then((res)=>console.log(res)).catch((err)=>{console.log(err.response.data);})
                                 // window.location.reload(false);
                                }
                                  } />
                                  </IconButton>
                                }
                                title={data1.nom}
                                subheader={data1.prix}
                              />
                              
                             
                              <CardActionArea>
                                <CardMedia
                                  className={classes.media}
                                  image={isSRC(data1.image) ? src: data1.image}
                                 
                                />
                               
                              </CardActionArea>
                             </Card>
                           
                            </Grid>: ""}</div>
   
    </>
                    
                    )
                  })
                } </Grid>
                </AccordionDetails>
               
                </Accordion>
            </div>
            </Paper>
           ) }) )}
  
                </>
            )}
}
TousArticle.propTypes = {
  dataArt: PropTypes.array,
  dataCat: PropTypes.array
};
export default TousArticle
