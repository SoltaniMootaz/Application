import React from "react";
import { useDispatch } from "react-redux";
import { LoadTicket } from "../../actions";

import def from "./img/def.jpg";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Divider,
  Menu,
  MenuItem,
  makeStyles,
  Typography,
  Paper,
  Grid
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

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

  return (
    <>
     
      <Paper className={classes.Paper} >
      <Grid container>
        { props.scat===false ?
        props.value.map((data1, index) => {
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
                      onClick={() => handleClick(props.value[index], index)}
                    />
                  </CardActionArea>
                </Card>
              </div>
            </div>
          );
        }): props.cat ? 
        props.cat.map((data1, index) => {
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
                      onClick={() => handleClick(props.value[index], index)}
                    />
                  </CardActionArea>
                </Card>
              </div>
            </div>
          );
        }):""}
            </Grid>
        </Paper>

  
    </>
  );
}

export default RechercheProd;
