import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Axios from "axios";

function AjouterCat(props) {
  const url = "http://localhost:3001/api/ajouterCateg";
  const [error, setError] = useState(false);

  const [Data, setData] = useState({
    categorie: "",
  });

  function submit(e) {
    e.preventDefault();
    Axios.post(url, {
      categorie: Data.categorie,
    })
      .then((res) => {
        props.handleClose();
        window.location.reload(false);
        console.log(res.data);
      })
      .catch((err) => {
        setError(true);
        console.log(err.response.data);
      });
  }

  function handle(e) {
    const newData = { ...Data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }

  return (
    <>
      <Modal show={props.handleOpen} onHide={props.handleClose} style={{   zIndex: '100001 !important',
          marginTop:'5em'}}>
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
                Catégorie existe déja
              </Modal.Title>
            </Modal.Header>
          ) : (
            ""
          )}
          <Modal.Body>
            <Form.Label>Catégorie</Form.Label>
            <Form.Control
              type="text"
              id="categorie"
              placeholder="jus,café.."
              onChange={(e) => handle(e)}
              value={Data.categorie}
            />
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
              onClick={(props.handleClose, (e) => submit(e))}
              style={{ width: "50px", height: "50px", color: "#176cd4" }}
            />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default AjouterCat;
