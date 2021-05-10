/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { Grid, Paper } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Doughnut, Pie } from 'react-chartjs-2';
import { loadFournisseur, LoadNombreAchat, loadNombreVente, loadTop5 } from '../../services/Statistiques';
import { SetTop5Labels, SetTop5Values,SetFAchat,SetFournisseurs } from '../../Utils/Statistiques';

function Profits() {
    
    const [top5Libelle,setTop5Libelle]=useState([]);
    const [top5Value,setTop5Value]=useState();
    const [fournisseur,setFournisseur]=useState();
    const [fournisseurNbrAchat,setFournisseurNbrAchat]=useState();
    const [nbrVente,setNbrVente]=useState();
    const [nbrAchat,setNbrAchat]=useState();

useEffect(async () => {
    await loadTop5().then((res)=>{
        setTop5Libelle(SetTop5Labels(res.data))
        setTop5Value(SetTop5Values(res.data))
    })
}, [])
useEffect(async () => {
    await loadFournisseur().then((res)=>{
        setFournisseur(SetFournisseurs(res.data))
        setFournisseurNbrAchat(SetFAchat(res.data))
    })
}, [])
useEffect(async () => {
    await loadNombreVente().then((res)=>{
        setNbrVente(res.data[0].count)
        
    })
}, [])
useEffect(async () => {
    await LoadNombreAchat().then((res)=>{
       
        setNbrAchat(res.data[0].count)
        
    })
}, [])
 console.log(nbrVente);
    return (
        <center>

             <Grid container style={{marginTop:'0.5em'}}spacing={3}>
                 
                 <Grid item xs={4}>
                     <Paper style={{width:'95%'}} elevation={3}>
                     <Grid container>
                     <Grid item xs={12}>Profit par jour</Grid>
                     <Grid item xs={12}> <Doughnut 
            height={300}
            width={100}
            data = {{
        labels:top5Libelle ? top5Libelle:"",
                 datasets: [{
                    label: 'My First Dataset',
                    data:top5Value? top5Value : [],
                    fill: false,
                    tension: 0.1,
                    backgroundColor: [
                        'rgb(75, 192, 192)',
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(30, 200, 90)'
                      ],
                      borderColor:[
                        'rgb(75, 192, 192)',
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)' ,
                        'rgb(30, 200, 90)' 
                      ],
                      hoverOffset: 4
                  }],
                
                }}  options={{ 
                    maintainAspectRatio: false ,
                    
        }} ></Doughnut></Grid>
                     </Grid>
                     </Paper>
                     </Grid>
                 <Grid item xs={4}><Paper style={{width:'95%'}} elevation={3}><Grid container>
                     <Grid item xs={12}>Profit par jour</Grid>
                     <Grid item xs={12}> <Pie 
            height={300}
            width={100}
            data = {{
        labels:fournisseur ? fournisseur:"",
                 datasets: [{
                    label: 'My First Dataset',
                    data:fournisseurNbrAchat? fournisseurNbrAchat : [],
                    fill: false,
                    tension: 0.1,
                    backgroundColor: [
                        'rgb(75, 192, 192)',
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(30, 200, 90)'
                      ],
                      borderColor:[
                        'rgb(75, 192, 192)',
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)' ,
                        'rgb(30, 200, 90)' 
                      ],
                      hoverOffset: 4
                  }],
                
                }}  options={{ 
                    maintainAspectRatio: false ,
                    
        }} ></Pie></Grid>
                     </Grid></Paper></Grid>
                 <Grid item xs={4}><Paper style={{width:'95%'}} elevation={3}> <Grid container>
                     <Grid item xs={12}>Profit par jour</Grid>
                     <Grid item xs={12}> <Doughnut 
            height={300}
            width={100}
            data = {{
        labels:["Nombre vente","Nombre achat"],
                 datasets: [{
                    label: 'My First Dataset',
                    data:nbrAchat && nbrVente? [nbrVente,nbrAchat] : [],
                    fill: false,
                    tension: 0.1,
                    backgroundColor: [
                        'rgb(75, 192, 192)',
                        'rgb(255, 99, 132)',
                      
                      ],
                      borderColor:[
                        'rgb(75, 192, 192)',
                        'rgb(255, 99, 132)',
                        
                      ],
                      hoverOffset: 4
                  }],
                
                }}  options={{ 
                    maintainAspectRatio: false ,
                    
        }} ></Doughnut></Grid>
                     </Grid></Paper></Grid>
                 
             </Grid>
        </center>
    )
}

export default Profits
