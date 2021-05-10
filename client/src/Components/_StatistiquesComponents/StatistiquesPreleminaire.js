/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, Paper } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2'
import { loadQteAchat, loadQteVente,loadProfitVente,loadSortieAchat } from '../../services/Statistiques';
import { filterChartDataDate } from '../../Utils/Stock';
import { SetData,SetBarData } from '../../Utils/Statistiques';

function StatistiquesPreleminaire() {
    const [dates,setDates]=useState();
    const [data1,setData1]=useState();
    const [data2,setData2]=useState();
    const [profit,setProfit]=useState();
    const [sortie,setSortie]=useState();
    useEffect(async () => {
       setDates(await filterChartDataDate())
       await loadQteVente().then((res)=>setData1(res.data))
       await loadQteAchat().then((res)=>setData2(res.data))
       await loadProfitVente().then((res)=>setProfit(res.data))
       await loadSortieAchat().then((res)=>setSortie(res.data))
    }, [])
    function DateFormatter(dates){
        var array=[];
        if(dates){
        dates.forEach(element =>{
        array.push(element.toISOString().split('T')[0]);
        })}
          return array;
      }
    const labels=['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
    return (
        <Grid container spacing={4}>
            <Grid item xs={1}></Grid>
                <Grid item xs={10}>
            <Paper elevation={3} style={{with:'90%'}}>
            <Line 
            height={300}
            width={100}
            data = {{
        labels: DateFormatter(dates),
  datasets: [{
    label: 'My First Dataset',
    data: SetData(data1,dates),
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }],
 
}}  options={{ 
    maintainAspectRatio: false ,
    scales: {
        xAxes: [{
            ticks: {
                autoSkip: false,
                maxRotation: 90,
                minRotation: -90,
            }
        }],
        yAxes: [{
            suggestedMin: 50,
        
        }]
    }
        }} ></Line>
        </Paper>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={10} style={{paddingTop:'1em'}}>
        <Paper style={{with:'90%'}} elevation={3}>
            <Line 
            height={300}
            width={100}
            data = {{
        labels: DateFormatter(dates),
  datasets: [{
    label: 'My second Dataset',
    data: SetData(data2,dates),
    fill: false,
    borderColor: 'rgb(186, 100, 118)',
    tension: 0.1
  }],
 
}}  options={{ 
    maintainAspectRatio: false ,
    scales: {
        xAxes: [{
            ticks: {
                autoSkip: false,
                maxRotation: 90,
                minRotation: -90,
            }
        }],
        yAxes: [{
            suggestedMin: 50,
        
        }]
    }
        }} ></Line>
        </Paper>
        
        </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={10} style={{paddingTop:'1em'}}>
            <Paper style={{with:'90%'}} elevation={3}>
            <Bar 
            height={300}
            width={100}
            data = {{
        labels: DateFormatter(dates),
  datasets: [{
    label: 'profit vente',
    data: SetBarData(profit,dates),
    fill: false,
    backgroundColor: [
       
        'rgb(30, 200, 90)'
      ],
      borderColor:[
        
        'rgb(30, 200, 90)' 
      ],
    tension: 0.1
  },{
    label: 'sortie achat',
    data: SetBarData(sortie,dates),
    fill: false,
    backgroundColor: [
        'red',
     
      ],
      borderColor:[
        'red',
       
      ],
    tension: 0.1
  }],
 
}}  options={{ 
    maintainAspectRatio: false ,
    scales: {
        xAxes: [{
            ticks: {
                autoSkip: false,
                maxRotation: 90,
                minRotation: -90,
            }
        }],
        yAxes: [{
            suggestedMin: 50,
        
        }]
    }
        }} ></Bar>
        </Paper>
            </Grid>
            <Grid item xs={1}></Grid>
            
        </Grid>
        
    )
}

export default StatistiquesPreleminaire
