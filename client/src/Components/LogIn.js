import React, { useState } from "react";

import "../App.css";
import Axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//////////////////////////////////////////////////////////////////////////////////////////////////////
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import {Paper,TextField,InputAdornment,InputLabel,FormControl,Grid,FormControlLabel,Button} from '@material-ui/core';

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
    marginTop: '75px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '75%',
    }
}
}));
function LogIn() {
  const classes=useStyles();
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const url = "http://localhost:3001/api/login";

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    data: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post(url, {
      email: user.email,
      mdp: user.password,
    })
      .then((res) => {
        localStorage.setItem('userID',res.data);
        window.location.href = "home";
      })
      .catch((err) => {
        setError({...error, data: err.response.data});
      });
  };

  const handleEmailChange = (e) => {
    setUser({...user, email: e.target.value});
  };
  const handlePasswordChange = (e) => {
    setUser({...user, password: e.target.value });
  };
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
;

  return (
    <div className={classes.root}>

    <Paper className={classes.padding} style={{width:'33,33%',justifyContent:'center'}}>
      {error ? (<center>{error.data}</center>) : ""}
    <form onSubmit={handleSubmit}>
                <div className={classes.margin}>
                    <Grid container spacing={8} alignItems="flex-end">
                        
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="email" label="E-mail" type="email" fullWidth autoFocus required  onChange={handleEmailChange} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                     
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="username" label="Password" type="password" fullWidth required  onChange={handlePasswordChange} />
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" justify="space-between">
                       
                        <Grid item style={{paddingTop:'.5em'}}>
                        <center>
                          Vous n'avez pas de compte?{" "} <Link to="/Sign-UP" style={{color:'#0275d8'}}>Créer un compte</Link>
                        </center>
                        </Grid>
                    </Grid>
                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                        <Button variant="outlined" color="primary" style={{ textTransform: "none", width:'10em' }} type="submit">Login</Button>
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
              <Form.Group
                controlId="formPassword"
                style={{ marginTop: "40px" }}
              >
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

              {error.data.length > 0 ? (
                <center>
                  <Alert variant="danger">
                    <center>{error.data}</center>
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
                  Connexion
                </Button>
              </center>
            </Form>
            <hr></hr>
            <center>
              Vous n'avez pas de compte?{" "}
              <Link to="/Sign-UP">Créer un compte</Link>
            </center>
          </Col>
          <Col></Col>
        </Row>
      </Container> */}
    </div>
  );
}

export default LogIn;
