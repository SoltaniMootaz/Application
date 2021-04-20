import React, { useEffect, useState } from 'react';

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
  import { makeStyles } from "@material-ui/core/styles";
  import { createMuiTheme } from "@material-ui/core/styles";
export default function Payer(props) {
    const [montant, setMontant] = useState();
    const [max, setMax] = useState()

    const handleClose = () => {
        props.handleDialog(false);
        setMax()
        setMontant()
    }
    const theme = createMuiTheme({
        palette: {
            primary: {
                main:"#DC572E" ,
            },
        },
    });
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
					<Grid item xs={7}>
                        <p style={{display:"inline-flex"}}>Client : {props.client ? props.client.nomPre : ""}</p>
                    </Grid>
                    <Grid item xs={5}>
                        <p style={{display:"inline-flex"}}>
                            À payer : &nbsp;
                            {props.client ?
                                montant ? (props.client.montant.toFixed(3) - montant).toFixed(3) 
                                : props.client.montant.toFixed(3)              
                            : "0.000"} 
                            DT
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
                    label="Montant" 
                    variant="outlined"
                    autoFocus
                    key={max}
                    defaultValue={max}
                    onChange={(e)=>{
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
                <Button onClick={handleClose} color="primary">
                Valider
                </Button>
            </DialogActions>
        </Dialog>
        </ThemeProvider>
        </div>
    );
}