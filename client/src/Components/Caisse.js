import React,{ useState, useEffect } from 'react'
import Ticket from './CaisseComponents/ticket'
import AfficheArticle from './CaisseComponents/AfficheArticle'
import AfficheStock from './CaisseComponents/AfficheStock'
import "./css/Article.css";
import { AiFillHome } from "react-icons/ai";
import ArticlesChercher from "./ArticleComponents/ArticleChercher.js";
import RechercheArticle from "./CaisseComponents/rechercheArticle.js";
import RechercheProd from "./CaisseComponents/RechercheProd.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import Axios from "axios";
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {

  Spinner,
 
} from "react-bootstrap";
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme,fade } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const drawerWidth = 340;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    display: 'flex',

  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
   
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  
}));

/////////////////////////////////////////////////////////////////////////

function Caisse(props) {


//////////////////////////////////////////////////////////////////////
  const urlart = "http://localhost:3001/api/afficherArticles";
  const urlprod ="http://localhost:3001/api/stock";


  const [dataArt, setDataArt] = useState([]);
  const [dataProd,setDataProd]=useState([]);
  const [isLoading2, setLoading2] = useState(true);
  const [isLoading1, setLoading1] = useState(true);
  const [tickeTab,setTicketTab] = useState()
  const [isSearching, setIsSearching] = useState(false);
  const [value, setValue] = useState();
  const [index, setIndex] = useState();
  
  const getArticles = () => {
    Axios.get(urlart)
      .then((res) => setDataArt(res.data))
      .catch((err) => console.log(err));
    setLoading2(false);
  };
    
  const getProd = () => {
    Axios.get(urlprod)
      .then((res) => setDataProd(res.data))
      .catch((err) => console.log(err));
    setLoading1(false);
  };
 
  useEffect(() => {
    getProd();
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
  const ticketCallBack=(a,i)=>{
    setTicketTab(a)
    setIndex(i)
  }
////////////////////////////////////////////////////////////////////////////
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [type,setType] = useState('s'); 

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  function handleType(a) {
    setType(a);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <div style={{width:'100%  '}}>         
          <h4 style={{paddingTop:'2.05em'}}><center>Ticket</center></h4>
        </div>
      <Divider />
      <Divider />
      <Ticket array = {tickeTab} index={index}/>
    
    </div>
  );
  const container = window !== undefined ? () => window().document.body : undefined;
  if (isLoading2&&isLoading1) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  } else {
    return (
      <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}   color='info'>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
            <AiFillHome  className="icon" style={{width:'2em',height:'2em'}}/>
            <Typography className={classes.title} variant="h6" noWrap>
              
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
               inputProps={{ 'aria-label': 'search' }}
               onChange={handleSearch}   />
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
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
        <Hidden mdDown implementation="css">
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
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        >
          <MenuItem value="stock" onClick={()=>handleType('s')} default>Stock</MenuItem>
          <MenuItem value="menu" onClick={()=>handleType('m')}>Menu</MenuItem>
        </Select>
      </FormControl> <br />
      {isSearching ? type==='m'? <RechercheArticle handleTicketClick={ticketCallBack} value={value} chercherDans={dataArt} />:
      <RechercheProd handleTicketClick={ticketCallBack} value={value} chercherDans={dataProd} />: type==='m' ?
            <AfficheArticle dataArt={dataArt} handleTicketClick={ticketCallBack}></AfficheArticle> 
        :
            <AfficheStock handleTicketClick={ticketCallBack} dataProd={dataProd}/>} 
      </main>
    </div>
    )
}}

export default Caisse; 