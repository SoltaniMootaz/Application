import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { LoadTicket } from "../../actions";
import axios from 'axios'

//////////////////////////////////////////////////////////

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

/////////////////////////////////////////////////////////

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

function Effacer(props) {
    const url1 = "http://localhost:3001/api/ticket";
    const url2 = "http://localhost:3001/api/testCle/" + localStorage.getItem("userID");
    const dispatch = useDispatch();

    const [cle, setCle] = useState();
    const [error, setError] = useState();

    const supprimer = () => {
        axios.post(url2, {
            cle : cle
        })
        .then(()=>{
            if(localStorage.getItem('ticket' + localStorage.getItem('tableIndex'))) {
                const tmp = JSON.parse(localStorage.getItem('ticket' + localStorage.getItem('tableIndex')));
                var current = new Date();
            
                axios.post(url1, {
                    data: tmp.data,
                    quantite: tmp.quantite,
                    table: tmp.table,
                    somme: props.somme,
                    date: current.toLocaleString(),
                    operation: "effacé",
                    id_utilisateur: localStorage.getItem('userID'),
                    typeCommerce: localStorage.getItem('commerce')
                }).then(()=> {
                    props.handleClose();
                    localStorage.removeItem('ticket' + localStorage.getItem('tableIndex'));
                    dispatch(LoadTicket({}, "remove_all_data"))
                })
                .catch(err=>{
                    setError(err.response.data)
                })
            }else {
                props.handleClose();
                dispatch(LoadTicket({}, "remove_all_data"))
            }
        })
        .catch((err)=>{
            setError(err.response.data)
        })           
      }

  return (
    <>
    <Dialog fullWidth={true} onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.handleOpen}>
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          Saisir votre clé de suppression
          <center><p style={{color:"red"}}>{error}</p></center>
        </DialogTitle>
        <DialogContent dividers>
            <center>
                <TextField 
                    type="password"
                    id="outlined-basic"
                    label="Clé"
                    variant="outlined"
                    style={{width:"50%"}} 
                    onChange={(e)=>setCle(e.target.value)}    
                />
            </center>
        </DialogContent>
        <DialogActions style={{justifyContent:'center',height:'5em'}}>
          <Button variant="contained" color="primary" style={{backgroundColor:'#00bcd4'}} onClick={supprimer} >
            Valider
          </Button>
        </DialogActions>
      </Dialog>    
    </>
  );
}

export default Effacer;
