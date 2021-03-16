import React from 'react'
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

function ArticleChercher(props) {

  
  const article = props.chercherDans.filter(
    (art) =>
      art.nomCategorie.toLowerCase().indexOf(props.value) > -1 ||
      art.nom.toLowerCase().indexOf(props.value) > -1
  );
  console.log(article);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick1 = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  const classes = useStyles();
  var src = def;

  const isSRC = (data) => {
    if (data == null) {
      return true;
    } else return false;
  };
  

    return (
        <>
        <Grid container spacing={3}>
            {article.map((data1,index)=>{

                           return( 
                            <div key={index} >                    
                          
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
  )
                          }
                 )         

            } 
           </Grid>
        </>
    )
}

export default ArticleChercher;
