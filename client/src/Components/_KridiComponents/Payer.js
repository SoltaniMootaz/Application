import React, { useState } from 'react';
import { updateClient } from '../../services/Kridi';

import { createMuiTheme } from "@material-ui/core/styles";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    ThemeProvider
  } from "@material-ui/core";

export default function Payer(props) {
    const [montant, setMontant] = useState();
    const [max, setMax] = useState()

    const theme = createMuiTheme({
        palette: {
            primary: {
                main:"#DC572E" ,
            },
        },
    });

    const handleClose = () => {
        props.handleDialog(false);
        setMax()
        setMontant()
    }

    const handleUpdate = () => {
        updateClient(props.client.id, montant)
        handleClose();
    }

    return (
        <div>
        <ThemeProvider theme={theme}>
        <Dialog
            fullWidth={true}
            open={props.open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Grid container>
					<Grid item xs={6}>
                        <p style={{display:"inline-flex"}}>Client : {props.client ? props.client.nomPre : ""}</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p style={{display:"inline-flex"}}>
                            Montant restant : &nbsp;
                            {props.client ?
                                montant ? (props.client.montant.toFixed(3) - montant).toFixed(3) 
                                : props.client.montant.toFixed(3)              
                            : "0.000"} 
                            &nbsp;DT
                        </p>
                    </Grid>
                </Grid>
                <hr />
            </DialogTitle>
            <DialogContent>
                <center>
                <TextField 
                    id="outlined-basic" 
                    type="number"
                    label="Montant à payer" 
                    variant="outlined"
                    autoFocus
                    key={max}
                    defaultValue={max}
                    onChange={(e)=>{
                        if(e.target.value > props.client.montant)
                            e.target.value = props.client.montant
                            
                        if(max)
                            setMontant();
                        else 
                            setMontant(e.target.value);
                        
                        setMax();
                    }}
                />
                &nbsp;
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="large" 
                    style={{height:"3.6em"}}
                    onClick={()=>{
                        setMax(props.client.montant.toFixed(3));
                        setMontant(props.client.montant.toFixed(3))
                    }}
                >
                    Max
                </Button>
                </center>
            </DialogContent>
            <br />
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Annuler
                </Button>
                <Button onClick={handleUpdate} color="primary">
                    Valider
                </Button>
            </DialogActions>
        </Dialog>
        </ThemeProvider>
        </div>
    );
}