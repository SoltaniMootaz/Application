import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LoadTicket, LoadStock } from "../../actions";

import def from "./img/def.jpg";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import CardMedia from "@material-ui/core/CardMedia";

import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Grid } from "@material-ui/core";
import { Divider, Menu, MenuItem, Typography,Paper } from "@material-ui/core";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const useStyles = makeStyles({
  root: {
    width: "16rem",
    position:'relative'
  },
  media: {
    width: "100%",
    height: 0,
    paddingTop: "56.25%", // 16:9
    },Paper:{
      width:'97%',
      marginTop:'1em'
    },
    typo:{
      paddingLeft:'1em'
    },
});

function AfficherStock() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [stock, setStock] = useState();

  const dispatch = useDispatch();
  const loadStock = useSelector((state) => state.loadStock);

  const open = Boolean(anchorEl);

  const handleClick1 = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  var src = def;
  const classes = useStyles();
  const isSRC = (data) => {
    if (data == "NULL") return true;
    else return false;
  };

  useEffect(() => {
    dispatch(LoadStock());
  }, [dispatch]);

  useEffect(()=> {
    afficheStock();
  },[loadStock.data])

  const handleClick = (a) => {
    dispatch(LoadTicket(a));
  };

  const afficheStock = () => {
    const G=loadStock.data.map(item=>{return item.gamme_code})
    const Gammes=G.filter((gamme,index)=>{return G.indexOf(gamme)===index})
    
    if (loadStock.data.length > 0)
      setStock(
         Gammes.map((data,index)=> {
          return (
            <>
            <Paper className={classes.Paper} >
            <div  key={data} style={{width:'100%'}}>
              <Accordion square defaultExpanded={index===0}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
               
              >
          <Typography variant="h4" className={classes.typo}>{data}</Typography>
              </AccordionSummary>
                                  
           
           
           <AccordionDetails >
           <Grid container spacing={2} style={{marginLeft:'1em'}}> 

          { loadStock.data.map((data1, index) => {
          return (
            <>
            {(data1.gamme_code===data)?
            <Grid item>
            <div key={index} onClick={() => handleClick(data1)}>
              <div style={{ padding: "1em" }}>
                <Card
                  className={classes.root}
                  style={{ Height: "25em" }}
                >
                 
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={isSRC(data1.image) ? src : data1.image}
                      
                    />
                    <div style={{position: 'absolute',
                                top: '0px',
                                right: '0px',
                                height:'3em',
                                borderRadius:'2em 0em 0em 2em',
                                width:'10em',
                                color: 'white',
                                backgroundColor: '#00bcd4'
                                }}><Typography
                                noWrap
                                gutterBottom
                                variant="h6"
                                component="h6"
                                style={{color:'white',marginLeft:'15%',paddingTop:'.15em'}}
                              >
                                {data1.prix_ttc.toFixed(3)}DT
                              </Typography></div>
                    <Typography
                        noWrap
                        gutterBottom
                        variant="h6"
                        component="h4"
                        
                      >
                        {data1.libelle}
                      </Typography>
                      
                  </CardActionArea>
                </Card>
              </div>
            </div>
            </Grid>:""}</>
          )
        })
      }
       </Grid>
      </AccordionDetails>
     
      </Accordion>
  </div>
  </Paper>
      </>
  )
        }
    ))
  }

  return (
    <>
      <Grid container spacing={3}>
        {stock}
      </Grid>
    </>
  );

}

export default AfficherStock;
