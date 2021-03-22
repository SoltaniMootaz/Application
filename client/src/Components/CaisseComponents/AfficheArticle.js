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
import { Grid} from '@material-ui/core';
import { Divider, Menu , MenuItem } from '@material-ui/core';
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
  
    return (

               <Grid container spacing={3}>
      
               {props.dataArt.map((data1,index)=>{
                           return( <>
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

                      
                    </>
                    )
                  })
                }
                </Grid>

    )
}

export default AfficheArticle
