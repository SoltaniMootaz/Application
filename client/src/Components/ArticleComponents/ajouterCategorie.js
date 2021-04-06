import React, { useState } from "react";
import Axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

////////////////////////////////////////////////////////

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

function AjouterCat(props) {
  const url = "http://localhost:3001/api/ajouterCateg";
  const url4 = "http://localhost:3001/api/ajouterActivite";
  const [error, setError] = useState(false);
var current=new Date();
  const [Data, setData] = useState({
    categorie: "",
  });

  function submit(e) {
    e.preventDefault();
    Axios.post(url, {
      categorie: Data.categorie,
      id_utilisateur: localStorage.getItem('userID')
    })
      .then((res) => {
        Axios.post(url4, {
          operation:"aCategorie",
          id_utilisateur:localStorage.getItem('userID'),
          date: current.toLocaleString(),
          detail:Data.categorie,
        }).catch((err) => {
          console.log(err.response.data)
          setError(err.response.data);
        });
        props.handleClose();
        window.location.reload(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  function handle(e) {
    setData({...Data,categorie:e.target.value});
  }

  return (
    <>
    <Dialog fullWidth={true} onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.handleOpen}>
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          Ajouter catégorie
        </DialogTitle>
        <DialogContent dividers>
          <Grid container >
            <Grid container >
              <Grid item xs={12}>
                <TextField id="standard-basic" label="Catégorie : jus, café..." required onChange={(e) => handle(e)} style={{width:'100%'}}/>
              </Grid>
            </Grid>
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

export default AjouterCat;
