import React,{useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import {HiOutlineClipboardList} from 'react-icons/hi'
import {AiFillHome} from 'react-icons/ai'
import {FiUserCheck} from 'react-icons/fi'
import{FaUserPlus} from 'react-icons/fa'
import LogKridi from './KridiComponents/LogKridi'
import InfoClient from './KridiComponents/InfoClient'
import AddClient from './KridiComponents/AddClient';
const drawerWidth = 240;

const UseStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
      backgroundColor:'#DC572E',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
      backgroundColor:"white",
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
function Kredi(props) {
    const { window } = props;
    const classes = UseStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [currentPage,setCurrentPage]=useState("log")
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
  
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
         
            <ListItem button onClick={()=>{setCurrentPage("log")}}>
              <ListItemIcon><HiOutlineClipboardList style={{width:'1.5em',height:'1.5em'}} /></ListItemIcon>
              <ListItemText primary={"Log de Kridi"} />
            </ListItem>
      
        </List>
       <Divider />
        <List>
          
            <ListItem button onClick={()=>{setCurrentPage("info")}}>
              <ListItemIcon><FiUserCheck style={{width:'1.4em',height:'1.4em'}} /></ListItemIcon>
              <ListItemText primary={"Information client"} />
            </ListItem>
        
        </List>
        <Divider />
      </div>
    );
    const [state, setState] = useState({
      isOpen: Boolean(false),
    });
    const container = window !== undefined ? () => window().document.body : undefined;
  
    return (
        <>
        <div className={classes.root}>
    <CssBaseline />
    <AppBar color="primary" position="fixed" className={classes.appBar}>
      <Toolbar style={{justifyContent:'space-between'}}>
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
        <IconButton  aria-label="add an alarm" component={Link} to='/Home'>
              <AiFillHome  className="icon" style={{width:'1.5em',height:'1.5em'}} />
        </IconButton>
        </div>
        <IconButton
      color="inherit"
      edge="end"
      onClick={() => setState({ isOpen: true })}
      >
          <FaUserPlus />
      </IconButton>
      </Toolbar>
     
    </AppBar>
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
        color="primary"
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
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
      {currentPage==="log"?
      (
          <>
          <LogKridi />
          </> 

      ):
      currentPage==="info"?
      ( <>
      <InfoClient />
      </>): ""
      }
    </main>
  </div>
  <AddClient  
   handleOpen={state.isOpen}
   handleClose={() => setState({ isOpen: false })}
        />
      </>
    )
}

export default Kredi
