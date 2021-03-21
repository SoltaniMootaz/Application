import React, { useState, useEffect } from "react";
import "./css/Article.css";
import {Spinner} from "react-bootstrap";
import { AiFillHome } from "react-icons/ai";
import { BiPlusCircle } from "react-icons/bi";
import { VscSearch } from "react-icons/vsc";
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles} from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Axios from "axios";
import TousArticle from "./ArticleComponents/TousArticle.js";
import ArticlesChercher from "./ArticleComponents/ArticleChercher.js";
import AjouterCat from "./ArticleComponents/ajouterCategorie";
import AjouterArt from "./ArticleComponents/ajouterArticle";

import { useSelector, useDispatch } from "react-redux";
import { LoadMenu, loadCat } from "../actions";
////////////////////////////////////////////////////////////////////////////////////////////////////////
const drawerWidth = 340;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),

    minWidth: 120,
  },
  icon:{color:'white'},
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      
      flexShrink: 0,
    },
  },
  appBar: {
    backgroundColor:"white",
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginRight: drawerWidth,
     },
  },
  menuButton: {
    color:'black',
    width:'2em',
    height:'2em',
    marginRight: theme.spacing(2),
    justifyContent:'flex-end',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    backgroundColor:'#00A600',
    color:'white',
    width: drawerWidth,
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop:'5em',
    paddingRight: drawerWidth,
    
    [theme.breakpoints.down('md')]:{
    paddingRight:0,
   
    
    }
  },
  search: {
    position: 'relative',
  
 
    justifyContent:'flex-end',
    
    [theme.breakpoints.down('sm')]: {
      paddingLeft:'25%'
    },
     [theme.breakpoints.down('xs')]: {
      paddingLeft:'10%'
    },
    [theme.breakpoints.up('lg')]:{
      paddingLeft:'85%',
     }
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },  
  },
  
}));
/////////////////////////////////////////////
function Article(props) {
  

  const dispatch = useDispatch();
  const LoadCat = useSelector((state) => state.loadCat);
  const LoadArt = useSelector((state) => state.LoadMenu);


  const urlcat = "http://localhost:3001/api/afficherCategorie";
  const urlart = "http://localhost:3001/api/afficherArticles";
  var isLoading = true;

  const [dataCat, setDataCat] = useState([]);
  const [dataArt, setDataArt] = useState([]);
  const [isLoading1, setLoading1] = useState(true);
  const [isLoading2, setLoading2] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [value, setValue] = useState();

  const getCategories = () => {
    Axios.get(urlcat)
      .then((res) => setDataCat(res.data))
      .catch((err) => console.log(err));
      setLoading1(false);
  };

  const getArticles = () => {
    Axios.get(urlart)
      .then((res) => {
        console.log(res)
        setDataArt(res.data);
      })
      .catch((err) => console.log(err));
      setLoading2(false);
  };

  useEffect(() => {
    getCategories();
    getArticles();
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
/////////////////////////////////////////////////////////////////////////
  const [state, setState] = useState({
    isOpen: Boolean(false),
  });

  const [state1, setState1] = useState({
    isOpen: Boolean(false),
  });
 
////////////////////////////////////////////////////////////////////////////



const { window } = props;
const classes = useStyles();

const [mobileOpen, setMobileOpen] = React.useState(false);


const handleDrawerToggle = () => {
  setMobileOpen(!mobileOpen);
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const drawer = (
  <div >
    <div className={classes.toolbar} />
    <div style={{backgroundColor:'white'}}>
    </div>
   
    <List >
          
          <ListItem button  onClick={() =>{ 
            setState({isOpen:false})
            setState1({ isOpen: true })}}>
             <BiPlusCircle style={{  width: "2em", height: "2em",color:"white"}} />
            <ListItemText style={{paddingLeft:'2em'}} primary={'ajouter article'} />
          </ListItem>
     
      </List>
    <Divider />
    <List>
         
         <ListItem button  onClick={() =>{ 
           setState1({isOpen:false})
           setState({ isOpen: true })
           }}>
           <BiPlusCircle style={{  width: "2em", height: "2em",color:"white"}} />
           <ListItemText style={{paddingLeft:'2em'}}primary={'ajouter catégorie'} />
         </ListItem>

     </List>
    <Divider />
  
  </div>
);
const drawer1 = (
  <div>
    <div className={classes.toolbar} />
    <div style={{backgroundColor:'white'}}>
    </div>
    
    <List>
          
          <ListItem button  onClick={() =>{ 
            setState({isOpen:false})
            setState1({ isOpen: true })
            setMobileOpen(false)   }
            }>
            <BiPlusCircle style={{  width: "2em", height: "2em",color:"white"}} />
            <ListItemText style={{paddingLeft:'2em'}} primary={'ajouter article'} />
          </ListItem>
     
      </List>
    <Divider />
    <List>
         
         <ListItem  button  onClick={() =>{ 
           setState1({isOpen:false})
           setState({ isOpen: true })
           setMobileOpen(false)}}
           >
           <ListItemIcon className={classes.icon}><BiPlusCircle style={{width: "2em", height: "2em" }} /></ListItemIcon>
           <ListItemText primary={'ajouter catégorie'} />
         </ListItem>

     </List>
    <Divider />
  
  </div>
);
const container = window !== undefined ? () => window().document.body : undefined;
  if (isLoading1 && isLoading2) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  } else {
    isLoading = false;

    return (
      <div className={classes.root}>
      
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} >
        <Toolbar>
        <IconButton  aria-label="add an alarm" component={Link} to='/Home'>
  <AiFillHome  className="icon1" style={{width:'1.5em',height:'1.5em'}} />
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
            style= {{flex:'1'}}
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
           
                    <ArticlesChercher 
                    value={value} 
                    chercherDans={dataArt} 
                    />
     
                  )}
     
            </main>
            <AjouterCat
        handleOpen={state.isOpen}
        handleClose={() => setState({ isOpen: false })}
      />
      <AjouterArt
        handleOpen={state1.isOpen}
        handleClose={() => setState1({ isOpen: false })}
      />
      </div>
    );
  }
}

export default Article;
