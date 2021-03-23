import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {GiTable} from 'react-icons/gi'
const UseStyles = makeStyles({
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
function tableButton(props) {
    const classes = UseStyles();

    function styling(){
     return{
         
     };
 }
    return (
        <>
              <Button size="large" startIcon={<GiTable style={{color:'white'}}/>}  className={classes.root} variant="contained"   style={styling()}>
            Table n°{props.index}
               </Button>
        </>
    )
}

export default tableButton
