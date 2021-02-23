import React,{useState} from 'react'
import {Row, Col, Form, Button, Container, Alert} from 'react-bootstrap'
import 'react-phone-number-input/style.css'
import Input from 'react-phone-number-input/input'
import '../App.css'
import PropTypes from 'prop-types'
import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input'
import en from 'react-phone-number-input/locale/en.json'
import Axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function SignUp() {
  const url = "http://localhost:3001/api/signup";

  const [succes,setSucces] = useState({
    data:""
  });
  const [error,setError] = useState({
    data:""
  });
  const [value, setValue] = useState()
  const [country, setCountry] = useState()
  
  const [user ,setUser]= useState(
    {
      name:"",
      lastName:"",
      email:"",
      password:"",
      Country:"",
      phoneNumber:"",
      commerce :""

    }
  )

const handleSubmit= event =>{
      event.preventDefault();
      Axios.post(url,{
          email: user.email,
          nom:  user.name,
          prenom: user.lastName,
          adr: user.Country,
          tel: user.phoneNumber,
          mdp: user.password,
          commerce:user.commerce
      }).then(res => {
          setSucces({...succes, data : res.data});
          setError({...error, data : ""});
      }).catch(err => {
          setSucces({...succes, data : ""});
          setError({...error, data : err.response.data});
      })
  }

 
 
  const CountrySelect = ({ value, onChange, labels, ...rest }) => (
    <select
      {...rest}
      value={value}
       onChange={event => onChange(event.target.value || undefined)}>
    <option value="">
        {labels['ZZ']}
    </option>
      {getCountries().map((country) => (
    <option key={country} value={country}>
          {labels[country]} +{getCountryCallingCode(country)}
    </option>
      ))}
    </select>
  )

  
  CountrySelect.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    labels: PropTypes.objectOf(PropTypes.string).isRequired
  }
 

    const handleEmailChange=(e)=>{
      setUser({...user ,email:e.target.value})
    }
    const handleNameChange=(e)=>{
      setUser({...user ,name:e.target.value})
    }
    const handleLastNameChange=(e)=>{
      setUser({...user ,lastName:e.target.value})
    }
    const handlePasswordChange=(e)=>{
      setUser({...user ,password:e.target.value})
    }

   const handleCommerceChange=(e)=>{
     setUser({...user, commerce:e.target.value})
   }

     
    
      
    
    return (
        <>
        <Container fluid style={{height:'100%'}}>
        <Row>
        <Col ></Col>
        <Col xs={10} md={6} lg={5} style={{marginTop:'5%', height:'100%'}}>
        <Form onSubmit={handleSubmit}>

 

    <Form.Group controlId="formEmail">
    <Form.Label
       style={{color:"#0394fc"}}>
       Adresse email
    </Form.Label>
    <Form.Control
       required
       type="email" 
       placeholder="Entrer votre email" 
       style={{
          borderLeft: 0 ,
          borderTop : 0, 
          borderRight:0,
          borderColor: '#69c0ff',
          borderRadius:'0em'
        }}
        onChange={handleEmailChange} />
    </Form.Group>

    <Form.Group controlId="formName">
    <Form.Label 
      style={{color:"#0394fc"}}>
      Nom
    </Form.Label>
    <Form.Control 
     required
     type="text" 
     placeholder="Entrer votre Prénom"  
     style={{
       borderLeft: 0 , 
       borderTop : 0, 
       borderRight:0 ,
       borderColor: '#69c0ff',
       borderRadius:'0em'}}
       onChange={handleNameChange}/>
    </Form.Group> 
    


    <Form.Group controlId="formLastName">
    <Form.Label 
      style={{color:"#0394fc"}}>
      Prénom
    </Form.Label>
    <Form.Control
     required
     type="text" 
     placeholder="Entrer votre Nom"  
     style={{
        borderLeft: 0 , 
        borderTop : 0, 
        borderRight:0 ,
        borderColor: '#69c0ff',
        borderRadius:'0em'}}
        onChange={handleLastNameChange}/>
    </Form.Group> 

    <Form.Group controlId="formPassword">
    <Form.Label 
      style={{color:"#0394fc"}}>
      Mot de passe
    </Form.Label>
    <Form.Control 
     required
     type="password" 
     placeholder="Entrer votre mot de passe"
     style={{
          borderLeft: 0 ,
          borderTop : 0,
          borderRight:0,
          borderColor: '#69c0ff',
          borderRadius:'0em'}}
          onChange={handlePasswordChange}/>
    </Form.Group>

    <Form.Group controlId="formCommerce">
    <Form.Label
       style={{color:"#0394fc"}}>
       Votre commerce
    </Form.Label>
    <select className="commerce"   onChange={handleCommerceChange}>
      <option value="attar">Attar</option>
      <option value="hammas">Hammas</option>
      <option value="café">Café</option>
      <option value="restaurant">Restaurant</option>
      <option value="patisserie">Patisserie</option>
    </select>
    </Form.Group>

    <Form.Group controlId="formPhone">
    <Form.Label
       style={{color:"#0394fc"}}>
       Pays
    </Form.Label>
    <CountrySelect
      required
      className="country"
      labels={en}
      value={country}
      onChange={(country)=>{
        setCountry(country)
        setUser({...user ,Country:country})
      }}/>
    </Form.Group>




    <Form.Group controlId="formPhone">
    <Form.Label 
      style={{color:"#0394fc"}}>
       Numéro de télephone
    </Form.Label>
    <Input
      required
      placeholder="numéro de télephone"
      className="phone"
      pattern=".{8,}"
      required title="8 chiffres minimum"
      country={country}
      international
      withCountryCallingCode
      value={value}
      onChange={(value)=>{
       setValue(value)
       setUser({...user ,phoneNumber:value})
      }}/>
     
    </Form.Group>

        {succes.data.length>0 ? <center>
          <Alert variant="success">
            <center>Compte crée avec succés, <Alert.Link href="/Log-in">Connexion</Alert.Link></center>
          </Alert>
        </center> : error.data.length>0 ? <center>
          <Alert variant="danger">
            <center>Compte existe déja, <Alert.Link href="/Log-in">Connexion</Alert.Link></center>
          </Alert>
        </center> : "" } 

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
    justifySelf:'center'
}}
     variant="primary" type="submit"
     >
       Valider
  </Button>
  </center>
  </Form>
        <hr></hr>
        <center>Vous avez déjà un compte? <Link to="/Log-in">Connexion</Link> </center>
        <br /><br />
        </Col>
        <Col ></Col>
        </Row>
        </Container> 
        </>
    )
}

export default SignUp
