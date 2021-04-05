import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LoadTicket, LoadStock, LoadStockByCategorie } from "../../actions";

import def from "./img/def.jpg";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";

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

function AfficherStock(props) {
  const [stock, setStock] = useState([]);
  const [selected, setSelected] = useState();
  const [gammes, setGammes] = useState([])

  const dispatch = useDispatch();
  const loadStock = useSelector((state) => state.loadStock);
  const loadStockByCategorie = useSelector((state) => state.loadStockByCategorie);

  var src = def;
  const classes = useStyles();
  const isSRC = (data) => {
    if (data == "NULL") return true;
    else return false;
  };

  
  const handleSelected = (data) => {
    if(data !== "") {
      setSelected(data)
      dispatch(LoadStockByCategorie(data))
    }else {
      dispatch(LoadStock());
      setSelected();
    } 
  }

  useEffect(() => {
    if(loadStock.data.length == 0)
      dispatch(LoadStock());
  }, []);

  const getGammes = () => {
    const gammes = [];

    for(let i in loadStock.data) {
      if (gammes.indexOf(loadStock.data[i].gamme_code) === -1) {
        gammes.push(loadStock.data[i].gamme_code);
      }
    }

    setGammes(gammes)
  }

  useEffect(() => {
    if(loadStock.data.length > 0 && (stock.length == 0 || gammes.length == 0)) {  
      getGammes();
      setStock(loadStock.data);
    }
  }, [loadStock]);

  useEffect(()=> {
    if(props.search) {
      if(selected)
        dispatch(LoadStockByCategorie(selected,props.search))
      else
        dispatch(LoadStockByCategorie(null,props.search))
    }else{
      if(selected)
        setStock(loadStockByCategorie.data)
      else
        setStock(loadStock.data);
    }
  },[props.search])

  useEffect(()=> {
    if(props.search || selected)
      setStock(loadStockByCategorie.data)
    else 
      setStock(loadStock.data);
  },[selected,loadStockByCategorie])

  return (
    <>
      <Grid container>
        {gammes.map((data,index) => {
          return (
            <>
              <Grid item xs={3} key={index}>
                {selected == data ? (
                  <Button
                    key={index}
                    variant="contained"
                    style={{ width: "100%", backgroundColor: "#00bcd4" }}
                    onClick={() => handleSelected("")}
                  >
                    <p>{data}</p>
                  </Button>
                ) : (
                  <Button
                    key={index}
                    variant="contained"
                    style={{ width: "100%" }}
                    onClick={() => handleSelected(data)}
                  >
                    <p>{data}</p>
                  </Button>
                )}
              </Grid>
            </>
          );
        })}
      </Grid>

      <br />
      <hr />
      <Grid container spacing={3}>
        {stock.map((data1, index) => {
          return (
            <>
              <Grid item xs={3}>
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
                          <Typography
                            noWrap
                            gutterBottom
                            variant="h6"
                            component="h6"
                            style={{
                              color: "white",
                              marginLeft: "15%",
                              paddingTop: "5%",
                              fontSize:"140%"
                            }}
                          >
                            {data1.prix_ttc.toFixed(3)}DT
                          </Typography>
                        </div>
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
              </Grid>
            </>
          );
        })}
      </Grid>
    </>
  );
}

export default AfficherStock;