import React from 'react'
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
  
function StockAddArticle(props) {
  

  
  const handleClose = () => {
   props.handleClose();
  };

    return (
        <div>
             <Dialog fullWidth={true} onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.handleOpen}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
         Ajouter un article
        </DialogTitle>
        <DialogContent dividers>
          <Grid container fullWidth>
            
            
            <Grid item xs={12}> <TextField id="standard-basic" label="Libelle" style={{width:'95%'}}/></Grid>
           
        
            
            <Grid item xs={12}> <TextField id="standard-basic" label="Code a barre" style={{width:'95%',marginTop:'2em'}}/></Grid>
          
        
            
            <Grid item xs={12}> <TextField id="standard-basic" label="Prix ttc" style={{width:'95%',marginTop:'2em'}}/></Grid>
         
           
             
            <Grid item xs={12}> <TextField id="standard-basic" label="Prix Vente" style={{width:'95%',marginTop:'2em'}}/></Grid>
           
           
            <Grid item xs={12}> <TextField id="standard-basic" label="Quantité" style={{width:'95%',marginTop:'2em',marginBottom:'3em'}}/></Grid>
           
        </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    )
}

export default StockAddArticle
