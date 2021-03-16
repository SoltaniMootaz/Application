import React, { useState, useEffect } from "react";
import { Modal, Form, Col } from "react-bootstrap";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Axios from "axios";
import Ingredient from "./ingredients";

function AjouterCat(props) {
  const url = "http://localhost:3001/api/ajouterArticle";
  const url2 = "http://localhost:3001/api/afficherCategorie";
  const urlstock = "http://localhost:3001/api/stock";
  const categ = [];
  const items = [];
  const [error, setError] = useState("");
  const [vente, setVente] = useState(false);
  const [tracer, setTracer] = useState(false);
  const [categories, setCategories] = useState([]);
  const [length, setLength] = useState(1);
  const [_submit, setSubmit] = useState(false);
  const [idArt, setIdArt] = useState("");
  const [Data, setData] = useState({
    nom: "",
    categorie: "",
    prix: "",
    unite: "",
  });
  const [stock,setStock] = useState([])
  const [totale,setTotale] = useState([{
    idArt:null,
    quantite:null,
    idIngr:null
  }]);
  const [somme,setSomme] = useState(0);
  const [loaded,setLoaded] = useState(false);

  const Occurrences = (n) => {
    var occ = 0;

    totale.map(e=> {
      if(e.idIngr == n) {
        occ ++;
      }
    })

    return occ;
  }

  const addTotale = (id1,quant,id2) => {
    if(Occurrences(id2)>=1) {
      setTotale(totale.filter((e)=>(e.idIngr !== id2)));
    }
    
    if(id1 !== "undefined") {
      setTotale(totale => [...totale,{idArt:id1,quantite:quant,idIngr:id2}]);
    }
  }

  const calculTotale = () => {
    var sm = 0;
    totale.map(e=> {
      const article = stock.filter(e1=>(e1.id == e.idArt));
      article.map(row=>{
        sm += parseFloat(row.prix) * parseInt(e.quantite,10);
      })
    })

    return sm.toFixed(2);
  }

  const getCategories = () => {
    Axios.get(url2)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStock = () => {
    Axios.get(urlstock)
      .then((res) => {
        setStock(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setSomme(calculTotale());
    if(!loaded) {
      getCategories();
      getStock();
      setLoaded(true);
    }
  }, [totale]);

  categories.map((categorie, i) => {
    categ.push(
      <option key={i} value={categorie.nom}>
        {categorie.nom}
      </option>
    );
  });

  for (var i = 0; i < length; i++) {
    items.push(
      <Ingredient key={i} id={i} submitForm={_submit} idArticle={idArt} stock={stock} totale={addTotale} />
    );
  }

  function submit(e) {
    e.preventDefault();
    Axios.post(url, {
      nom: Data.nom,
      categorie: Data.categorie,
      prix: Data.prix,
      unite: Data.unite,
      id_utilisateur: localStorage.getItem('userID')
    })
      .then((res) => {
        console.log(res);
        setIdArt(res.data.rows[0].id);
        setSubmit(true);
        props.handleClose();
      })
      .catch((err) => {
        setError(err.response.data);
      });
  }

  function handleNom(e) {
    setSubmit(false);
    setData({ ...Data, nom: e.target.value });
  }

  function handleCategorie(e) {
    setSubmit(false);
    setData({ ...Data, categorie: e.target.value });
  }

  function handlePrix(e) {
    setSubmit(false);
    setData({ ...Data, prix: e.target.value });
  }

  function handleUnite(e) {
    setSubmit(false);
    setData({ ...Data, unite: e.target.value });
  }

  function changeVente() {
    setVente(!vente);
  }

  function changeTracer() {
    setTracer(!tracer);
  }

  return (
    <>
      <Modal show={props.handleOpen} onHide={()=>{props.handleClose(); setError("")}}>
        <Form>
          <div
            style={{
              backgroundColor: "#176cd4",
              width: "100%",
              height: "10px",
              marginTop: "0px",
            }}
          ></div>
          <br />
          {error ? (
            <Modal.Header>
              <Modal.Title
                style={{ color: "red", fontSize: "20px", textAlign: "center" }}
              >
                <>{error}</>
              </Modal.Title>
            </Modal.Header>
          ) : (
            ""
          )}
          <Modal.Body>
            <Form.Group>
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                id="nom"
                onChange={(e) => handleNom(e)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Catégorie</Form.Label>
              <Form.Control
                as="select"
                id="categorie"
                onChange={(e) => handleCategorie(e)}
                required
              >
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
                onChange={() => changeVente()}
              />
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} md="9">
                <Form.Label>Prix</Form.Label>
                <Form.Control
                  required
                  type="number"
                  id="prix"
                  onChange={(e) => handlePrix(e)}
                  required
                />
              </Form.Group>
              {vente ? (
                <Form.Group as={Col} md="3">
                  <Form.Label>Unité</Form.Label>
                  <Form.Control
                    as="select"
                    id="unite"
                    onChange={(e) => handleUnite(e)}
                  >
                    <option value="gramme">Gramme</option>
                    <option value="KG">KG</option>
                    <option value="litre">Litre</option>
                  </Form.Control>
                </Form.Group>
              ) : (
                ""
              )}
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
                onChange={() => changeTracer()}
              />
            </Form.Group>
            {tracer ? (
              <div>
                <hr />
                <p style={{textAlign:"right",color:"red"}}>Coût : {somme} DT</p>
                {items}
                <Form.Group>
                  <center>
                    <BsFillPlusCircleFill
                      style={{ width: "12%", height: "12%", marginTop: "15px" }}
                      onClick={(e) => {
                        e.preventDefault();
                        setLength(length + 1);
                      }}
                    />
                  </center>
                </Form.Group>
              </div>
            ) : (
              ""
            )}
          </Modal.Body>
          <br />
          <br />
          <Modal.Footer
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BsFillPlusCircleFill
              onClick={(e) => {
                submit(e);
              }}
              style={{ width: "50px", height: "50px", color: "#176cd4" }}
            />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default AjouterCat;
