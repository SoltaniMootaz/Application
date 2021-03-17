import React, { useState } from "react";

import "react-phone-number-input/style.css";
import Input from "react-phone-number-input/input";
import "../App.css";
import PropTypes from "prop-types";
import {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en.json";
import Axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//////////////////////////////////////////////////////////////////////////////////////////
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import {Paper,TextField,InputAdornment,InputLabel,FormControl,Grid,FormControlLabel,Button,Select} from '@material-ui/core';
///////////////////////////////////////////////////////////////////////////////////////////////////////
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing.unit * 2,
},
root: {
backgroundColor:'#f7f7f7',
opacity:'0.8',

position:'fixed',
width:'100%',
height:'100%',
top:'0px',
left:'0px',
zIndex:'1000',
},
padding: {
    padding: theme.spacing.unit, 
    maxWidth: '40%',
    maxHeight:'40em',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20%',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '75%',
    }
}
}));
function SignUp() {
  const classes=useStyles();
  const url = "http://localhost:3001/api/signup";

  const [succes, setSucces] = useState({
    data: "",
  });
  const [error, setError] = useState({
    data: "",
  });
  const [value, setValue] = useState();
  const [country, setCountry] = useState();

  const [user, setUser] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    Country: "",
    phoneNumber: "",
    commerce: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post(url, {
      email: user.email,
      nom: user.name,
      prenom: user.lastName,
      adr: user.Country,
      tel: user.phoneNumber,
      mdp: user.password,
      commerce: user.commerce,
    })
      .then((res) => {
        setSucces({ ...succes, data: res.data });
        setError({ ...error, data: "" });
      })
      .catch((err) => {
        setSucces({ ...succes, data: "" });
        setError({ ...error, data: err.response.data });
      });
  };

  const CountrySelect = ({ value, onChange, labels, ...rest }) => (
    <>
    <InputLabel htmlFor="commerce">Commerce</InputLabel>
    <Select
      native
      
      inputProps={{
        name: 'commerce',
        id: 'commerce',
      }}
      style={{width:'100%'}}
      {...rest}
      value={value}
      onChange={(event) => onChange(event.target.value || undefined)}
    >
      <option value="">{labels["ZZ"]}</option>
      {getCountries().map((country) => (
        <option key={country} value={country}>
          {labels[country]} +{getCountryCallingCode(country)}
        </option>
      ))}
    </Select>
   
    </>
  );

  CountrySelect.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    labels: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  const handleEmailChange = (e) => {
    setUser({ ...user, email: e.target.value });
  };
  const handleNameChange = (e) => {
    setUser({ ...user, name: e.target.value });
  };
  const handleLastNameChange = (e) => {
    setUser({ ...user, lastName: e.target.value });
  };
  const handlePasswordChange = (e) => {
    setUser({ ...user, password: e.target.value });
  };

  const handleCommerceChange = (e) => {
    setUser({ ...user, commerce: e.target.value });
  };

  return (
    
  <div className={classes.root}>

<Paper className={classes.padding} style={{width:'33,33%',justifyContent:'center'}}>
<form onSubmit={handleSubmit}>
            <div className={classes.margin}>
                <Grid container spacing={8} alignItems="flex-end">
                    
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="email" label="E-mail" type="email" fullWidth autoFocus required  onChange={handleEmailChange} />
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="nom" label="Nom" type="text" fullWidth autoFocus required  onChange={handleNameChange} />
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="prénom" label="Prénom" type="text" fullWidth autoFocus required  onChange={handleLastNameChange} />
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                 
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="password" label="Mot de passe" type="password" fullWidth required  onChange={handlePasswordChange} />
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    
                    <Grid item md={true} sm={true} xs={true}>
                    <InputLabel htmlFor="commerce">Commerce</InputLabel>
                    <Select
                      native
                      
                      inputProps={{
                        name: 'commerce',
                        id: 'commerce',
                      }}
                      onChange={handleCommerceChange}
                      style={{width:'100%'}}
                    >
                  <option value="attar">Attar</option>
                  <option value="hammas">Hammas</option>
                  <option value="café">Café</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="patisserie">Patisserie</option>
                     </Select>
                    
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    
                    <Grid item md={true} sm={true} xs={true}>
                    <CountrySelect
                  required
                  className="country"
                  labels={en}
                  value={country}
                  onChange={(country) => {
                    setCountry(country);
                    setUser({ ...user, Country: country });
                  }}
                />
                    </Grid>
                </Grid>
               
                
                <Grid container justify="center" style={{ marginTop: '20px' }}>
                <TextField id="numtlphone" label="numéro de télephone" type="" fullWidth required   onChange={(value) => {
                    setValue(value);
                    setUser({ ...user, phoneNumber: value });
                  }} pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"/>
                {/* <Input
                  required
                  placeholder="numéro de télephone"
                  className="phone"
                  pattern=".{8,}"
           
                  title="8 chiffres minimum"
                  country={country}
                  international
                  withCountryCallingCode
                  value={value}
                  onChange={(value) => {
                    setValue(value);
                    setUser({ ...user, phoneNumber: value });
                  }}
                /> */}
                </Grid>
                <Grid container alignItems="center" justify="space-between">
                   
                    <Grid item style={{paddingTop:'.5em'}}>
                    <center>
                         Vous avez déjà un compte? <Link to="/Sign-UP" style={{color:'#0275d8'}}>Connexion</Link>
                    </center>
                    </Grid>
                </Grid>
                <Grid container justify="center" style={{ marginTop: '10px' }}>
                        <Button variant="outlined" color="primary" style={{ textTransform: "none", width:'10em' }} type="submit">Sign-Up</Button>
                    </Grid>
            </div>
            </form>
        </Paper>

      {/* <Container fluid style={{ height: "100%" }}>
        <Row>
          <Col></Col>
          <Col
            xs={10}
            md={6}
            lg={5}
            style={{ marginTop: "5%", height: "100%" }}
          >
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label style={{ color: "#0394fc" }}>
                  Adresse email
                </Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Entrer votre email"
                  style={{
                    borderLeft: 0,
                    borderTop: 0,
                    borderRight: 0,
                    borderColor: "#69c0ff",
                    borderRadius: "0em",
                  }}
                  onChange={handleEmailChange}
                />
              </Form.Group>

              <Form.Group controlId="formName">
                <Form.Label style={{ color: "#0394fc" }}>Nom</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Entrer votre Prénom"
                  style={{
                    borderLeft: 0,
                    borderTop: 0,
                    borderRight: 0,
                    borderColor: "#69c0ff",
                    borderRadius: "0em",
                  }}
                  onChange={handleNameChange}
                />
              </Form.Group>

              <Form.Group controlId="formLastName">
                <Form.Label style={{ color: "#0394fc" }}>Prénom</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Entrer votre Nom"
                  style={{
                    borderLeft: 0,
                    borderTop: 0,
                    borderRight: 0,
                    borderColor: "#69c0ff",
                    borderRadius: "0em",
                  }}
                  onChange={handleLastNameChange}
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label style={{ color: "#0394fc" }}>
                  Mot de passe
                </Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Entrer votre mot de passe"
                  style={{
                    borderLeft: 0,
                    borderTop: 0,
                    borderRight: 0,
                    borderColor: "#69c0ff",
                    borderRadius: "0em",
                  }}
                  onChange={handlePasswordChange}
                />
              </Form.Group>

              <Form.Group controlId="formCommerce">
                <Form.Label style={{ color: "#0394fc" }}>
                  Votre commerce
                </Form.Label>
                <select className="commerce" onChange={handleCommerceChange}>
                  <option value="attar">Attar</option>
                  <option value="hammas">Hammas</option>
                  <option value="café">Café</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="patisserie">Patisserie</option>
                </select>
              </Form.Group>

              <Form.Group controlId="formPhone">
                <Form.Label style={{ color: "#0394fc" }}>Pays</Form.Label>
                <CountrySelect
                  required
                  className="country"
                  labels={en}
                  value={country}
                  onChange={(country) => {
                    setCountry(country);
                    setUser({ ...user, Country: country });
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formPhone">
                <Form.Label style={{ color: "#0394fc" }}>
                  Numéro de télephone
                </Form.Label>
                <Input
                  required
                  placeholder="numéro de télephone"
                  className="phone"
                  pattern=".{8,}"
                  required
                  title="8 chiffres minimum"
                  country={country}
                  international
                  withCountryCallingCode
                  value={value}
                  onChange={(value) => {
                    setValue(value);
                    setUser({ ...user, phoneNumber: value });
                  }}
                />
              </Form.Group>

              {succes.data.length > 0 ? (
                <center>
                  <Alert variant="success">
                    <center>
                      Compte crée avec succés,{" "}
                      <Alert.Link href="/Log-in">Connexion</Alert.Link>
                    </center>
                  </Alert>
                </center>
              ) : error.data.length > 0 ? (
                <center>
                  <Alert variant="danger">
                    <center>
                      Compte existe déja,{" "}
                      <Alert.Link href="/Log-in">Connexion</Alert.Link>
                    </center>
                  </Alert>
                </center>
              ) : (
                ""
              )}

              <center>
                <Button
                  style={{
                    marginTop: "40px",
                    alignContent: "center",
                    width: "90%",
                    height: "50px",
                    borderRadius: "0.5em",
                    alignItems: "center",
                    fontSize: "20px",
                    justifySelf: "center",
                  }}
                  variant="primary"
                  type="submit"
                >
                  Valider
                </Button>
              </center>
            </Form>
            <hr></hr>
            <center>
              Vous avez déjà un compte? <Link to="/Log-in">Connexion</Link>{" "}
            </center>
            <br />
            <br />
          </Col>
          <Col></Col>
        </Row>
      </Container> */}
    </div>
  );
}

export default SignUp;
