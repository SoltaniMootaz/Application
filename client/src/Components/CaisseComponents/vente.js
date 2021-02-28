import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Axios from "axios";

function Vente(props) {
  return (
    <>
      <Modal show={props.handleOpen} onHide={props.handleClose}>
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
                /* checked={tracer}
                onChange={() => changeTracer()} */
              />
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="switch"
                id="kridi"
                label="Vente en kridi"
                /* checked={tracer}
                onChange={() => changeTracer()} */
              />
            </Form.Group>
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
