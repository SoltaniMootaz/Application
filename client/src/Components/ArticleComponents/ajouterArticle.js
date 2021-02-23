import React, {useState} from 'react'
import{Modal,Form,Col} from 'react-bootstrap'
import {BsFillPlusCircleFill} from 'react-icons/bs'
import Axios from 'axios'
import Ingredient from './ingredients';

function AjouterCat(props) { 
  const url = "http://localhost:3001/api/ajouterCateg";
  const [error,setError] = useState(false);
  const [vente,setVente] = useState(false);
  const [tracer,setTracer] = useState(false);
  const [ajouter, setAjouter] = useState(false);

 
  const [Data,setData] = useState({
      categorie : "",
  });

 

  function submit(e) {
      e.preventDefault();
      Axios.post(url,{
        categorie: Data.categorie,
      }).then(res => {
        props.handleClose();
        console.log(res.data);
      }).catch(err => {
        setError(true);
        console.log(err.response.data);
      });
  }

  function handle(e) {
      const newData = {...Data};
      newData[e.target.id] = e.target.value;
      setData(newData);
  }

  function changeVente() {
      setVente(!vente);
  }

  function changeTracer() {
    setTracer(!tracer);
}

    return (
      <>
        <Modal show={props.handleOpen} onHide={props.handleClose}>
        <Form>
            <div style={{backgroundColor:"#00A600",width:"100%",height:"10px",marginTop:"0px"}}></div>
            <br />
            {error ? <Modal.Header>
              <Modal.Title style={{color:"red",fontSize:"20px",textAlign: 'center'}}>Catégorie existe déja</Modal.Title>
            </Modal.Header> : "" }
          <Modal.Body>
            <Form.Group>
                <Form.Label>Nom</Form.Label>
                <Form.Control type="text" placeholder="" />
            </Form.Group>

            <Form.Group>
                <Form.Label>Catégorie</Form.Label>
                <Form.Control as="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Check 
                    type="switch"
                    id="custom-switch"
                    label="Vente par poids"
                    checked={vente}
                    onChange={()=>changeVente()}
                />
            </Form.Group>
            <Form.Row>
                <Form.Group as={Col} md="9">
                <Form.Label>Prix</Form.Label>
                <Form.Control type="number" />
                </Form.Group>
                {vente ?
                <Form.Group as={Col} md="3">
                    <Form.Label>Unité</Form.Label>
                    <Form.Control as="select">
                        <option>Gramme</option>
                        <option>KG</option>
                        <option>Litre</option>
                    </Form.Control>
                </Form.Group> : "" }
            </Form.Row>
            {/* {!vente ? 
            <Form.Row>
                <Form.Group as={Col} md="9">
                    <Form.Label>Coût</Form.Label>
                    <Form.Control type="number" />
                </Form.Group>
            </Form.Row> : ""} */}
            <Form.Group>
                <Form.File id="image" label="Image" />
            </Form.Group>
            <Form.Group>
                <Form.Check 
                    type="switch"
                    id="tracer"
                    label="Tracer dans l'inventaire"
                    checked={tracer}
                    onChange={()=>changeTracer()}
                />
            </Form.Group>
           
            {tracer ?
             <BsFillPlusCircleFill style={{width:"30px",height:"30px%",marginTop:"15px"}} 
             />
            :""
            }<div>
            
            </div>
          </Modal.Body>
          <br /><br />
          <Modal.Footer style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <BsFillPlusCircleFill onClick={(e) =>{ 
              submit(e);
              props.handleClose();}} style={{width:"50px",height:"50px",color:"#00A600"}} />
          </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
  }
  
export default AjouterCat;