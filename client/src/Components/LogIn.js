import React,{useState} from 'react'
import {Row, Col, Form, Button, Container} from 'react-bootstrap'
import '../App.css'
import Axios from 'axios'
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
      <Col style={{marginTop:'5%', height:'100%'}}>
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
      Mot de pass
    </Form.Label>
    <Form.Control 
     required
     type="password" 
     placeholder="Entrée Mot de pass"
     style={{
          borderLeft: 0 ,
          borderTop : 0,
          borderRight:0,
          borderColor: '#69c0ff',
          borderRadius:'0em'}}
          onChange={handlePasswordChange}
       />
    </Form.Group>

  <Button 
   style={{
     marginTop:'40px',
     alignContent:'center',
     width:'100%',
     height:'40px',
     borderRadius:'0.5em',
     alignItems:'center'}}
     variant="primary" type="submit"
     >
     Log-in
  </Button>
  
  </Form>
        
        </Col>
        <Col ></Col>
        </Row>
        </Container> 
        </>
    )
}

export default LogIn
