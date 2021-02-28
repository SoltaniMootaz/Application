import React, { useState } from "react";
import { Modal, Form, Row, Col } from "react-bootstrap";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Axios from "axios";
import d17 from './img/D17.png'
import mobiflouss from './img/mobiflouss.jpg'
import sobflous from './img/sobflous.png'
import edinar from './img/edinar.png'

function Vente(props) {
  const [direct,setDirect] = useState(false);
  const [kridi,setKridi] = useState(false);

  const [style1,setStyle1] = useState(false);
  const [style2,setStyle2] = useState(false);
  const [style3,setStyle3] = useState(false);
  const [style4,setStyle4] = useState(false);

  const changeDirect = () => setDirect(!direct);
  const changeKridi = () => setKridi(!kridi);

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

  return (
    <>
      <Modal show={props.handleOpen} onHide={()=> {
        props.handleClose();
        setStyle1(false);
        setStyle2(false);
        setStyle3(false);
        setStyle4(false);} }>
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

            {kridi ? "" : ""}
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
            />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Vente;
