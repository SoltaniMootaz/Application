import React, { useState, useEffect } from "react";
import Axios from "axios";
import Ingredient from "./ingredients";

///////////////////////////////////////////////////////////////////////

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useSelector } from "react-redux";

////////////////////////////////////////////////////////////////////////////

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
 
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  multilineColor:{
    color:'black'
  }
}));

const styles = (theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function AjouterCat(props) {
  const url = "http://localhost:3001/api/ajouterArticle";
  const url2 = "http://localhost:3001/api/afficherCategorie";
  const url3 = "http://localhost:3001/api/ajouterIngredient";
  const url4 = "http://localhost:3001/api/ajouterActivite";
  

  const loadIngredients = useSelector(state=>state.loadIngredients)

  const categ = [];
  const [length, setLength] = useState(0)
  const [items, setItems] = useState([])
  const [error, setError] = useState("");
  const [vente, setVente] = useState(false);
  const [tracer, setTracer] = useState(false);
  const [categories, setCategories] = useState([]);
  const [Data, setData] = useState({
    nom: "",
    categorie: "",
    prix: "",
    unite: "",
  });
  const [somme,setSomme] = useState(0);
  const [loaded,setLoaded] = useState(false);

  const classes = useStyles();


  const calculTotale = () => {
    var sm = 0;
    console.log(loadIngredients.data)
    loadIngredients.data.map(e=> {
      if(e)
        sm += parseFloat(e.prix) * parseInt(e.quantite,10);
    })

    return sm.toFixed(3);
  }

  const getCategories = () => {
    Axios.get(url2)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleIngredient = () => {
    setItems(items=>[...items,<Ingredient id={length} />])
    setLength(length + 1);
  }

  useEffect(() => {
    setSomme(calculTotale());
    if(!loaded) {
      getCategories();
      setLoaded(true);
    }
  }, [loadIngredients]);

  categories.map((categorie, i) => {
    categ.push(
      <MenuItem key={i} value={categorie.nom}>
        {categorie.nom}
      </MenuItem>
    )
  });
var current=new Date();
  function submit(e) {
    e.preventDefault();
    Axios.post(url, {
      nom: Data.nom,
      categorie: Data.categorie,
      prix: Data.prix,
      unite: Data.unite,
      id_utilisateur: localStorage.getItem('userID')
    })
      .then((res) => {
        loadIngredients.data.map(element=> {
          if(element)
          Axios.post(url3, {
            idIngr: element.idIngr,
            quantite: element.quantite,
            id_article: res.data.rows[0].id,
            id_utilisateur: localStorage.getItem('userID')
          })
          .catch((err) => {
            console.log(err.response.data)
            setError(err.response.data);
          });
        })
        Axios.post(url4, {
          operation:"aArticle",
          id_utilisateur:localStorage.getItem('userID'),
          date: current.toLocaleString(),
          detail:Data.nom,
        }).catch((err) => {
          console.log(err.response.data)
          setError(err.response.data);
        });
        if(!error) {
          props.handleClose();
          window.location.reload(false);
        }
      }
     
      )
      .catch((err) => {
        console.log(err.response.data)
        setError(err.response.data);
      });
  }

  function handleNom(e) {
    setData({ ...Data, nom: e.target.value });
  }

  function handleCategorie(e) {
    setData({ ...Data, categorie: e.target.value });
  }

  function handlePrix(e) {
    setData({ ...Data, prix: e.target.value });
  }

  function handleUnite(e) {
    setData({ ...Data, unite: e.target.value });
  }

  function changeVente() {
    setVente(!vente);
  }

  function changeTracer() {
    setTracer(!tracer);
  }

  return (
    <>
      <Dialog fullWidth={true} onClose={()=>{props.handleClose(); setError("")}} aria-labelledby="customized-dialog-title" open={props.handleOpen}>
        <DialogTitle id="customized-dialog-title" >
          Ajouter article
        </DialogTitle>
        <DialogContent dividers>
        <form  noValidate autoComplete="off">
          <Grid container >
          {error ? (
                <><p style={{color:'red',textAlign:'center'}}>{error}</p></>
          ) : (
            ""
          )}

              <Grid container >
                <Grid item xs={12}>
                  <TextField
                    id="standard-basic"
                    label="Nom"
                    required
                    onChange={(e) => handleNom(e)}
                    style={{width:'100%'}}
                    color="primary"
                    InputProps={{
                      className: classes.multilineColor
                    }}
                    />
                  </Grid>
              </Grid>
              <Grid container >
                <Grid item xs={12} style={{paddingTop:'3em'}}>
             
                <InputLabel id="demo-simple-select-label">Catégorie</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue=""
                  color="primary"
                  required
                  onChange={(e) => handleCategorie(e)}
                  style={{width:'100%'}}
                  InputProps={{
                    className: classes.multilineColor
                  }}InputProps={{
                    className: classes.multilineColor
                  }}
                >
                  {categ}
                </Select>
              
              </Grid>
              </Grid>
              <Grid container >
                <Grid item xs={12} style={{paddingTop:'3em'}}>
              <FormControlLabel
                control={
                  <Switch
                    checked={vente}
                    onChange={changeVente}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Vente par poids"
              />
            </Grid>
              </Grid>
              {vente ? (
                <>
                <Grid container>
                <Grid item xs={9}>
                  <TextField 
                    id="standard-basic"
                    required
                    label="Prix"
                    onBlur={(e)=>e.target.value = parseFloat(e.target.value).toFixed(3)}
                    onChange={(e) => handlePrix(e)}
                    style={{width:'95%'}}
                    InputProps={{
                      className: classes.multilineColor
                    }}
                    />
                </Grid>

                <Grid item xs={3}>
                 
                    <InputLabel id="demo-simple-select-label">Unité</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="unite"a
                      onChange={(e) => handleUnite(e)}
                      style={{width:'100%'}}
                    >
                    <MenuItem value="gramme">gramme</MenuItem>
                    <MenuItem value="KG">KG</MenuItem>
                    <MenuItem value="litre">litre</MenuItem>
                    </Select>
               
                </Grid>
                </Grid>
                </>
              ) : (
                <Grid item xs={12}>
                  <TextField id="standard-basic" required label="Prix" onBlur={(e)=>e.target.value = parseFloat(e.target.value).toFixed(3)} onChange={(e) => handlePrix(e)} style={{width:'100%'}}/>
                </Grid>
              )}
          <Grid container style={{paddingTop:'3em'}}>
            <Grid Item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={tracer}
                    onChange={changeTracer}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Tracer dans l'inventaire"
              />
              </Grid>
            </Grid>
            {tracer ? (
              <div>
                <Grid container>
                 
                <p style={{textAlign:"right",color:"red"}}>Coût : {somme} DT</p>
                {items}
               
                  
                    <Grid container style={{paddingTop:'1em'}}>
                      <Grid item xs={12}>
                  <Button variant="outlined" color="primary"     onClick={(e) => {
                        e.preventDefault();
                        handleIngredient()
                      }} >
                    Ajouter nouveau article...
                  </Button>
                  </Grid>
                  </Grid>
                   
                 
          
                </Grid>
              </div>
            ) : (
              ""
            )}
          <br />
          <br />
           </Grid> 
        </form>
        </DialogContent>
        <DialogActions style={{justifyContent:'center'}}>
        <Fab color="primary" aria-label="add" onClick={(e) => {
                submit(e);
              }}>
        <AddIcon />
      </Fab>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AjouterCat;
