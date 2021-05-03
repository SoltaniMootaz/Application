import React, { useState } from "react";
import {testCle} from '../../services/Caisse'

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
    const [cle, setCle] = useState();
    const [error, setError] = useState();
    
    const handleClick = () => {
        testCle(cle)
          .then(()=>{
            localStorage.setItem('caisse',props.caisse);

            if(props.caisse)
                localStorage.setItem('openingTime',new Date().getTime());
            else
                localStorage.removeItem('openingTime');

            props.setOpen(false)
        })
        .catch((err)=>{
          setError(err.response.data)
        })           
      }

  return (
    <>
    <Dialog fullWidth={true} onClose={()=>{props.setOpen(false);setError()}} aria-labelledby="customized-dialog-title" open={props.open}>
        <DialogTitle id="customized-dialog-title" onClose={()=>{props.setOpen(false);setError()}}>
            {props.caisse ? 
                <Typography style={{fontSize:'0.9em'}}>L'ouverture de la caisse activera toutes les opérations de vente.</Typography>
            : 
                <Typography style={{fontSize:'0.9em'}}>La clôture de la caisse désactivera toutes les opérations de vente.</Typography>      
            }

          <center><p style={{color:"red"}}>{error}</p></center>
        </DialogTitle>
        <DialogContent dividers>
            <center>
                <TextField 
                  required
                  type="password"
                  id="outlined-basic"
                  label="Saisir votre clé"
                  variant="outlined"
                  style={{width:"50%"}} 
                  onChange={(e)=>setCle(e.target.value)}    
                />
            </center>
        </DialogContent>
        <DialogActions style={{justifyContent:'center',height:'5em'}}>
          <Button variant="contained" color="primary" style={{backgroundColor:'#00bcd4'}} onClick={handleClick} >
            Valider
          </Button>
        </DialogActions>
      </Dialog>    
    </>
  );
}

export default Effacer;
