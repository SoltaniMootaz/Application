import React, { useState, useEffect } from "react";
import { Modal, Form, Row, Col,InputGroup, FormControl, Tabs, Tab, Container, Dropdown, DropdownButton } from "react-bootstrap";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Axios from "axios";
import d17 from './img/D17.png'
import mobiflouss from './img/mobiflouss.jpg'
import sobflous from './img/sobflous.png'
import edinar from './img/edinar.png'

function Vente(props) {
  const url1 = "http://localhost:3001/api/ajouterClient";
  const url2 = "http://localhost:3001/api/afficherClients";

  const [error,setError] = useState("");

  const [direct,setDirect] = useState(false);
  const [kridi,setKridi] = useState(false);

  const [style1,setStyle1] = useState(false);
  const [style2,setStyle2] = useState(false);
  const [style3,setStyle3] = useState(false);
  const [style4,setStyle4] = useState(false);

  const [client,setClient] = useState({
    nomPre : "",
    tel: ""
  })

  const [clientSelec,setClientSelec] = useState("");
  const [clientData,setClientData] = useState([])
  const clients = [];


  const changeDirect = () =>{
     setDirect(!direct);
     setKridi(false);
  }
  const changeKridi = () => {
    setKridi(!kridi);
    setDirect(false);
  }

  const clicked1 = () => { 
    setStyle1(!style1);
    setStyle2(false);
    setStyle3(false);
    setStyle4(false);
  };
  const clicked2 = () => { 
    setStyle1(false);
    setStyle2(!style2);
    setStyle3(false);
    setStyle4(false);
  };
  const clicked3 = () => { 
    setStyle1(false);
    setStyle2(false);
    setStyle3(!style3);
    setStyle4(false);
  };
  const clicked4 = () => { 
    setStyle1(false);
    setStyle2(false);
    setStyle3(false);
    setStyle4(!style4);
  };

  function handleNomPre(e) {
    setClient({...client,nomPre: e.target.value});
  }

  function handleTel(e) {
    setClient({...client,tel: e.target.value});
  }

  function handleClientSelec(e) {
    setClientSelec(e);
  }

  function submit(e) {
    e.preventDefault();
    Axios.post(url1,{
      nomPre: client.nomPre,
      tel: client.tel,
      id_utilisateur: localStorage.getItem('userID')
    })
      .then((res) => {
        console.log(res.data);
        props.handleClose();
      })
      .catch((err) => {
        if(kridi)
          setError(err.response.data);
        else
          props.handleClose();
      })
  }

  useEffect(()=> {
    Axios.get(url2)
    .then((res) => {
      setClientData(res.data)
    })
  })

  clientData.map((row, i) => {
    clients.push(<Dropdown.Item {...clientSelec==row.nomPre ? "active" : ""} key={i} value={row.nomPre} onClick={()=>handleClientSelec(row.nomPre)}>{row.nomPre}</Dropdown.Item>)
  })

  return (
    <>
      <Modal show={props.handleOpen} onHide={()=> {
        props.handleClose();
        setStyle1(false);
        setStyle2(false);
        setStyle3(false);
        setStyle4(false);} } style={{
          zIndex: '100001 !important',
          marginTop:'5em'
        }}>
        <Form>
          <div
            style={{
              backgroundColor: "#176cd4",
              width: "100%",
              height: "10px",
              marginTop: "0px",
            }}
          ></div>
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
          <br />
          <Modal.Body>
          <Form.Group>
              <Form.Check
                type="switch"
                id="direct"
                label="Vente direct"
                checked={direct}
                onChange={() => changeDirect()}
              />
            </Form.Group>

            {direct ? 
              <>
              <hr />
              <Row>
                <Form.Group style={{paddingLeft:"1rem",color:"#0065a1"}}> Moyen de vente : </Form.Group>
              </Row>
              <Row>
                <Col xs={3}>
                {style1 ?
                <img src={d17} width="100%" height="100%" style={{border: '2px solid #021a40'}} onClick={clicked1}></img>
                :
                <img src={d17} width="100%" height="100%" onClick={clicked1}></img>
                }
                </Col>
                <Col xs={3}>
                {style2 ?
                <img src={mobiflouss} width="100%" height="100%" style={{border: '2px solid #021a40'}} onClick={clicked2}></img>
                :
                <img src={mobiflouss} width="100%" height="100%" onClick={clicked2}></img>
                }
                </Col>
                <Col xs={3}>
                {style3 ?
                <img src={sobflous} width="100%" height="100%" style={{border: '2px solid #021a40'}} onClick={clicked3}></img>
                :
                <img src={sobflous} width="100%" height="100%" onClick={clicked3}></img>
                }
                </Col>
                <Col xs={3}>
                {style4 ?
                <img src={edinar} width="100%" height="100%" style={{border: '2px solid #021a40'}} onClick={clicked4}></img>
                :
                <img src={edinar} width="100%" height="100%" onClick={clicked4}></img>
                }
                </Col>
              </Row>
              <br />
              <Row>
                <Col xs={3} style={{fontSize:"17px",color:"#0065a1"}} onClick={clicked1}> <center>D17</center> </Col>
                <Col xs={3} style={{fontSize:"17px",color:"#0065a1"}} onClick={clicked2}> <center>Mobiflouss</center> </Col>
                <Col xs={3} style={{fontSize:"17px",color:"#0065a1"}} onClick={clicked3}> <center>Sob flous</center> </Col>
                <Col xs={3} style={{fontSize:"17px",color:"#0065a1"}} onClick={clicked4}> <center>e-dinar</center> </Col>
              </Row>
              <br />
              <hr />
              </>
            : <br />}
 
            <Form.Group>
              <Form.Check
                type="switch"
                id="kridi"
                label="Vente en kridi"
                checked={kridi}
                onChange={() => changeKridi()}
              />
            </Form.Group>

            {kridi ?
            <>
            <br />
            <center>
              <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Tab eventKey="home" title="Sélectionner client">
                  <br />
                <InputGroup className="mb-3">
                  <DropdownButton
                    as={InputGroup.Prepend}
                    variant="outline-secondary"
                    title="Client"
                    id="input-group-dropdown-1"
                  >
                    {clients}

                  </DropdownButton>
                  <FormControl aria-describedby="basic-addon1" disabled value={clientSelec} />
                </InputGroup>
                </Tab>
                <Tab eventKey="profile" title="Ajouter client">
                  <br />
                  <Container>
                    <InputGroup className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-default" style={{width:"10rem"}}>Nom et prénom</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        required
                        type="text"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        onChange={(e)=>handleNomPre(e)}
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-default" style={{width:"10rem"}}>Téléphone</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        onChange={(e)=>handleTel(e)}
                        required
                      />
                    </InputGroup>
                  </Container>
                </Tab>
              </Tabs>
            </center>
            </>
            :
            ""}
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
              style={{ width: "50px", height: "50px", color: "#176cd4" }}
              onClick={(e)=>{
                submit(e);
              }}
            />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Vente;
