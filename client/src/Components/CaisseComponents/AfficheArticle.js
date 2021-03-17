import React,{useState, useEffect} from 'react'

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
import { Divider, Menu , MenuItem } from '@material-ui/core';
const useStyles = makeStyles({
  root: {
    width: '16rem',
    
  },
  media: {
    width:'100%',
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  menu: {
    shadows: ["none"]
  },
});
  
function AfficheArticle(props) {
   
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

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

    const handleClick=(a,i)=>
    {
        props.handleTicketClick(a,i);
    }
  
    return (

               <Grid container spacing={3}>
      
               {props.dataArt.map((data1,index)=>{
                           return( <>
                              <div key={index}>                    
                          
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
                                onClick={()=>handleClick(props.dataArt[index],index)}
                              />
                             
                            </CardActionArea>
                            {/* <CardActions>
                              <Button size="small" color="primary">
                                Share
                              </Button>
                              <Button size="small" color="primary">
                                Learn More
                              </Button>
                            </CardActions> */}
                          </Card>
                         
                          </div></div>

                        {/*     <div key={index} >                    
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
                           */}
                    </>
                    )
                  })
                }
                </Grid>

    )
}

export default AfficheArticle
