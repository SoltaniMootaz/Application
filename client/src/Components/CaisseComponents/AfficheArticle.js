import React,{useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { LoadTicket } from '../../actions'

import def from './img/def.jpg'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Grid, Paper} from '@material-ui/core';
import { Divider, Menu , MenuItem } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const useStyles = makeStyles({
  root: {
    width: '16rem',
    
  },
  media: {
    width:'100%',
    height: 0,
    paddingTop: '70%', // 16:9
  },
  menu: {
    shadows: ["none"]
  }, Paper:{
    width:'97%',
    marginTop:'1em'
  },
  typo:{
    paddingLeft:'1em'
  },
});
  
function AfficheArticle(props) {
   
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();


  const handleClick1 = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    
    var src=def;
    const classes = useStyles();
    const isSRC=(data)=>{
        if (data == null) return true
        else return false
    };

    const handleClick=(a)=>
    {
      dispatch(LoadTicket(a,"ajouter menu"));
    }
    console.log(props.dataCat);
  
    return ( <>
      {props.dataCat.map(((data,index)=> {
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
           {props.dataArt.map((data1)=>{
                           return( <>
                            {(data1.id_categorie===data.id)?
                              <div key={index} onClick={()=>handleClick(data1)}>                    
                          
                          <div style={{padding:"1em"}}>
                          <Card className={classes.root} key={data1.nomCategorie}>
                            <CardHeader
                             
                              action={
                                <IconButton aria-label="settings"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={handleClick1}>
                                  <MoreVertIcon />
                                </IconButton>
                              }
                              title={data1.nom}
                              subheader={data1.prix}
                            />
                            <Menu
                            id="long-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={open}
                            onClose={handleClose}
                            className={classes.menu}
                             >
                              <MenuItem  onClick={handleClose} style={{color:'blue'}}>modifier</MenuItem><Divider />
                              <MenuItem  onClick={handleClose} style={{color:'red'}}>effacer</MenuItem>
                          </Menu>
                            <CardActionArea>
                              <CardMedia
                                className={classes.media}
                                image={isSRC(data1.image) ? src: data1.image}
                              />
                             
                            </CardActionArea>
                            
                          </Card>
                         
                          </div></div>
: ""}
                      
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
    )
}

export default AfficheArticle
