import React,{useState} from 'react'
import {BsFillPlusCircleFill} from 'react-icons/bs'
import{Form,Col} from 'react-bootstrap'

function Ingredient({ id }) {
    var nom = "nom" + id;
    var quant = "quant" + id;
    var unite = "unite" + id;

    return (
        <>
        
            <Form.Row>
                <Form.Group as={Col} md="5">
                <Form.Label>Nom du produit</Form.Label>
                <Form.Control type="text" id={nom}/>
                </Form.Group>

                <Form.Group as={Col} md="4">
                    <Form.Label>Quantite</Form.Label>
                    <Form.Control type="number" id={quant} />
                </Form.Group>

                <Form.Group as={Col} md="3">
                    <Form.Label>Unité</Form.Label>
                    <Form.Control as="select" id={unite}>
                        <option>Gramme</option>
                        <option>KG</option>
                        <option>Litre</option>
                    </Form.Control> 
                </Form.Group>

                <Form.Group as={Col} md="1">
                  </Form.Group>
            </Form.Row>
         
        </>
    )
}

export default Ingredient;