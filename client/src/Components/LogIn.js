import React,{useState} from 'react'
import {Row, Col, Form, Button, Container} from 'react-bootstrap'
import '../App.css'
import Axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
function LogIn() {
  const url = "http://localhost:3001/api/login";

  const [user,setUser] = useState({
      email : "",
      password : ""
  });

  const handleSubmit= event=> {
    event.preventDefault();
    Axios.post(url,{
    email: user.email,
    mdp: user.password
    }).then(res => {
      
      console.log(res.data);
    })
  }

  
  const handleEmailChange=(e)=>{
    setUser({...user ,email:e.target.value})
  }
  const handlePasswordChange=(e)=>{
    setUser({...user ,password:e.target.value})
  }




    return (
      <>
      <Container fluid style={{height:'100%'}}>
      <Row>
      <Col ></Col>
      <Col  xs={10} md={6} lg={5} style={{marginTop:'5%', height:'100%' }}>
      <Form onSubmit={handleSubmit}>



  <Form.Group controlId="formEmail">
  <Form.Label
     style={{color:"#0394fc"}}>
     Address email
  </Form.Label>
  <Form.Control
     required
     type="email" 
     placeholder="Entrée email" 
     style={{
        borderLeft: 0 ,
        borderTop : 0, 
        borderRight:0,
        borderColor: '#69c0ff',
        borderRadius:'0em'
      }}
      onChange={handleEmailChange}
       />
  </Form.Group>
  <Form.Group controlId="formPassword" style={{  marginTop:'40px'}}>
    <Form.Label 
      style={{color:"#0394fc"}}>
      Mot de passe
    </Form.Label>
    <Form.Control 
     required
     type="password" 
     placeholder="Entrée Mot de passe"
     style={{
          borderLeft: 0 ,
          borderTop : 0,
          borderRight:0,
          borderColor: '#69c0ff',
          borderRadius:'0em'}}
          onChange={handlePasswordChange}
       />
    </Form.Group>
<center>
  <Button 
   style={{
     marginTop:'40px',
     alignContent:'center',
     width:'90%',
     height:'50px',
     borderRadius:'0.5em',
     alignItems:'center',
    fontSize:'20px',
  justifySelf:'center'}}
     variant="primary" type="submit"
     >
     Log-in
  </Button>
  </center>
  </Form>
  <hr></hr>
        <center>
Vous n'avez pas de compte? <Link to="/Sign-UP">Sign-up</Link></center>
        </Col>
        <Col ></Col>
        </Row>
        </Container> 
        </>
    )
}

export default LogIn
