import React,{ useState, useEffect } from 'react'
import Ticket from './CaisseComponents/ticket'
import AfficheArticle from './CaisseComponents/AfficheArticle'
import "./css/Article.css";
import { AiFillHome } from "react-icons/ai";
import ArticlesChercher from "./ArticleComponents/ArticleChercher.js";
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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme,fade } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const drawerWidth = 340;

const useStyles = makeStyles((theme) => ({
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
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  
}));

/////////////////////////////////////////////////////////////////////////

function Caisse(props) {


//////////////////////////////////////////////////////////////////////
  const urlart = "http://localhost:3001/api/afficherArticles&";
  const urlprod ="http://localhost:3001/api/stock";


  const [dataArt, setDataArt] = useState([]);
  const [dataProd,setDataProd]=useState([]);
  const [isLoading2, setLoading2] = useState(true);
  const [tickeTab,setTicketTab] = useState()
<<<<<<< HEAD
  const [isSearching, setIsSearching] = useState(false);
  const [value, setValue] = useState();
  
=======
  const [index,setIndex] = useState();

>>>>>>> 8fa74cf1b5da8a03e24fb47db88a4e8eff793222
  const getArticles = () => {
    Axios.get(urlart)
      .then((res) => setDataArt(res.data))
      .catch((err) => console.log(err));
    setLoading2(false);
  };
  const getProd = () => {
    Axios.get(urlprod)
      .then((res) => setDataProd(res.data))
      .catch((err) => console.log(err.response.data));
    
  };
  useEffect(() => {
    getArticles();
    getProd();
  }, []);
<<<<<<< HEAD
  const handleSearch = (e) => {
    if (e.target.value === "") {
      setIsSearching(false);
      setValue(e.target.value);
    } else {
      setValue(e.target.value);
      setIsSearching(true);
    }
  };
  const ticketCallBack=(a)=>{
    setTicketTab(a)
    console.log(tickeTab)
=======

  const ticketCallBack=(a,i)=>{
    setTicketTab(a);
    setIndex(i);
>>>>>>> 8fa74cf1b5da8a03e24fb47db88a4e8eff793222
  }
////////////////////////////////////////////////////////////////////////////
const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <div style={{width:'100%  '}}>         
          <h4 style={{paddingTop:'2.05em'}}><center>Ticket</center></h4>
        </div>
      <Divider />
      <Divider />
      <Ticket array = {tickeTab}/>
    
    </div>
  );
  const container = window !== undefined ? () => window().document.body : undefined;
  if (isLoading2) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  } else {
    return (
<<<<<<< HEAD
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
              Home
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
        <Hidden smUp implementation="css">
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
        {!isSearching ? ( <AfficheArticle dataArt={dataArt} handleTicketClick={ticketCallBack}></AfficheArticle>    ) :(<ArticlesChercher handleTicketClick={ticketCallBack} value={value} chercherDans={dataArt} />
       )}
      </main>
    </div>
=======
        <Container fluid>
            <Row>       


                <Col xs={4} md={4} xl={4}  id="sidebar-wrapper" className="nopadding border-right" > 
                <Ticket
                  array = {tickeTab}
                  index = {index}
                />

                </Col>
                <Col xs={8} sm={8} md={8} xl={8} id="page-content-wrapper" className="nopadding">
                    <Row> 
                    <Col  xs={12} sm={12} md={12} xl={12} id="page-content-wrapper" className="nopadding w100">
                        <Navbar className=" justify-content-center border-bottom border-left" expand="lg" style={{  boxShadow:'inset -1px 0 0 rgba(0, 0, 0, .1)',}}>
                        <Navbar.Brand href="#home"><AiFillHome  className="icon" style={{width:'1.7em',height:'1.7em'}}/></Navbar.Brand>
                        <Nav className="mr-auto " >
                        <Nav.Link href=""  ><p className="homeBtn" >Home</p></Nav.Link>
                        </Nav>
                        <Nav.Item className="navItem">
                        <Form className="searchForm" inline>
                        <FormControl type="text" placeholder="Search"  className="searchBarr" style={{
                                marginRight:'3em',
                                borderLeft: 0,
                                borderTop: 0,
                                borderRight: 0,
                                borderColor: "#176cd4",
                                borderRadius: "0em" }}/>
                        </Form>
                        </Nav.Item>                               
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Item className="navItem">
                        <Nav.Link
                        style={{ textAlign:'center' }} >
                            Ajouter article
                        </Nav.Link >
                        </Nav.Item>
                        <Nav.Item className="navItem">
                        <Nav.Link
                        style={{textAlign:'center'  }}>
                            Ajouter catégorie
                        </Nav.Link>
                        </Nav.Item>
                        </Nav>
                        </Navbar.Collapse>    
                        <Nav.Item>
                        <Form className="searchForm1" inline>
                        <FormControl type="text" placeholder="Search" className="searchBar1" style={{
                                marginRight:'3em', 
                                borderLeft: 0,
                                borderTop: 0,
                                borderRight: 0,
                                borderColor: "#176cd4",
                                borderRadius: "0em"}}/>
                            </Form>
                            </Nav.Item>                 
                        </Navbar>
                     </Col>
                    </Row>
                    <Row style={{marginLeft:'3em'}}>   
                      <AfficheArticle dataArt={dataArt} handleTicketClick={ticketCallBack}></AfficheArticle>    
                    </Row>
                  </Col> 
                </Row>
        </Container>

>>>>>>> 8fa74cf1b5da8a03e24fb47db88a4e8eff793222
    )
}}

export default Caisse; 