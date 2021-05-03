import { Grid, Paper } from '@material-ui/core'
import React from 'react'

function Profits() {
    return (
        <center>

             <Grid container style={{marginTop:'0.5em'}}spacing={3}>
                 
                 <Grid item xs={4}>
                     <Paper style={{width:'95%'}} elevation={3}>
                     Profit par jour
                     </Paper>
                     </Grid>
                 <Grid item xs={4}><Paper style={{width:'95%'}} elevation={3}>Profit par moins</Paper></Grid>
                 <Grid item xs={4}><Paper style={{width:'95%'}} elevation={3}>Profit par année</Paper></Grid>
                 
             </Grid>
        </center>
    )
}

export default Profits
