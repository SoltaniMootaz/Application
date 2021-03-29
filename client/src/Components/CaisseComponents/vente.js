import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { LoadTicket } from "../../actions"

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
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Divider,ButtonGroup,ToggleButton } from "@material-ui/core";
import {IoMdCash} from "react-icons/io"
import {FaMoneyCheckAlt} from "react-icons/fa"
import {GrCreditCard} from "react-icons/gr"
import {AiOutlineCreditCard} from "react-icons/ai"

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
  const dispatch = useDispatch();

  const url1 = "http://localhost:3001/api/ajouterClient";
  const url2 = "http://localhost:3001/api/afficherClients";

  const [error,setError] = useState("");

  const [direct,setDirect] = useState(false);
  const [kridi,setKridi] = useState(false);
  const [espece,setEspece] = useState(true);

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

  const handleClick = () => {
    props.handleClose();
    localStorage.removeItem('ticket' + localStorage.getItem('tableIndex'));
    const tableIndex = localStorage.getItem('tableIndex');
    
    for(var i=1;i<=localStorage.getItem('nbTables');i++) {
      if(!localStorage.getItem('ticket' + i)) {
        localStorage.setItem('tableIndex',i);
        break;
      }else if(i == localStorage.getItem('nbTables') && i!== localStorage.getItem('tableIndex')) {
        localStorage.setItem('tableIndex',i);
        break;
      }else {
        localStorage.setItem('tableIndex',1);
        break;
      }
    }

    dispatch(LoadTicket({}, "remove_all_data"))
  }

  function submit(e) {
    if (direct || kridi || espece) {
      e.preventDefault();
      Axios.post(url1,{
        nomPre: client.nomPre,
        tel: client.tel,
        id_utilisateur: localStorage.getItem('userID')
      })
        .then((res) => {
          console.log(res.data);
          handleClick()
          props.handleClose();
        })
        .catch((err) => {
          if(kridi)
            setError(err.response.data);
          else if(direct && !style1 && !style2 && !style3 && !style4)
            setError("veuillez sélectionner un moyen de paiement direct")
          else {
            setError();
            props.handleClose();
            handleClick()
          }
        })
    }else {
      setError("veuillez sélectionner un moyen de paiement")
    }
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

  function styling(){
   if(direct || kridi || espece){
    return{ width:'11em',
            backgroundColor:'#e0f2f1'}}
    else  return ("")
  }
  return (
    <>
    <Dialog fullWidth={true} onClose={()=> {
      props.handleClose();
      setStyle1(false);
      setStyle2(false);
      setStyle3(false);
      setStyle4(false);
    }} aria-labelledby="customized-dialog-title" open={props.handleOpen}>

        <DialogTitle id="customized-dialog-title" onClose={props.handleClose} style={{color:"#00695f"}}>
          À payer : {props.somme} DT
          {error ? 
            <p style={{ color: "red", fontSize: "20px", textAlign: "center" }}>{error}</p>
          : ""
          }
        </DialogTitle>
        <DialogContent dividers>
          <Grid container >
            <Grid container spacing={0} style={{marginLeft:'2em'}}>
            <Grid item xs={12}>
              <center>
            <ButtonGroup variant="contained" color="default" aria-label="contained primary button group">
              <Button onClick={() => changeEspece()} startIcon={<IoMdCash />} style={{width:'11em'}}>espece</Button>
          
              <Button startIcon={<FaMoneyCheckAlt />}style={{width:'11em'}}>cheque</Button>
            
              <Button   onClick={() => changeDirect()} startIcon={<GrCreditCard />}style={{width:'11em'}}>card</Button>
             
             
              </ButtonGroup>
              </center>
            </Grid>
            
            </Grid>
           
            
            <br></br>
       
              
            <Grid item xs={12}>
                {espece ? <>
                  <br/>
                  
              
                 
               
              
                 
                  
                  <Typography subtitle1 align='center'>Payement en espece:</Typography>
                  <br/>
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
               
                  
                  
                  <Divider  absolute/>
                  <br></br>
                  <hr></hr>
                  </>
                  
                : ""}
                 </Grid>
              {direct ?
              <>
             <br/>
                  <br/><br/>
                  <br/>
              <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography subtitle1 align='center'>Payement direct:</Typography>
              </Grid>
                <Grid item xs={3}>
                  {style1 ?
                  <>
                  <img alt='img1' src={d17 }width="100%" height="100%" style={{border: '2px solid #021a40'}} onClick={clicked1}></img>
                </>
                  :
                  <img  alt='img1' src={d17} width="100%" height="100%" onClick={clicked1}></img>
                  }
                </Grid>
                <Grid item xs={3}>
                  {style2 ?
                  <>
                  <img  alt='img2' src={mobiflouss} width="100%" height="100%" style={{border: '2px solid #021a40'}} onClick={clicked2}></img>
                </>
                  :
                  <img alt='img2'  src={mobiflouss} width="100%" height="100%" onClick={clicked2}></img>
                  }
                </Grid>
                <Grid item xs={3}>
                  {style3 ?
                  <>
                  <img alt='img3'  src={sobflous} width="100%" height="100%"style={{border: '2px solid #021a40'}} onClick={clicked3}></img>
                </>
                  :
                  <img  alt='img3' src={sobflous} width="100%" height="100%" onClick={clicked3}></img>
                  }
                </Grid>
                <Grid item xs={3}>
                  {style4 ?
                  <>
                  <img alt='img3'  src={edinar} width="100%" height="100%" style={{border: '2px solid #021a40'}} onClick={clicked4}></img>
                </>
                  :
                  <img alt='img3'  src={edinar} width="100%" height="100%" onClick={clicked4}></img>
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
              <Divider absolute />
              <br></br>
              <hr></hr>
              </>
              : "" }

<br></br>
                 
                  <br/>
              <Grid item xs={12}>
                <center>
          <Button variant='contained' color='default' onClick={()=>changeKridi()} startIcon={<AiOutlineCreditCard />} style={{width:'20em'}}>Kredit</Button>
          </center>
              </Grid>
              {kridi ? 
              (<>
              
                <div className={classes.root}>
                  <br></br>
                
                  <Accordion className={classes.accordion}>
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
                  <Accordion className={classes.accordion}>
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
                <Divider />
                </>
              )
              : "" }

          </Grid>
        </DialogContent>
        <DialogActions style={{justifyContent:'center',height:'5em'}}>
          <Button variant="contained" color="primary" style={{backgroundColor:'#00bcd4'}} onClick={(e)=>submit(e)}>
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    
    </>
  );
}

export default Vente;
