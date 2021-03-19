import React, { useState, useEffect } from "react";
import { Modal, Form, Row, Col,InputGroup, FormControl, Tabs, Tab, Container, DropdownButton } from "react-bootstrap";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Axios from "axios";
import d17 from './img/D17.png'
import mobiflouss from './img/mobiflouss.jpg'
import sobflous from './img/sobflous.png'
import edinar from './img/edinar.png'
import { withStyles, makeStyles} from '@material-ui/core/styles';
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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


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
  multilineColor:{
    color:'black'
  }
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
                    defaultValue={props.somme}
                    InputProps={{
                      className: classes.multilineColor
                    }}
                    InputLabelProps={{
                      shrink: true
                    }}
                    style={{}}
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
                    InputProps={{
                      className: classes.multilineColor
                    }}
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
                    InputProps={{
                      className: classes.multilineColor
                    }}
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
                    InputProps={{
                      className: classes.multilineColor
                    }}
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
                    InputProps={{
                      className: classes.multilineColor
                    }}
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
                                InputProps={{
                                  className: classes.multilineColor
                                }}
                                onChange={(e)=>handleNomPre(e)}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                required
                                id="standard-basic"
                                label="Télèphone"
                                type="text"
                                InputProps={{
                                  className: classes.multilineColor
                                }}
                                onChange={(e)=>handleTel(e)}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                required
                                id="standard-basic"
                                label="Montant"
                                type="number"
                                InputProps={{
                                  className: classes.multilineColor
                                }}
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
                          required
                          style={{width:'100%'}}
                          InputProps={{
                            className: classes.multilineColor
                          }}
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
                          InputProps={{
                            className: classes.multilineColor
                          }}
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
    
    </>
  );
}

export default Vente;
