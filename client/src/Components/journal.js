import React, { useState, useEffect } from "react";
import * as journal from "../services/Journal";
import Activite from "./JournalComponents/Activite";
import Recu from "./JournalComponents/Recu";
import Recap from "./JournalComponents/Recap";
import ClotureAlert from './JournalComponents/ClotureAlert'

import { Link } from "react-router-dom";
import { BiHistory } from "react-icons/bi";
import { BsListTask } from "react-icons/bs";
import { AiFillHome, AiFillLock, AiFillUnlock } from "react-icons/ai";
import { FaReceipt } from "react-icons/fa";

import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';


const drawerWidth = 240;

const UseStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  button: {
    margin: theme.spacing(1),
  },
  appBar: {
    backgroundColor: "white",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    backgroundColor: "#BF1E4B",
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
function Journal(props) {
  const { window } = props;
  const classes = UseStyles();
  const theme = useTheme();
  const container = window !== undefined ? () => window().document.body : undefined;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("Activite");
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [caisse, setCaisse] = useState()
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const changePage = (page) => {
    setCurrentPage(page);
  }

  useEffect(() => {
    journal.afficherVente().then((res) => setData(res.data));
    journal.afficherActivite().then((res) => setData2(res.data));
  }, []);

  const drawer = (
    <div>
      <div className={classes.toolbar} />

      {currentPage === "Activite" ? (
        <List style={{ backgroundColor: "#9a183d" }}>
          <ListItem
            button
            onClick={() => {
              setCurrentPage("Activite");
            }}
          >
            <ListItemIcon>
              <BiHistory
                style={{ color: "white", width: "1.5em", height: "1.5em" }}
              />
            </ListItemIcon>
            <ListItemText primary={"Activité"} style={{ color: "white" }} />
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem
            button
            onClick={() => {
              setCurrentPage("Activite");
            }}
          >
            <ListItemIcon>
              <BiHistory
                style={{ color: "white", width: "1.5em", height: "1.5em" }}
              />
            </ListItemIcon>
            <ListItemText primary={"Activité"} style={{ color: "white" }} />
          </ListItem>
        </List>
      )}

      {currentPage === "Recu" ? (
        <List style={{ backgroundColor: "#9a183d" }}>
          <ListItem
            button
            onClick={() => {
              setCurrentPage("Recu");
            }}
          >
            <ListItemIcon>
              <FaReceipt
                style={{ color: "white", width: "1.4em", height: "1.4em" }}
              />
            </ListItemIcon>
            <ListItemText primary={"Reçu"} style={{ color: "white" }} />
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem
            button
            onClick={() => {
              setCurrentPage("Recu");
            }}
          >
            <ListItemIcon>
              <FaReceipt
                style={{ color: "white", width: "1.4em", height: "1.4em" }}
              />
            </ListItemIcon>
            <ListItemText primary={"Reçu"} style={{ color: "white" }} />
          </ListItem>
        </List>
      )}

      {currentPage === "Recap" ? (
        <List style={{ backgroundColor: "#9a183d" }}>
          <ListItem
            button
            onClick={() => {
              setCurrentPage("Recap");
            }}
          >
            <ListItemIcon>
              <BsListTask
                style={{ color: "white", width: "1.4em", height: "1.4em" }}
              />
            </ListItemIcon>
            <ListItemText primary={"Recap"} style={{ color: "white" }} />
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem
            button
            onClick={() => {
              setCurrentPage("Recap");
            }}
          >
            <ListItemIcon>
              <BsListTask
                style={{ color: "white", width: "1.4em", height: "1.4em" }}
              />
            </ListItemIcon>
            <ListItemText primary={"Recap"} style={{ color: "white" }} />
          </ListItem>
        </List>
      )}
    </div>
  );

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar color="info" position="fixed" className={classes.appBar}>
          <Toolbar>
            <div>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <IconButton aria-label="add an alarm" component={Link} to="/Home">
              <AiFillHome
                className="icon2"
                style={{ width: "1.5em", height: "1.5em" }}
              />
            </IconButton> 
          </div>
          <div style={{marginLeft:"70%"}}>
            {currentPage !== "Recap" ? "" :

            localStorage.getItem("caisse") === "true" ?
              <Button
                variant="contained"
                style={{backgroundColor:"#8bc34a"}}
                className={classes.button}
                startIcon={<AiFillUnlock />}
                onClick={()=>{
                  setOpen(true);
                }}
              >
                Clôturer la caisse
              </Button>
            :
              <Button
                variant="contained"
                style={{backgroundColor:"#ff0000"}}
                className={classes.button}
                startIcon={<AiFillLock />}
                onClick={()=>{
                  localStorage.setItem('caisse',true);
                  localStorage.setItem('openingTime',new Date().getTime());
                  setCaisse(true)
                }}
              >
                Ouvrir la caisse
              </Button>
            }
          </div>        
          </Toolbar>
        </AppBar>

        <ClotureAlert open={open} setOpen={setOpen} />

        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              color="primary"
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />

          {currentPage === "Activite" ? (
            <>
              <Activite data={data} data2={data2} changePage={changePage} />
            </>
          ) : currentPage === "Recu" ? (
            <>
              <Recu />
            </>
          ) : currentPage === "Recap" ? (
            <>
              <Recap data={data} data2={data2} />
            </>
          ) : (
            ""
          )}
        </main>
      </div>
    </>
  );
}

export default Journal;
