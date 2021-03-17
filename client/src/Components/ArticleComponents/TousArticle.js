import React  from 'react'

import def from './img/def.jpg'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
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

function TousArticle(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


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
                   {props.dataCat.map(((data)=> {
                        return (
                          
                          <div  key={data.nom} style={{width:'100%'}}>
                          
                            <h2 style={{fontWeight:'bold'}}>{data.nom}</h2> 
                         
                         <Grid container spacing={2}>
                        {props.dataArt.map((data1)=>{
                           return( 
                             <>
                             <div key={data1.nom} >                    
                            {(data1.id_categorie===data.id)?
                            <div style={{padding:"1em"}}>
                            <Card className={classes.root} key={data1.nomCategorie}>
                              <CardHeader
                               
                                action={
                                  <IconButton aria-label="settings"
                                  aria-controls="long-menu"
                                  aria-haspopup="true"
                                  onClick={handleClick}>
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
                              {/* <CardActions>
                                <Button size="small" color="primary">
                                  Share
                                </Button>
                                <Button size="small" color="primary">
                                  Learn More
                                </Button>
                              </CardActions> */}
                            </Card>
                           
                            </div>: ""}</div>
    </>
                    
                    )
                  })
                }</Grid>
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
