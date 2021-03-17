import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {AiOutlineDelete} from 'react-icons/ai';
import { colors } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const useStyles = makeStyles({
    root: {
      width: '11em',
      height:'10em',
      
      color:'white',
    },
    icon: {
    
     width:'4em',
     height:'4em'
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    }
  });
  

function HomeButtons(props) {
    const classes = useStyles();
    function styling(){
     return{
         backgroundColor:props.Bcolor,
     };
 }
  return (
    <>
  
    <Button size="large" startIcon={props.icon}  className={classes.root} variant="contained" component={Link} to={props.link} style={styling()}>
          {props.buttonName}
     </Button>
 
    </>
  );
}

export default HomeButtons