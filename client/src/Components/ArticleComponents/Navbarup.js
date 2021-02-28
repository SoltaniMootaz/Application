import React, { useState } from "react";
import { Nav, Navbar, Form, FormControl } from "react-bootstrap";
import { AiFillHome } from "react-icons/ai";
function Navbarup(props) {
  return (
    <>
      <Navbar.Brand href="#home">
        <AiFillHome />
      </Navbar.Brand>

      <Nav className="mr-auto">
        <Nav.Link href="#home" style={{ marginTop: "17%" }}>
          Home
        </Nav.Link>
      </Nav>
    </>
  );
}

export default Navbarup;
