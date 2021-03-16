import React, { useState, useEffect } from "react";
import { Form, Col } from "react-bootstrap";
import Axios from "axios";

function Ingredient({ id, submitForm, idArticle,stock,totale }) {
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
     setStockData(stockData => [...stockData,<option key={row.id} data-key={row.id} >{row.libelle}</option>])
    });
   }

  useEffect(() => {
    console.log(stock);
    loadStock();
    if (submitForm) {
      submit();
    }
  },[submitForm]);

  function handleNom(e) {
    setData({ ...Data, nomIngr: e.target.value });
    const selectedIndex = e.target.options.selectedIndex;
    totale(e.target.options[selectedIndex].getAttribute('data-key'),_quant,id);
    setArtId(e.target.options[selectedIndex].getAttribute('data-key'));
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
      <Form.Row>
        <Form.Group as={Col} md="8">
          <Form.Label>Nom de l'ingrédient</Form.Label>
          <Form.Control as="select" id="nomIngr" key={nom}  onChange={(e) =>{ handleNom(e)}}>
            <option defaultChecked></option>
            {stockData}
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>Quantite</Form.Label>
          <Form.Control
            type="number"
            key={quant}
            id="quantite"
            defaultValue="1"
            onChange={(e) => handleQuantite(e)}
          />
        </Form.Group>

      </Form.Row>
    </>
  );
}

export default Ingredient;
