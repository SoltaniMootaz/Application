import React, { useState, useEffect } from "react";
import { Modal, Form, Row, Col,InputGroup, FormControl, Tabs, Tab, Container, Dropdown, DropdownButton } from "react-bootstrap";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Axios from "axios";
import d17 from './img/D17.png'
import mobiflouss from './img/mobiflouss.jpg'
import sobflous from './img/sobflous.png'
import edinar from './img/edinar.png'

/////////////////////////////////////////////////////////////////////////

import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';


////////////////////////////////////////////////////////////////////////////

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function Vente(props) {
  const classes = useStyles();

  const url1 = "http://localhost:3001/api/ajouterClient";
  const url2 = "http://localhost:3001/api/afficherClients";

  const [error,setError] = useState("");

  const [direct,setDirect] = useState(false);
  const [kridi,setKridi] = useState(false);
  const [espece,setEspece] = useState(false);

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

  const changeEspece = () =>{
    setEspece(!espece);
  }
  const changeDirect = () =>{
     setDirect(!direct);
  }
  const changeKridi = () => {
    setKridi(!kridi);
  }

  const clicked1 = () => { 
    setStyle1(!style1);
  };
  const clicked2 = () => { 
    setStyle2(!style2);
  };
  const clicked3 = () => { 
    setStyle3(!style3);
  };
  const clicked4 = () => { 
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
    clients.push(<MenuItem {...clientSelec==row.nomPre ? "active" : ""} key={i} value={row.nomPre} onClick={()=>handleClientSelec(row.nomPre)}>{row.nomPre}</MenuItem>)
  })

  return (
    <>
    <Dialog fullWidth={true} onClose={()=> {
      props.handleClose();
      setStyle1(false);
      setStyle2(false);
      setStyle3(false);
      setStyle4(false);
    }} aria-labelledby="customized-dialog-title" open={props.handleOpen}>

        <DialogTitle id="customized-dialog-title" onClose={props.handleClose} style={{color:"green"}}>
          À payer : {props.somme} DT
          {error ? 
            <p style={{ color: "red", fontSize: "20px", textAlign: "center" }}>{error}</p>
          : ""
          }
        </DialogTitle>
        <DialogContent dividers>
          <Grid container >
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={espece}
                      onChange={() => changeEspece()}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Vente en espèces"
                />
              </Grid>
              
              <Grid item xs={12}>
                {espece ? <>
                  <br />
                  <center>
                  <TextField
                    required
                    id="outlined-number"
                    label="Montant"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                      width:"100%"
                    }}
                    variant="outlined"
                  />
                  </center>
                  </>
                : ""}
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={direct}
                      onChange={() => changeDirect()}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Vente direct"
                />
              </Grid>

              {direct ?
              <>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  {style1 ?
                  <>
                  <img src={d17} width="100%" height="100%" style={{border: '2px solid #021a40'}} onClick={clicked1}></img>
                </>
                  :
                  <img src={d17} width="100%" height="100%" onClick={clicked1}></img>
                  }
                </Grid>
                <Grid item xs={3}>
                  {style2 ?
                  <>
                  <img src={mobiflouss} width="100%" height="100%" style={{border: '2px solid #021a40'}} onClick={clicked2}></img>
                </>
                  :
                  <img src={mobiflouss} width="100%" height="100%" onClick={clicked2}></img>
                  }
                </Grid>
                <Grid item xs={3}>
                  {style3 ?
                  <>
                  <img src={sobflous} width="100%" height="100%" style={{border: '2px solid #021a40'}} onClick={clicked3}></img>
                </>
                  :
                  <img src={sobflous} width="100%" height="100%" onClick={clicked3}></img>
                  }
                </Grid>
                <Grid item xs={3}>
                  {style4 ?
                  <>
                  <img src={edinar} width="100%" height="100%" style={{border: '2px solid #021a40'}} onClick={clicked4}></img>
                </>
                  :
                  <img src={edinar} width="100%" height="100%" onClick={clicked4}></img>
                  }
                </Grid>
              </Grid>

              <Grid item xs={12}><br /></Grid>

              <Grid container spacing={2}>
                <Grid item xs={3}>
                  {style1 ? 
                  <TextField
                    required
                    id="outlined-number"
                    label="Montant"
                    type="number"
                    InputLabelProps={{
                      shrink: true
                    }}
                    variant="outlined"
                  />
                  : <><br/>
                  <br/>
                  <br/> </>}
                </Grid>

                <Grid item xs={3}>
                  {style2 ?
                  <TextField
                    required
                    id="outlined-number"
                    label="Montant"
                    type="number"
                    InputLabelProps={{
                      shrink: true
                    }}
                    variant="outlined"
                  />
                  : "" }
                </Grid>

                <Grid item xs={3}>
                  {style3 ?
                  <TextField
                    required
                    id="outlined-number"
                    label="Montant"
                    type="number"
                    InputLabelProps={{
                      shrink: true
                    }}
                    variant="outlined"
                  />
                  : "" }
                </Grid>

                <Grid item xs={3}>
                  {style4 ?
                  <TextField
                    required
                    id="outlined-number"
                    label="Montant"
                    type="number"
                    InputLabelProps={{
                      shrink: true
                    }}
                    variant="outlined"
                  />
                  : "" }
                </Grid>
              </Grid>
              </>
              : "" }

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={kridi}
                      onChange={() => changeKridi()}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Vente en kridi"
                />
              </Grid>

              {kridi ? 
              (
                <div className={classes.root}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>Ajouter client</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <center>
                          <Grid container spacing={3}>
                            <Grid item xs={12}>
                              <TextField
                                required
                                id="standard-basic"
                                label="Nom et prénom"
                                type="text"
                                onChange={(e)=>handleNomPre(e)}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                required
                                id="standard-basic"
                                label="Télèphone"
                                type="text"
                                onChange={(e)=>handleTel(e)}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                required
                                id="standard-basic"
                                label="Montant"
                                type="number"
                              />
                            </Grid>
                          </Grid>
                        </center>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography className={classes.heading}>Sélectionner client</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <InputLabel id="demo-simple-select-label">Clients</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          defaultValue=""
                          required
                          style={{width:'100%'}}
                        >
                          {clients}
                        </Select>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          required
                          id="standard-basic"
                          label="Montant"
                          type="number"
                        />
                      </Grid>
                    </Grid>

                    </AccordionDetails>
                  </Accordion>

                </div>
              )
              : "" }

          </Grid>
        </DialogContent>
        <DialogActions style={{justifyContent:'center'}}>
        <Fab color="primary" aria-label="add" onClick={(e) => submit(e)}>
        <AddIcon />
      </Fab>
        </DialogActions>
      </Dialog>

      
      {/* ///////////////////////////// */}


      <Modal onHide={()=> {
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
          <p style={{textAlign:"right",color:"green"}}>À payer : {props.somme} DT&nbsp;</p>
          <Modal.Body style={{'maxHeight': 'calc(100vh - 210px)', 'overflowY': 'auto'}}>
          <Form.Group>
            <Form.Check
              type="switch"
              id="espece"
              label="Vente en espèces"
              checked={espece}
              onChange={() => changeEspece()}
            />
          </Form.Group>
            <br />
          {espece ? 
          <>
          <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-default" style={{width:"10rem"}}>Montant</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            required
            type="text"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            onChange={(e)=>handleNomPre(e)}
          />
        </InputGroup>
        <br />
          </>
          : ""
          }

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
                <>
                <img src={d17} width="100%" height="100%" style={{border: '2px solid #021a40'}} onClick={clicked1}></img>
              </>
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
              <br/>
              <Row>
                <Col xs={3}>

                  {style1 ? <InputGroup className="mb-3">
                    <FormControl
                      required
                      type="number"
                      aria-label="Default"
                      placeholder="Montant"
                      aria-describedby="inputGroup-sizing-default"
                      onChange={(e)=>handleNomPre(e)}
                    />
                  </InputGroup> : ""}
                </Col>
                <Col xs={3}>

                  {style2 ? <InputGroup className="mb-3">
                    <FormControl
                      required
                      type="number"
                      aria-label="Default"
                      placeholder="Montant"
                      aria-describedby="inputGroup-sizing-default"
                      onChange={(e)=>handleNomPre(e)}
                    />
                  </InputGroup> : ""}
                </Col>
                <Col xs={3}>

                  {style3 ? <InputGroup className="mb-3">
                    <FormControl
                      required
                      type="number"
                      aria-label="Default"
                      placeholder="Montant"
                      aria-describedby="inputGroup-sizing-default"
                      onChange={(e)=>handleNomPre(e)}
                    />
                  </InputGroup> : ""}
                </Col>
                <Col xs={3}>

                  {style4 ? <InputGroup className="mb-3">
                    <FormControl
                      required
                      type="number"
                      aria-label="Default"
                      placeholder="Montant"
                      aria-describedby="inputGroup-sizing-default"
                      onChange={(e)=>handleNomPre(e)}
                    />
                  </InputGroup> : ""}
                </Col>
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
              <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Tab eventKey="home" title="Sélectionner client">
                <br />
                <Row>
                  <Col>
                  <InputGroup className="mb-4">
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
                  </Col>
                  <Col>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-default" style={{width:"5rem"}}>Montant</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      required
                      type="number"
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </InputGroup>
                  </Col>
                </Row>
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

                    <InputGroup className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-default" style={{width:"10rem"}}>Montant</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        required
                        type="number"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                      />
                    </InputGroup>
                  </Container>
                </Tab>
              </Tabs>
            </>
            :
            ""}
            <hr />
            <br />
            <br />
            <div
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
            </div>
          </Modal.Body>
        </Form>
      </Modal>
    </>
  );
}

export default Vente;
