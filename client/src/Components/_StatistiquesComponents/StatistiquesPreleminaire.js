import { Grid, Paper } from '@material-ui/core'
import React from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2'

function StatistiquesPreleminaire() {
    const labels=['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
    return (
        <Grid container spacing={4}>
            <Grid item xs={1}></Grid>
            <Grid item xs={5}>
                <Grid item xs={12}>
            <Paper elevation={3} style={{with:'90%'}}>
            <Line 
            height={300}
            width={100}
            data = {{
        labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  },{
    label: 'My second Dataset',
    data: [60, 56, 90, 96, 66, 10, 34],
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
        <Grid item xs={12} style={{paddingTop:'1em'}}>
        <Paper style={{with:'90%'}} elevation={3}>
            <Line 
            height={300}
            width={100}
            data = {{
        labels: labels,
  datasets: [{
    label: 'My second Dataset',
    data: [0, 0, 0, 0, 0, 10, 34],
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
        </Grid>
            <Grid item xs={5}>
            <Paper style={{height:'100%',with:'90%'}} elevation={3}>
            <Pie 
            height={300}
            width={100}
            data = {{
        labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    
    tension: 0.1,
    backgroundColor: [
        'rgb(75, 192, 192)',
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      borderColor:[
        'rgb(75, 192, 192)',
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)' 
      ],
      hoverOffset: 4
  }],
 
}}  options={{ 
    maintainAspectRatio: false ,
    
        }} ></Pie>
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
        labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  },{
    label: 'My second Dataset',
    data: [60, 56, 90, 96, 66, 10, 34],
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
        }} ></Bar>
        </Paper>
            </Grid>
            <Grid item xs={1}></Grid>
            
        </Grid>
        
    )
}

export default StatistiquesPreleminaire
