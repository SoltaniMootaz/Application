import React, { useState } from "react";
import * as MenuServices from '../../services/Menu'
import {ajouterActivite} from '../../services/Activite'

///////////////////////////////////////////////////////

import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
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
const theme = createMuiTheme({
	palette: {
		primary: {
			main:"#00A600"  ,
		},
		
	},
});
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
  const [Data, setData] = useState();

  function submit(e) {
    e.preventDefault();

    MenuServices.ajouterCategorie(Data)
      .then((res) => {
        ajouterActivite("aCategorie", Data)
        props.handleClose();
        window.location.reload(false);
        console.log(res.data);
      })
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
                <TextField id="standard-basic" label="Catégorie : jus, café..." required onChange={(e) => setData(e.target.value)} style={{width:'100%'}}/>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{justifyContent:'center'}}>
        <ThemeProvider theme={theme}>
          <Fab color="primary" aria-label="add" onClick={(e) => submit(e)} >
          <AddIcon />
          </Fab>
          </ThemeProvider>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AjouterCat;
