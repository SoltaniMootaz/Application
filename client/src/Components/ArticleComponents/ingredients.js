import React,{useState} from 'react'
import {BsFillPlusCircleFill} from 'react-icons/bs'
import{Form,Col} from 'react-bootstrap'

function Ingredient({ parentCallback }) {
    const [ajouter, setAjouter] = useState(false);

    return (
        <>
            <Form.Row>
                <Form.Group as={Col} md="4">
                <Form.Label>Nom du produit</Form.Label>
                <Form.Control type="text" />
                </Form.Group>

                <Form.Group as={Col} md="4">
                    <Form.Label>Quantite</Form.Label>
                    <Form.Control type="number" />
                </Form.Group>

                <Form.Group as={Col} md="3">
                    <Form.Label>Unité</Form.Label>
                    <Form.Control as="select">
                        <option>Gramme</option>
                        <option>KG</option>
                        <option>Litre</option>
                    </Form.Control> 
                </Form.Group>

                <Form.Group as={Col} md="1">
                <BsFillPlusCircleFill style={{width:"100%",height:"100%",marginTop:"15px"}} 
                    onClick={()=>{
                        setAjouter(true)
                        parentCallback(ajouter)
                    }}  />
                </Form.Group>
            </Form.Row>
        </>
    )
}

export default Ingredient;