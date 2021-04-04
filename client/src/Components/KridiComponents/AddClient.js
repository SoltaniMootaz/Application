import React,{useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Grid,TextField } from '@material-ui/core';
import axios from 'axios';

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

function AddClient(props) {
    const url1 = "http://localhost:3001/api/ajouterClient";

    function submit(e){
        e.preventDefault();
        axios.post(url1,{
          nomPre: client.nomPre,
          tel: client.tel,
          id_utilisateur: localStorage.getItem('userID')
        })
        .catch((err) => {
          console.log(err);
        })
        window.location.reload(false);
    }
    const [client,setClient] = useState({
        nomPre : "",
        tel: ""
      })
      function handleNomPre(e) {
        setClient({...client,nomPre: e.target.value});
      }
    
      function handleTel(e) {
        setClient({...client,tel: e.target.value});
      }
  
    return (
        <div>
            <Dialog fullWidth={true} onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.handleOpen}>
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          Ajouter un client
        </DialogTitle>
        <DialogContent dividers>
            <center>
            <Grid container>
                <Grid item xs={12} style={{marginTop:'2em'}}>
                              <TextField
                            required
                            id="standard-basic"
                            label="Nom et prénom"
                            type="text"
                            InputProps={{
                              
                            }}
                            onChange={(e)=>{handleNomPre(e)}}
                          />
                        </Grid>
                        <Grid item xs={12} style={{marginTop:'2em'}}>
                          <TextField
                            required
                            id="standard-basic"
                            label="Télèphone"
                            type="text"
                            InputProps={{
                             
                            }}
                            onChange={(e)=>{handleTel(e)}}
                          />
                        </Grid>
                    </Grid>
                    </center>
                    <br></br>
                    <br></br>
                    <br></br>
        </DialogContent>
        <DialogActions style={{justifyContent:'center',height:'5em'}}>
          
          <Button variant="contained" autoFocus onClick={(e)=>submit(e)} color="primary" >
            Ajouter
          </Button>
         
        </DialogActions>
      </Dialog> 
        </div>
    )
}

export default AddClient
