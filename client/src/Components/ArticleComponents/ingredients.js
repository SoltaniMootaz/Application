import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { LoadStock } from '../../actions'
import LoadIngredients from '../../actions/menu'

////////////////////////////////////////////////////

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

/////////////////////////////////////////////////////

function Ingredient({ id }) {
  const dispatch = useDispatch();
  const loadStock = useSelector(state=>state.loadStock)

  const [stockData,setStockData] = useState([]);
  const [Data, setData] = useState();

  const getStock = () => {
    loadStock.data.map(row=> {
      if(row)
        setStockData(stockData => [...stockData,<MenuItem key={id} data-key={row.id} prix={row.prix_ttc} onClick={(e)=>handleNom(e)} value={row.libelle} defaultValue="">{row.libelle}</MenuItem>])
    });
   }

   useEffect(()=> {
    if (loadStock.data.length == 0) {
      dispatch(LoadStock())
    }
   },[])

  useEffect(() => {
      getStock();
  },[loadStock.data]);

  function handleNom(e) {
    if(Data) {
      setData({nomIngr: e.target.value, quantite: Data.quantite, prix: e.target.getAttribute('prix'), idIngr: e.target.getAttribute('data-key')}); 
      dispatch(LoadIngredients({idIngr: e.target.getAttribute('data-key'), key: id, quantite: Data.quantite, prix: e.target.getAttribute('prix')}))
    }else {
      setData({nomIngr: e.target.value, quantite: 1, prix: e.target.getAttribute('prix'), idIngr: e.target.getAttribute('data-key')}); 
      dispatch(LoadIngredients({idIngr: e.target.getAttribute('data-key'), key: id, quantite: 1, prix: e.target.getAttribute('prix')}))
    }
  }

  function handleQuantite(e) {
    setData({nomIngr: Data.nomIngr ,quantite: e.target.value, prix: Data.prix, idIngr: Data.idIngr});

    if(e.target.value !== "")
      dispatch(LoadIngredients({idIngr: Data.idIngr, key: id, quantite: e.target.value, prix: Data.prix}))
    else 
      dispatch(LoadIngredients({idIngr: Data.idIngr, key: id, quantite: 0, prix: Data.prix}))
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
        <TextField id="standard-basic" type="number" defaultValue="1" label="Quantité" onChange={(e) => handleQuantite(e)} style={{width:'85%'}} />
      </Grid>
      
    </Grid>
    </>
  );
}

export default Ingredient;
