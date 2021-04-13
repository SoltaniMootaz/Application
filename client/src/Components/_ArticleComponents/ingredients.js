import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LoadStock } from "../../actions";
import LoadIngredients from "../../actions/menu";
import * as MenuUtils from "../../Utils/Menu"

////////////////////////////////////////////////////

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

/////////////////////////////////////////////////////

function Ingredient({ id }) {
  const dispatch = useDispatch();
  const loadStock = useSelector((state) => state.loadStock);

  const [stockData, setStockData] = useState([]);
  const [Data, setData] = useState();

  useEffect(() => {
    if (loadStock.data.length == 0) {
      dispatch(LoadStock());
    }
  }, []);

  useEffect(() => {
    loadStock.data.map((row,index) => {
      if (row)
        setStockData((stockData) => [
          ...stockData,
          <MenuItem
            key={index}
            data-key={row.id}
            prix={row.prix_ttc}
            onClick={(e) => handleNom(e)}
            value={row.libelle}
          >
            {row.libelle}
          </MenuItem>,
        ]);
    });
  }, [loadStock.data]);

  function handleNom(e) {
    var quant;

    if (Data)
      quant = Data.quantite;
    else
      quant = 1;

    setData({
      nomIngr: e.target.value,
      quantite: quant,
      prix: e.target.getAttribute("prix"),
      idIngr: e.target.getAttribute("data-key"),
    });

    dispatch(
      LoadIngredients({
        idIngr: e.target.getAttribute("data-key"),
        key: id,
        quantite: quant,
        prix: e.target.getAttribute("prix"),
      })
    );
  }

  function handleQuantite(e) {
    var quant;

    if (Data)
      quant = e.target.value;
    else
      quant = 0;

    setData({
      nomIngr: Data.nomIngr,
      quantite: quant,
      prix: Data.prix,
      idIngr: Data.idIngr,
    });
    
    dispatch(
      LoadIngredients({
        idIngr: Data.idIngr,
        key: id,
        quantite: quant,
        prix: Data.prix,
      })
    );
  }

  return (
    <>
      <Grid container style={{ paddingTop: "1em" }}>
        <Grid item xs={8}>
          <InputLabel id="demo-simple-select-label">
            Nom de l'ingrédient
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            style={{ width: "85%" }}
          >
            {stockData}
          </Select>
        </Grid>

        <Grid item xs={3}>
          <TextField
            id="standard-basic"
            type="number"
            defaultValue="1"
            label="Quantité"
            onChange={(e) => handleQuantite(e)}
            style={{ width: "85%" }}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Ingredient;
