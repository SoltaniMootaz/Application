import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadTicket } from "../../actions";

import def from "./img/def.jpg";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import {
  Divider,
  Menu,
  MenuItem,
  makeStyles,
  Typography,
  Paper,
  Grid,
} from "@material-ui/core";
const useStyles = makeStyles({
  root: {
    width: "16rem",
  },
  media: {
    width: "100%",
    height: 0,
    paddingTop: "70%", // 16:9
  },
  menu: {
    shadows: ["none"],
  },
  cardHeaderRoot: {
    overflow: "hidden",
  },
  cardHeaderContent: {
    overflow: "hidden",
  },
});

function RechercheProd(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [cards, setCards] = useState();
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const loadStock = useSelector((state) => state.loadStock);

  const handleClick1 = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  var src = def;

  const isSRC = (data) => {
    if (data == "NULL") return true;
    else return false;
  };

  const handleClick = (a) => {
    dispatch(LoadTicket(a));
  };

  const handleSearch = () => {
    let val = props.value.toLowerCase();
    var res = [];
    for (var i = 0; i < loadStock.data.length; i++) {
      if (loadStock.data[i])
        if (
          loadStock.data[i].libelle.toLowerCase().indexOf(val) > -1 ||
          loadStock.data[i].code_a_barre.indexOf(props.value.toUpperCase()) > -1
        )
          res[i] = loadStock.data[i];
    }

    return res;
  };

  useEffect(() => {
    if (props.value) {
      setCards(
        handleSearch().map((val, index) => {
          return (
            <>
              <div key={index}>
                <div style={{ padding: "1em" }}>
                  <Card
                    className={classes.root}
                    key={val.nomCategorie}
                    style={{ Height: "25em" }}
                  >
                    <CardHeader
                      classes={{
                        root: classes.cardHeaderRoot,
                        content: classes.cardHeaderContent,
                      }}
                      action={
                        <IconButton
                          aria-label="settings"
                          aria-controls="long-menu"
                          aria-haspopup="true"
                          onClick={handleClick1}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={
                        <Typography
                          noWrap
                          gutterBottom
                          variant="h6"
                          component="h4"
                        >
                          {val.libelle}
                        </Typography>
                      }
                      subheader={val.prix_ttc}
                    />
                    <Menu
                      id="long-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={open}
                      onClose={handleClose}
                      className={classes.menu}
                    >
                      <MenuItem onClick={handleClose} style={{ color: "blue" }}>
                        modifier
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={handleClose} style={{ color: "red" }}>
                        effacer
                      </MenuItem>
                    </Menu>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={isSRC(val.image) ? src : val.image}
                        onClick={() => handleClick(val)}
                      />
                    </CardActionArea>
                  </Card>
                </div>
              </div>
            </>
          );
        })
      );
    } else if (props.cat) {
      const cat = loadStock.data.filter((art) =>art.gamme_code.toLowerCase()===props.cat.toLowerCase())
      setCards(
        cat.map((data1, index) => {
          return (
            <div key={index}>
              <div style={{ padding: "1em" }}>
                <Card
                  className={classes.root}
                  key={data1.nomCategorie}
                  style={{ Height: "25em" }}
                >
                  <CardHeader
                    classes={{
                      root: classes.cardHeaderRoot,
                      content: classes.cardHeaderContent,
                    }}
                    action={
                      <IconButton
                        aria-label="settings"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={handleClick1}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={
                      <Typography
                        noWrap
                        gutterBottom
                        variant="h6"
                        component="h4"
                      >
                        {data1.libelle}
                      </Typography>
                    }
                    subheader={data1.prix_ttc}
                  />
                  <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    className={classes.menu}
                  >
                    <MenuItem onClick={handleClose} style={{ color: "blue" }}>
                      modifier
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose} style={{ color: "red" }}>
                      effacer
                    </MenuItem>
                  </Menu>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={isSRC(data1.image) ? src : data1.image}
                      onClick={() => handleClick(data1)}
                    />
                  </CardActionArea>
                </Card>
              </div>
            </div>
          );
        })
      );
    }
  }, [props.value , props.cat]);

  return (
    <>
      <Paper className={classes.Paper}>
        <Grid container>{cards}</Grid>
      </Paper>
    </>
  );
}

export default RechercheProd;
