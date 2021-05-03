import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import TousArticle from "../_ArticleComponents/TousArticle.js";
import ArticlesChercher from "../_ArticleComponents/ArticleChercher.js";
import AjouterCat from "../_ArticleComponents/ajouterCategorie";
import AjouterArt from "../_ArticleComponents/ajouterArticle";
import { loadCategories, loadArticles } from "../../services/Menu";


import { AiFillHome } from "react-icons/ai";
import { BiPlusCircle } from "react-icons/bi";
import { VscSearch } from "react-icons/vsc";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

////////////////////////////////////////////////////////////////////////////////////////////////////////
const drawerWidth = 340;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),

    minWidth: 120,
  },
  icon: { color: "white" },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      flexShrink: 0,
    },
  },
  appBar: {
    backgroundColor: "white",
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginRight: drawerWidth,
    },
  },
  menuButton: {
    color: "black",
    width: "2em",
    height: "2em",
    marginRight: theme.spacing(2),
    justifyContent: "flex-end",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    backgroundColor: "#00A600",
    color: "white",
    width: drawerWidth,
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: "5em",
    paddingRight: drawerWidth,

    [theme.breakpoints.down("md")]: {
      paddingRight: 0,
    },
  },
  search: {
    position: "relative",

    justifyContent: "flex-end",

    [theme.breakpoints.down("sm")]: {
      paddingLeft: "25%",
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "10%",
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: "85%",
    },
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
}));
/////////////////////////////////////////////
function Article(props) {
  var isLoading = true;

  const [dataCat, setDataCat] = useState([]);
  const [dataArt, setDataArt] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [value, setValue] = useState();
  const [state, setState] = useState(false);
  const [state1, setState1] = useState(false);

  const { window } = props;
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  useEffect(() => {
    loadCategories().then((res) => {
      setDataCat(res.data);
    });

    loadArticles().then((res) => {
      setDataArt(res.data);
    });
  }, []);

  const handleSearch = (e) => {
    if (e.target.value === "") {
      setIsSearching(false);
      setValue(e.target.value);
    } else {
      setValue(e.target.value);
      setIsSearching(true);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  /////////////////////////////////////////////////////////////////////////////
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <div style={{ backgroundColor: "white" }}></div>

      <List>
        <ListItem
          button
          onClick={() => {
            setState(false);
            setState1(true);
          }}
        >
          <BiPlusCircle
            style={{ width: "2em", height: "2em", color: "white" }}
          />
          <ListItemText
            style={{ paddingLeft: "2em" }}
            primary={"Ajouter article"}
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => {
            setState1(false);
            setState(true);
          }}
        >
          <BiPlusCircle
            style={{ width: "2em", height: "2em", color: "white" }}
          />
          <ListItemText
            style={{ paddingLeft: "2em" }}
            primary={"Ajouter catégorie"}
          />
        </ListItem>
      </List>
      <Divider />
    </div>
  );
  const drawer1 = (
    <div>
      <div className={classes.toolbar} />
      <div style={{ backgroundColor: "white" }}></div>

      <List>
        <ListItem
          button
          onClick={() => {
            setState(false);
            setState1(true);
            setMobileOpen(false);
          }}
        >
          <BiPlusCircle
            style={{ width: "2em", height: "2em", color: "white" }}
          />
          <ListItemText
            style={{ paddingLeft: "2em" }}
            primary={"Ajouter article"}
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => {
            setState1(false);
            setState(true);
            setMobileOpen(false);
          }}
        >
          <ListItemIcon className={classes.icon}>
            <BiPlusCircle style={{ width: "2em", height: "2em" }} />
          </ListItemIcon>
          <ListItemText primary={"Ajouter catégorie"} />
        </ListItem>
      </List>
      <Divider />
    </div>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;
  

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton aria-label="add an alarm" component={Link} to="/Home">
              <AiFillHome
                className="icon1"
                style={{ width: "1.5em", height: "1.5em" }}
              />
            </IconButton>

            <TextField
              id="input-with-icon-textfield"
              placeholder="Recherche"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <VscSearch />
                  </InputAdornment>
                ),
              }}
              className={classes.search}
              onChange={handleSearch}
            />
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
              style={{ flex: "1" }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <nav className={classes.drawer} aria-label="menu-article">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden mdUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer1}
            </Drawer>
          </Hidden>
          <Hidden mdDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              anchor="right"
              variant="permanent"
              open={mobileOpen}
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>

        <main className={classes.content}>
          {!isSearching ? (
            <TousArticle
              dataCat={dataCat}
              dataArt={dataArt}
              isLoading={isLoading}
            />
          ) : (
            <ArticlesChercher value={value} chercherDans={dataArt} />
          )}
        </main>
        <AjouterCat
          handleOpen={state}
          handleClose={() => setState(false)}
        />
        <AjouterArt
          handleOpen={state1}
          handleClose={() => setState1(false)}
        />
      </div>
    );

}

export default Article;
