import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LoadTicket, LoadStock, LoadStockByCategorie } from "../../actions";
import * as caisseUtils from "../../Utils/Caisse";

import def from "./img/def.jpg";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

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
    fontSize: "12px",
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

  const dispatch = useDispatch();
  const loadStock = useSelector((state) => state.loadStock);
  const loadStockByCategorie = useSelector(
    (state) => state.loadStockByCategorie
  );

  var src = def;
  const classes = useStyles();
  const isSRC = (data) => {
    if (data == "NULL") return true;
    else return false;
  };

  const handleSelected = (data) => {
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
    if (
      loadStock.data.length > 0 &&
      (stock.length == 0 || gammes.length == 0)
    ) {
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
    if (props.search || selected) setStock(loadStockByCategorie.data);
    else setStock(loadStock.data);
  }, [selected, loadStockByCategorie]);

  return (
    <>
      <Grid container>
        {gammes.map((data, index) => (
          <Grid
            item
            xl={3}
            lg={3}
            md={6}
            sm={6}
            xs={6}
            key={index}
            style={{ marginTop: "1em" }}
          >
            {selected == data ? (
              <Button
                key={index}
                variant="contained"
                style={{ width: "95%", backgroundColor: "#00bcd4" }}
                onClick={() => handleSelected("")}
              >
                <p>{data}</p>
              </Button>
            ) : (
              <Button
                key={index}
                variant="contained"
                style={{ width: "95%" }}
                onClick={() => handleSelected(data)}
              >
                <p>{data}</p>
              </Button>
            )}
          </Grid>
        ))}
      </Grid>

      <br />
      <hr />
      <Grid container spacing={2}>
        {stock.map((data1, index) => (
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
        ))}
      </Grid>
    </>
  );
}

export default AfficherStock;
