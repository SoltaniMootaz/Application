import React, {useState,useEffect} from 'react'
import{Modal,Form,Col} from 'react-bootstrap'
import {BsFillPlusCircleFill} from 'react-icons/bs'
import Axios from 'axios'
import Ingredient from './ingredients';

function AjouterCat(props) { 
  const url = "http://localhost:3001/api/ajouterArticle";
  const url2 = "http://localhost:3001/api/afficherCategorie";
  const categ = [];
  const items = [];
  const [error,setError] = useState(false);
  const [vente,setVente] = useState(false);
  const [tracer,setTracer] = useState(false);
  const [categories,setCategories] = useState([]);
  const [length,setLength] = useState(1);
  const [_submit,setSubmit] = useState(false);
  const [Data,setData] = useState({
    nom: "",
    categorie: "",
    prix: "",
    unite: ""
  });
  

const getCategories=()=>{
  Axios.get(url2)
    .then(res => {
      setCategories(res.data);
    }).catch(err => {
      console.log(err);
    });
  }

  useEffect(()=> {
    getCategories();
  },[]);

  categories.map((categorie,i) => {
    categ.push(<option key={i} value={categorie.nom}>{categorie.nom}</option>);
  });

  for (var i=0;i<length;i++) {
    items.push(<Ingredient key={i} id={i} submitForm={_submit} />)
  }



  function submit(e) {
      e.preventDefault();
      setSubmit(true);
      Axios.post(url,{
        nom: Data.nom,
        categorie: Data.categorie,
        prix: Data.prix,
        unite: Data.unite,
        
      }).then(res => {
        setSubmit(false);
        props.handleClose();
      }).catch(err => {
        setError(true);
      });
  }

  function handleNom(e) {
    setSubmit(false);
    setData({...Data ,nom:e.target.value})
  }

  function handleCategorie(e) {
    setSubmit(false);
    setData({...Data ,categorie:e.target.value})
  }

  function handlePrix(e) {
    setSubmit(false);
    setData({...Data ,prix:e.target.value})
  }

  function handleUnite(e) {
    setSubmit(false);
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
                <Form.Control type="text" id="nom" onChange={(e) => handleNom(e)} required/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Catégorie</Form.Label>
                <Form.Control as="select" id="categorie" onChange={(e) => handleCategorie(e)} required>
                  <option value=""></option>
                  {categ}
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
                <Form.Control type="number" id="prix" onChange={(e) => handlePrix(e)} required/>
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

          </Modal.Body>
          <br /><br />
          <Modal.Footer style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <BsFillPlusCircleFill onClick={(e) =>{submit(e)}} style={{width:"50px",height:"50px",color:"#00A600"}} />
          </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
  }
  
export default AjouterCat;