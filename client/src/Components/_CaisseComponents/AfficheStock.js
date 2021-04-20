import React, { useEffect, useState,useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { LoadTicket, LoadStock, LoadStockByCategorie } from "../../actions";
import * as caisseUtils from "../../Utils/Caisse";

import def from "./img/def.jpg";
import Carousel from 'react-elastic-carousel';

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import { Grid, useScrollTrigger } from "@material-ui/core";


import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Pagination from '@material-ui/lab/Pagination';

import { IconButton } from "@material-ui/core";

import {FaArrowCircleUp} from 'react-icons/fa'

const useStyles = makeStyles({
  root: {
    width: "16rem",
    position: "relative",
  },
  media: {
    width: "100%",
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  Paper: {
    width: "97%",
    marginTop: "1em",
  },
  typo: {
    paddingLeft: "1em",
  },
});
const theme = createMuiTheme();

theme.typography.h6 = {
  fontSize: "10px",

  [theme.breakpoints.up("md")]: {
    fontSize: "20px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "10px",
  },
};
theme.typography.h5 = {
  fontSize: "9px",
  fontWeight: "300",

  [theme.breakpoints.up("md")]: {
    fontSize: "19px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "9px",
  },
};

function AfficherStock(props) {
  const [stock, setStock] = useState([]);
  const [selected, setSelected] = useState();
  const [gammes, setGammes] = useState([]);
  const [page, setPage] = useState(1);
  const [stockData, setStockData] = useState([]);
  const nbProduits = 25;
  const dispatch = useDispatch();
  const loadStock = useSelector((state) => state.loadStock);
  const loadStockByCategorie = useSelector(
    (state) => state.loadStockByCategorie
  );

  var src = def;
  const classes = useStyles();
  const isSRC = (data) => {
    if (data === "NULL" || data === null) return true;
    else return false;
  };

  const handleSelected = (data) => {
    setPage(1)

    if (data !== "") {
      setSelected(data);
      dispatch(LoadStockByCategorie(data));
    } else {
      dispatch(LoadStock());
      setSelected();
    }
  };

  useEffect(() => {
    if (loadStock.data.length == 0) dispatch(LoadStock());
  }, []);

  useEffect(() => {
    if (loadStock.data.length > 0 && (stock.length == 0 || gammes.length == 0)) {
      setGammes(caisseUtils.getGammes(loadStock.data));
      setStock(loadStock.data);
    }
  }, [loadStock]);

  useEffect(() => {
    if (props.search) {
      if (selected) dispatch(LoadStockByCategorie(selected, props.search));
      else dispatch(LoadStockByCategorie(null, props.search));
    } else {
      if (selected) setStock(loadStockByCategorie.data);
      else setStock(loadStock.data);
    }
  }, [props.search]);

  useEffect(() => {
    if (props.search || selected) {
      setStock(loadStockByCategorie.data);
    }else 
      setStock(loadStock.data);
  }, [selected, loadStockByCategorie]);

  useEffect(async ()=>{
    setStockData(await caisseUtils.getStock(page, nbProduits, stock))
  },[page, loadStock, stock])

  const trigger=useScrollTrigger();
 const [show, setShow] = useState(trigger?true: false)
 
window.addEventListener('scroll', ()=>{
  if (!show && window.pageYOffset > 300){
    setShow(true)
  } else if (show&& window.pageYOffset <= 300){
    setShow(false)
  }
})
  return (
    <>
    <Carousel itemsToShow={3} pagination={false} >
        {gammes.map((data, index) => (
          <div className="WrappedItems" key={index} >
            {selected == data ? (
              <Button
                key={index}
                variant="contained"
                style={{ width: "17em", backgroundColor: "#00bcd4" }}
                onClick={() => handleSelected("")}
              >
                <p>{data}</p>
              </Button>
            ) : (
              <Button
                key={index}
                variant="contained"
                style={{ width: "17em" }}
                onClick={() => handleSelected(data)}
              >
                <p>{data}</p>
              </Button>
            )}
          </div>
          
        ))}
</Carousel>
      <br />
      <hr />
      <div >
      <Grid container spacing={2} >
        {stockData ? stockData.map((data1, index) => {
          if(data1)
            return (
            <Grid item lg={3} md={4} xl={3} sm={4} xs={4} key={index}>
              <div key={index} onClick={() => dispatch(LoadTicket(data1))}>
                <div style={{ padding: "5%" }}>
                  <Card className={classes.root} style={{ width: "100%" }}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={isSRC(data1.image) ? src : data1.image}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "0px",
                          right: "0px",
                          height: "20%",
                          borderRadius: "2em 0em 0em 2em",
                          width: "50%",
                          color: "white",
                          backgroundColor: "#00bcd4",
                        }}
                      >
                        <ThemeProvider theme={theme}>
                          <Typography
                            noWrap
                            gutterBottom
                            variant="h6"
                            component="h6"
                            style={{
                              color: "white",
                              marginLeft: "15%",
                              paddingTop: "5%",
                            }}
                          >
                            {data1.prix_ttc.toFixed(3)}DT
                          </Typography>
                        </ThemeProvider>
                      </div>
                      <ThemeProvider theme={theme}>
                        <Typography
                          noWrap
                          gutterBottom
                          variant="h5"
                          style={{ marginTop: "1em", fontSize: "120%" }}
                        >
                          {data1.libelle}
                        </Typography>
                      </ThemeProvider>
                    </CardActionArea>
                  </Card>
                </div>
              </div>
            </Grid>
          )
        }) : ""}
      </Grid>
      </div>

      <hr />

      {stock.length > 0 ? 
        <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
          <Pagination 
            count={parseInt(stock.length / nbProduits,10) + 1} 
            page={page} 
            defaultPage={1} 
            size="large" 
            variant="outlined" 
            color="primary" 
            onChange={(_,e)=> {
              if(e!== page) {
                setPage(e);
                window.scrollTo(0, 0);
              }
            }} 
          />
        </div> 
      : ""}
    
<IconButton onClick={()=>{ window.scrollTo({top: 0, behavior: 'smooth'});}} style={{height: '6em',width:'6em', display: show ? 'flex' : 'none'}}>
  <FaArrowCircleUp className="BackToTop"/>
</IconButton>
    </>
  );
}

export default AfficherStock;
