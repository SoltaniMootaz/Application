import React, { useState, useEffect } from "react";
import Axios from "axios";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

/////////////////////////////////////////////////////

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
}));


function Ingredient({ id, submitForm, idArticle,stock,totale }) {
  const classes = useStyles();

  var nom = "nom" + id;
  var quant = "quant" + id;

  const url = "http://localhost:3001/api/ajouterIngredient";

  const [stockData,setStockData] = useState([]);
  const [Data, setData] = useState({
    nomIngr: "",
    quantite: "",
  });
  const [artId,setArtId] = useState();
  const [_quant,setQuant] = useState(1);

  function submit() {
    Axios.post(url, {
      nomIngr: Data.nomIngr,
      quantite: Data.quantite,
      id_article: idArticle,
      id_utilisateur: localStorage.getItem('userID')
    })
      .then(()=> {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  const loadStock = () => {
    stock.map(row=> {
     setStockData(stockData => [...stockData,<MenuItem key={row.id} data-key={row.id} onClick={(e)=>handleNom(e)} value={row.libelle} defaultValue="">{row.libelle}</MenuItem>])
    });
   }

  useEffect(() => {
    loadStock();
    if (submitForm) {
      submit();
    }
  },[submitForm]);

  function handleNom(e) {
    setData({ ...Data, nomIngr: e.target.value });
    totale(e.target.getAttribute('data-key'),_quant,id);
    setArtId(e.target.getAttribute('data-key'));
  }

  function handleQuantite(e) {
    setData({ ...Data, quantite: e.target.value });
    if(e.target.value !== "") {
      totale(artId,e.target.value,id);
      setQuant(e.target.value);
    }
  }

  return (
    <>
    <Grid container style={{paddingTop:'1em'}} >
      <Grid item xs={8}>
        
          <InputLabel id="demo-simple-select-label">Nom de l'ingrédient</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            style={{width:'85%'}}
          >
            {stockData}
          </Select>
    
      </Grid>

      <Grid item xs={3}>
        <TextField id="standard-basic" type="number" key={quant} defaultValue="1" label="Quantité" onChange={(e) => handleQuantite(e)} style={{width:'85%'}} />
      </Grid>
      
    </Grid>
    </>
  );
}

export default Ingredient;
