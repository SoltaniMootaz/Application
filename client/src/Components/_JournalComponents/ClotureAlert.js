import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ClotureAlert(props) {
    const handleClick = () => {
        localStorage.setItem('caisse',false);
        localStorage.removeItem('openingTime');
        props.setOpen(false)
    }

    return (
        <div>
        <Dialog
            open={props.open}
            onClose={()=>props.setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Clôturer la caisse?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                La clôture de la caisse désactivera toutes les opérations de vente. 
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>props.setOpen(false)} color="primary">
                Annuler
            </Button>
            <Button onClick={handleClick} color="primary" autoFocus>
                Valider
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}