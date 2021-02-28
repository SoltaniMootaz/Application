import React,{useState, useEffect} from 'react'
import {Form,Col} from 'react-bootstrap'
import Axios from 'axios'

function Ingredient({ id,submitForm }) {
    var nom = "nom" + id;
    var quant = "quant" + id;
    var unite = "unite" + id;

    const url = "http://localhost:3001/api/ajouterIngredient";
    const [Data,setData] = useState({
        nomIngr: "",
        quantite: ""
      });

    function submit() {
        console.log("here");
        Axios.post(url,{
          nomIngr: Data.nomIngr,
          quantite: Data.quantite,
          nomArt: "jus d'orange"
        }).then(res => {
          console.log(res.data);
        }).catch(err => {
          console.log(err.response.data);
        });
    }

    useEffect (() => {
        if(submitForm) {
            submit();
        }
    })

    function handleNom(e) {
        setData({...Data ,nomIngr:e.target.value})
    }

    function handleQuantite(e) {
        setData({...Data ,quantite:e.target.value})
    }


    return (
        <>   
            <Form.Row>
                <Form.Group as={Col} md="5">
                <Form.Label>Nom de l'ingrédient</Form.Label>
                <Form.Control type="text" key = {nom} id="nomIngr" onChange={(e)=> handleNom(e)} />
                </Form.Group>

                <Form.Group as={Col} md="4">
                    <Form.Label>Quantite</Form.Label>
                    <Form.Control type="number" key = {quant} id="quantite" onChange={(e)=> handleQuantite(e)} />
                </Form.Group>

                <Form.Group as={Col} md="3">
                    <Form.Label>Unité</Form.Label>
                    <Form.Control as="select" id={unite}>
                        <option defaultChecked>Gramme</option>
                    </Form.Control> 
                </Form.Group>
            </Form.Row>
        </>
    )
}

export default Ingredient;