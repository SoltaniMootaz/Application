/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { Grid, Paper, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Doughnut, Pie } from 'react-chartjs-2';
import { loadFournisseur, loadMethodeVente, LoadNombreAchat, loadNombreVente, loadTop5 } from '../../services/Statistiques';
import { SetTop5Labels, SetTop5Values,SetFAchat,SetFournisseurs, setMethodeVenteValue, setMethodeVenteLabels, chartRandomColors } from '../../Utils/Statistiques';

function Profits() {
    
    const [top5Libelle,setTop5Libelle]=useState([]);
    const [top5Value,setTop5Value]=useState();
    const [fournisseur,setFournisseur]=useState();
    const [fournisseurNbrAchat,setFournisseurNbrAchat]=useState();
    const [valueVente,setValueVente]=useState();
    const [labelVente,setLabelVente]=useState();
    

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
    await loadMethodeVente().then((res)=>{
        console.log(res.data);
        setValueVente(setMethodeVenteValue(res.data))
        setLabelVente(setMethodeVenteLabels(res.data))
        
    })
}, [])


    return (
        <center>

             <Grid container style={{marginTop:'0.5em'}}spacing={3}>
                 
                 <Grid item xs={4}>
                     <Paper style={{width:'95%',height:'25em'}} elevation={3}>
                     <Grid container>
                     <Grid item xs={12}><Typography style={{fontWeight:'bolder',color:'#393e46'}}>Votre 5 meilleurs produits:</Typography></Grid>
                     <Grid item xs={12}> <Doughnut style={{padding:'1em'}}
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
                    '#003f5c',
                    '#77acf1',
                    '#511281',
                    '#f14668',
                    '#ffd880'],
                      borderColor:   [
                        '#003f5c',
                        '#77acf1',
                        '#511281',
                        '#f14668',
                        '#ffd880'], 
                      hoverOffset: 4
                  }],
                
                }}  options={{ 
                    maintainAspectRatio: false ,
                    
        }} ></Doughnut></Grid>
                     </Grid>
                     </Paper>
                     </Grid>
                 <Grid item xs={4}><Paper style={{width:'95%',height:'25em'}} elevation={3}><Grid container>
                     <Grid item xs={12}><Typography style={{fontWeight:'bolder',color:'#393e46'}}>Votre fournisseurs</Typography></Grid>
                     <Grid item xs={12}> <Pie 
                     style={{padding:'1em'}}
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
                        '#e84545',
                        '#caf7e3',
                        '#e4bad4',
                        '#f39189',
                        '#9ddfd3'
                      ],
                      borderColor:[
                        '#e84545',
                        '#caf7e3',
                        '#e4bad4',
                        '#f39189',
                        '#9ddfd3' 
                      ],
                      hoverOffset: 4
                  }],
                
                }}  options={{ 
                    maintainAspectRatio: false ,
                    
        }} ></Pie></Grid>
                     </Grid></Paper></Grid>
                 <Grid item xs={4}><Paper style={{width:'95%',height:'25em'}} elevation={3}> <Grid container>
                     <Grid item xs={12}><Typography style={{fontWeight:'bolder',color:'#393e46'}}>Votre méthode de vente la plus utilisée</Typography></Grid>
                     <Grid item xs={12}> <Doughnut 
                     style={{padding:'1em'}}
            height={300}
            width={100}
            data = {{
        labels:labelVente?labelVente:"",
                 datasets: [{
                    label: 'My First Dataset',
                    data:valueVente? valueVente: [],
                    fill: false,
                    tension: 0.1,
                    backgroundColor: [
                        '#c64756',
                        '#ff8882',
                        "#d8f8b7",
                        "#2978b5",
                        "#ff8303",
                        "#98ddca",
                        "#28b5b5"
                      
                      ],
                      borderColor:[
                        '#c64756',
                        '#ff8882',
                        "#d8f8b7",
                        "#2978b5",
                        "#ff8303",
                        "#98ddca",
                        "#28b5b5"
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
