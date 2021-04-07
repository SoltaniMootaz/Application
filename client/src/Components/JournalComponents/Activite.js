import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ButtonGroup ,Button, Divider} from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    Width: 650,
  },
  Button:{
  },
});

function Activite(props) {
  const classes = useStyles();
  const [show, setShow] = useState('vente')
  console.log(props.data);
  return (
    <div>
      <center>
        <ButtonGroup  vvariant="text" color="default"  style={{marginTop:'1.5em'}}>
          <Button onClick={()=>setShow('vente')}>Activité de vente</Button>
          <Button  onClick={()=>setShow('nrml')}>Activité normale</Button>
        </ButtonGroup>
      </center>

  <center>
    <TableContainer component={Paper} style={{marginTop:'1em',width:"70%"}}>
      <Table className={classes.table} aria-label="simple table">
       <TableHead >
         <TableRow>
           <TableCell style={{fontWeight:'bold',width:'35%'}}>
             date
           </TableCell>
           <TableCell style={{fontWeight:'bold'}}>
             detail
           </TableCell>
         </TableRow>
       </TableHead>
        <TableBody>
          
         {
         show==="vente"?
         props.data?
         props.data.slice(0).reverse().map((item,index)=>{
           return(
            <TableRow>
              <TableCell component="th" scope="row">
             {item.date}:
              </TableCell>
              <TableCell >l'utilisateur {item.id_utilisateur} a effectué un opération {item.operation==="vente"? "de vente " :"d'ecrasement "} sur la ticket numero: {item.id_ticket}</TableCell>
              
            </TableRow>
           )}):"":""}
           {  show==="nrml"?
           props.data2?
           props.data2.map((item,index)=>{
           return(
            <TableRow>
              <TableCell component="th" scope="row">
             {item.date}:
              </TableCell>
              <TableCell >l'utilisateur {item.id_utilisateur} a effectué un opération {item.operation==="aArticle"? "d'ajout d'un article" :"d'ajout d'un category "}</TableCell>
              
            </TableRow>
           )}):"":""}
        </TableBody>
      </Table>
    </TableContainer>
  </center>
        </div>
    )
}

export default Activite
