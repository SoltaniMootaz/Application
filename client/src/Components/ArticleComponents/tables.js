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

function ModifierArt(props) {

  function submit(e) {
    e.preventDefault();
    localStorage.setItem('nbTables', e.target.value)
    props.handleClose();
  }

  return (
    <>
    <Dialog fullWidth={true} onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.handleOpen}>
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          Modifier tables
        </DialogTitle>
        <DialogContent dividers>
          <Grid container >
            <Grid container >
              <Grid item xs={12}>
                <TextField id="standard-basic" label="Nombre de tables" required style={{width:'100%'}}/>
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

export default ModifierArt;
