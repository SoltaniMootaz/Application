import React, {useState} from 'react'
import{Modal,Form,Col} from 'react-bootstrap'
import {BsFillPlusCircleFill} from 'react-icons/bs'
import Axios from 'axios'
import Ingredient from './ingredients';

function AjouterCat(props) { 
  const url = "http://localhost:3001/api/ajouterArticle";
  const [error,setError] = useState(false);
  const [vente,setVente] = useState(false);
  const [tracer,setTracer] = useState(false);
  const [ajouter, setAjouter] = useState(false);

 
  const [Data,setData] = useState({
    nom: "",
    categorie: "",
    prix: "",
    unite: ""
  });

<<<<<<< HEAD
  const items = [];
  const [length,setLength] = useState(1);

  for (var i=0;i<length;i++) {
    items.push(<Ingredient id={i} />)
  }
=======
 
>>>>>>> 49b9f916b9040913d56d6cbdf4b7e011492ed915



  function submit(e) {
      e.preventDefault();
      Axios.post(url,{
        nom: Data.nom,
        categorie: Data.categorie,
        prix: Data.prix,
        unite: Data.unite,
        
      }).then(res => {
        props.handleClose();
        window.location.reload(false);
        console.log(res.data);
      }).catch(err => {
        setError(true);
        console.log(err.response.data);
      });
  }

  function handleNom(e) {
    setData({...Data ,nom:e.target.value})
  }

  function handleCategorie(e) {
    setData({...Data ,categorie:e.target.value})
  }

  function handlePrix(e) {
    setData({...Data ,prix:e.target.value})
  }

  function handleUnite(e) {
    setData({...Data ,unite:e.target.value})
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
              <Modal.Title style={{color:"red",fontSize:"20px",textAlign: 'center'}}>Article existe déja</Modal.Title>
            </Modal.Header> : "" }
          <Modal.Body>
            <Form.Group>
                <Form.Label>Nom</Form.Label>
                <Form.Control type="text" id="nom" onChange={(e) => handleNom(e)}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Catégorie</Form.Label>
                <Form.Control as="select" id="categorie" onChange={(e) => handleCategorie(e)}>
                    <option value=""></option>
                    <option value="jus">jus</option>
                    <option value="cafe">café</option>
                    <option value="test123">test123</option>
                    <option value="khoj">4</option>
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
                <Form.Control type="number" id="prix" onChange={(e) => handlePrix(e)}/>
                </Form.Group>
                {vente ?
                <Form.Group as={Col} md="3">
                    <Form.Label>Unité</Form.Label>
                    <Form.Control as="select" id="unite" onChange={(e) => handleUnite(e)}>
                        <option value="gramme">Gramme</option>
                        <option value="KG">KG</option>
                        <option value="litre">Litre</option>
                    </Form.Control>
                </Form.Group> : "" }
            </Form.Row>

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
<<<<<<< HEAD

            {tracer ? <div>
              {items} 
              <Form.Group>
                <center>
                  <BsFillPlusCircleFill style={{width:"12%",height:"12%",marginTop:"15px"}} 
                  onClick={(e)=> {
                    e.preventDefault();
                    setLength(length + 1);
                  }}/>
                  </center>
              </Form.Group>
            </div>: "" }

=======
           
            {tracer ?
             <BsFillPlusCircleFill style={{width:"30px",height:"30px%",marginTop:"15px"}} 
             />
            :""
            }<div>
            
            </div>
>>>>>>> 49b9f916b9040913d56d6cbdf4b7e011492ed915
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