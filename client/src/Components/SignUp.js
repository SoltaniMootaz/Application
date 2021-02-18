import React,{useState} from 'react'
import {Row, Col, Form, Button, Container} from 'react-bootstrap'
import 'react-phone-number-input/style.css'
import Input from 'react-phone-number-input/input'
import '../App.css'
import PropTypes from 'prop-types'
import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input'
import en from 'react-phone-number-input/locale/en.json'
import Axios from 'axios'
function SignUp() {
  const url = "http://localhost:3001/api/signup";

  const [value, setValue] = useState()
  const [country, setCountry] = useState()

  const [user ,setUser]= useState(
    {
      name:"",
      lastName:"",
      email:"",
      password:"",
      Country:"",
      phoneNumber:""

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
      }).then(res => {
          console.log(res.data);
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
     placeholder="Entrée Prénom"  
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
     placeholder="Entrée Nom"  
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
          onChange={handlePasswordChange}/>
    </Form.Group>


    <Form.Group controlId="formPhone">
    <Form.Label
       style={{color:"#0394fc"}}>
       Numéro de télephone
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
      country={country}
      international
      withCountryCallingCode
      value={value}
      onChange={(value)=>{
       setValue(value)
       setUser({...user ,phoneNumber:value})
      }}/>
     
    </Form.Group>
 
  <Button 
   style={{
     marginTop:'30px',
     alignContent:'center',
     width:'100%',
     height:'40px',
     borderRadius:'0.5em',
     alignItems:'center'}}
     variant="primary" type="submit"
     >
     Submit
  </Button>
  
  </Form>
        
        </Col>
        <Col ></Col>
        </Row>
        </Container> 
        </>
    )
}

export default SignUp
