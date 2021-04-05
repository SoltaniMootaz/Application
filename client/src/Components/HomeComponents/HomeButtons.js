import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import { Link } from "react-router-dom";
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
         width:"100%"
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
