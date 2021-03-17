import React from 'react'

import def from './img/def.jpg';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardMedia from '@material-ui/core/CardMedia';

import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Grid} from '@material-ui/core';
import { Divider, Menu , MenuItem,makeStyles,Typography } from '@material-ui/core';
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
  cardHeaderRoot: {
    overflow: "hidden"
  },
  cardHeaderContent: {
    overflow: "hidden"
  }
});
function RechercheProd(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick1 = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };




  const article = props.chercherDans.filter(
    (art) =>
      art.libelle.toLowerCase().indexOf(props.value) > -1  );
  console.log(article);
  const classes = useStyles();
  var src = def;

  const isSRC = (data) => {
    if ((data == null)||(data==="")) {
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
        <Grid container >
                    {article.map((data1,index)=>{
                           return( 
                            <div key={index} >                    
                            
                            <div style={{padding:"1em"}}>
                          <Card className={classes.root} key={data1.nomCategorie} style={{Height:'25em'}}>
                            <CardHeader
                             classes={{
                              root: classes.cardHeaderRoot,
                              content: classes.cardHeaderContent
                            }}
                             
                              action={
                                <IconButton aria-label="settings"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={handleClick1}>
                                  <MoreVertIcon />
                                </IconButton>
                              }
                              title={
                                <Typography noWrap gutterBottom variant="h6" component="h4">
                                  {data1.libelle}
                                </Typography>
                                }
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
                                onClick={()=>handleClick(article[index],index)}
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
                         
                          </div>
                                     {/* <div>
                                           
       
                                     <div className="card"  style={{ width: '14rem' ,border:'0px'}} onClick={()=>handleClick(article[index],index)}>
                                    <img alt="Avatar"  as={Image} variant="top" src={isSRC(data1.image) ? src: data1.image} className='border-bottom border-dark'  style={{height:'150px'}} />
                                    <div className="container">
                                        <h4><b><center>{data1.libelle}</center></b></h4> 
                                       
                                    </div>
                                    </div>
               
                                    </div>  */}
                
                        
                </div>
                      )
                          }
                 )         
            } 
            </Grid>
      
        </>
    )
}

export default RechercheProd;
