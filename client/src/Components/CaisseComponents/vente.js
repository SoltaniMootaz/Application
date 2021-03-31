import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {IoIosPaper} from "react-icons/io"

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
  const loadTicket = useSelector(state=>state.loadTicket)

  const url1 = "http://localhost:3001/api/ajouterClient";
  const url2 = "http://localhost:3001/api/afficherClients";
  const url3 = "http://localhost:3001/api/ticket";

  const [error,setError] = useState("");
  const [montant, setMontant] = useState();
  const [rendu, setRendu] = useState(0);
  const [totale, setTotale] = useState([[{
    methode: "espece",
    montant: 0
  }],[{
    methode: "cheque",
    montant: 0
  }],[{
    methode: "kridi",
    montant: 0
  }],[{
    methode: "d17",
    montant: 0
  }],[{
    methode: "mobiflouss",
    montant: 0
  }],[{
    methode: "sobflous",
    montant: 0
  }],[{
    methode: "edinar",
    montant: 0
  }]])

  const [direct,setDirect] = useState(false);
  const [kridi,setKridi] = useState(false);
  const [espece,setEspece] = useState(true);
  const [cheque,setCheque] = useState(false);

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
  const [expanded, setExpanded] = useState(false);
  const clients = [];

  const handleMontant = (montant,methode) => {
    var tmp = totale;

    if(methode == "espece") {
      if (montant === "")
          tmp[0].montant = 0;
        else
          tmp[0].montant = montant;
    }else if(methode == "cheque") {
      if (montant === "")
          tmp[1].montant = 0;
        else
          tmp[1].montant = montant;
    }else if(methode == "kridi") {
      if (montant === "")
          tmp[2].montant = 0;
        else
          tmp[2].montant = montant;
    }else if(methode == "d17") {
      if (montant === "")
          tmp[3].montant = 0;
        else
          tmp[3].montant = montant;
    }else if(methode == "mobiflouss") {
      if (montant === "")
          tmp[4].montant = 0;
        else
          tmp[4].montant = montant;
    }else if(methode == "sobflous") {
      if (montant === "")
          tmp[5].montant = 0;
        else
          tmp[5].montant = montant;
    }else if(methode == "edinar") {
      if (montant === "")
          tmp[6].montant = 0;
        else
          tmp[6].montant = montant;
    }

    setTotale(tmp)
    calculSomme(tmp)
  }

  const calculSomme = (tot) => {
    var somme1 = 0;

    tot.map(val=>{
      if(val.montant)
        somme1 += parseFloat(val.montant);
    })


    if((props.somme - somme1) < 0) {
      setMontant(0);
      setRendu(Math.abs((props.somme - somme1).toFixed(3)));
    }else {
      setMontant((props.somme - somme1).toFixed(3))
      setRendu(0);
    }
  }

  useEffect(()=> {
    Axios.get(url2)
    .then((res) => {
      setClientData(res.data)
    })
    setMontant(props.somme)
    setRendu(0)
  },[props.somme])

  const changeEspece = () =>{
    setEspece(!espece);
  }
  const changeCheque = () =>{
    setCheque(!cheque);
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

  const handleAccChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleTicket = () => {
    var current = new Date();

    if(localStorage.getItem('ticket' + localStorage.getItem('tableIndex'))) {
      const tmp = JSON.parse(localStorage.getItem('ticket' + localStorage.getItem('tableIndex')));  

      Axios.post(url3, {
        data: tmp.data,
        quantite: tmp.quantite,
        table: tmp.table,
        somme: props.somme,
        date: current.toLocaleString(),
        operation: "vente",
        espece: totale[0].montant,
        cheque: totale[1].montant,
        kridi: totale[2].montant,
        d17: totale[3].montant,
        mobiflouss: totale[4].montant,
        sobflous: totale[5].montant,
        edinar: totale[6].montant,
        id_utilisateur: localStorage.getItem('userID')
      })
      .then(()=> {
        handleClick()
      })
      .catch((err)=>{
        setError(err.response.data)
      })
    }else {
      const tmp = loadTicket;

      Axios.post(url3, {
        data: tmp.data,
        quantite: tmp.quantite,
        table: localStorage.getItem('tableIndex'),
        somme: props.somme,
        date: current.toLocaleString(),
        operation: "vente",
        espece: totale[0].montant,
        cheque: totale[1].montant,
        kridi: totale[2].montant,
        d17: totale[3].montant,
        mobiflouss: totale[4].montant,
        sobflous: totale[5].montant,
        edinar: totale[6].montant,
        id_utilisateur: localStorage.getItem('userID')
      })
      .then(()=> {
        handleClick()
      })
      .catch((err)=>{
        setError(err.response.data)
      })
    }
  }

  const handleClick = () => {
    localStorage.removeItem('ticket' + localStorage.getItem('tableIndex'));
    props.handleClose();

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
    if(montant == 0) {
      if (kridi) {
        e.preventDefault();
        Axios.post(url1,{
          nomPre: client.nomPre,
          tel: client.tel,
          id_utilisateur: localStorage.getItem('userID')
        })
        .catch((err) => {
          setError(err.response.data);
        })
      }

      if(kridi || espece || direct || cheque) {
        handleTicket()
      }else {
        setError("veuillez sélectionner un moyen de paiement")
      }
    }else 
      setError("veuillez payer le reste du montant")
  }

  clientData.map((row, i) => {
    clients.push(<MenuItem {...clientSelec==row.nomPre ? "active" : ""} key={i} value={row.nomPre} onClick={()=>handleClientSelec(row.nomPre)}>{row.nomPre}</MenuItem>)
  })

  function styling(){
   if(direct || kridi || espece){
    return{ width:'11em',backgroundColor:'#e0f2f1'}}
    else  return ("")
  }
  return (
    <>
    <Dialog fullWidth={true} onClose={()=> {
      props.handleClose();
      setRendu(0);
      setMontant(0);
      setTotale(totale.filter(val=>val === ""));
      setStyle1(false);
      setStyle2(false);
      setStyle3(false);
      setStyle4(false);
    }} aria-labelledby="customized-dialog-title" open={props.handleOpen}>

        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          <Grid container>
            <Grid item xs={4}>
              <p style={{display:"inline",color:"#00695f"}}>À payer : {montant} DT</p>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={6}>
              <p style={{display:"inline",color:"#b51c07"}}>Rendu monnaie : {rendu} DT</p>
            </Grid>
          {error ? 
            <p style={{ color: "red", fontSize: "20px", textAlign: "center" }}>{error}</p>
          : ""
          }
          </Grid>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container >
            <Grid container spacing={0} style={{marginLeft:'2em'}}>
            <Grid item xs={12}>
              <center>
            <ButtonGroup variant="contained" color="default" aria-label="contained primary button group">
              {espece ?
                <Button onClick={() => changeEspece()} style={{backgroundColor:"#00bcd4"}} startIcon={<IoMdCash />} >espece</Button>
              : <Button onClick={() => changeEspece()} startIcon={<IoMdCash />} >espece</Button> }

              {cheque ?
                <Button onClick={() => changeCheque()} style={{backgroundColor:"#00bcd4"}} startIcon={<FaMoneyCheckAlt />}>cheque</Button>
              : <Button onClick={() => changeCheque()} startIcon={<FaMoneyCheckAlt />}>cheque</Button> }
            
              {direct ?
                <Button onClick={() => changeDirect()} style={{backgroundColor:"#00bcd4"}} startIcon={<GrCreditCard />}>en ligne</Button>
              : <Button onClick={() => changeDirect()} startIcon={<GrCreditCard />}>en ligne</Button> }
             
              {kridi ?
                <Button onClick={() => changeKridi()} style={{backgroundColor:"#00bcd4"}} startIcon={<IoIosPaper />}>Kridi</Button>
              : <Button onClick={() => changeKridi()} startIcon={<IoIosPaper />}>Kridi</Button> }

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
                    onChange={(e)=>handleMontant(e.target.value,"espece")}
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
                  <br></br>
                  </>
                  
                : ""}
                {cheque&&espece ? <hr /> : ""}
            </Grid>

            <Grid item xs={12}>
                {cheque ? <>
                  <br/>          
                  <Typography subtitle1 align='center'>Payement avec cheque:</Typography>
                  <br/>
                  <center>
                  <TextField
                    required
                    id="outlined-number"
                    label="Montant"
                    type="number"
                    onChange={(e)=>handleMontant(e.target.value,"cheque")}
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
                  <br></br>
                  </>
                  
                : ""}
                {cheque&&direct ? <hr /> : ""}
            </Grid>

              {direct ?
              <>
             <br/>
                  <br/><br/>
                  <br/>
              <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography subtitle1 align='center'>Payement en ligne:</Typography>
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
                    onChange={(e)=>handleMontant(e.target.value,"d17")}
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
                    onChange={(e)=>handleMontant(e.target.value,"mobiflouss")}
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
                    onChange={(e)=>handleMontant(e.target.value,"sobflous")}
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
                    onChange={(e)=>handleMontant(e.target.value,"edinar")}
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

              {kridi ? 
              (<>
                <div className={classes.root}>
                  {direct&&kridi ? <hr /> : ""}
                  <Typography subtitle1 align='center'>Payement en kridi:</Typography>
                  <br />
                  <Accordion className={classes.accordion} expanded={expanded === 'panel1'} onChange={handleAccChange('panel1')}>
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
                                onChange={(e)=>handleMontant(e.target.value,"kridi")}
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
                          onChange={(e)=>handleMontant(e.target.value,"kridi")}
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
