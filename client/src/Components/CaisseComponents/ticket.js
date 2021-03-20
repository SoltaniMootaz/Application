import React, {useState, useEffect} from 'react'
import Vente from './vente'
import {useSelector, useDispatch} from 'react-redux';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {AiOutlineAppstoreAdd} from 'react-icons/ai';
import {AiOutlineDelete} from 'react-icons/ai';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '',
    color: theme.palette.common.black,
    width:340
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
      
    },
  },
}))(TableRow);
const useStyles = makeStyles((theme) => ({
  bottomPush: {
    position: "sticky",
    bottom: 0,
    textAlign: "center",
    paddingBottom: 10,
    
},
table:{maxWidth:340},
Control :{
  
  padding: theme.spacing(5),
}, root:{
 
 position:'sticky',
 width:340,
  bottom: 0,
    textAlign: "center",
    paddingBottom: 10,
},
}));


function Ticket() {
  const classes = useStyles();

  const [val, setVal] = React.useState(0);
    const [state, setState] = useState({
        isOpen: Boolean(false),
      });

    const [data,setData] = useState();
    const [somme,setSomme] = useState(0);

    const loadTicket = useSelector((state) => state.loadTicket);

    useEffect(()=>{
        setData(
          loadTicket.data.map((value, index)=>{
            if(value.libelle) {
              return (<StyledTableRow key={index}>
                <StyledTableCell align="right">{index}</StyledTableCell>
                <StyledTableCell align="right">{value.libelle}</StyledTableCell>
                <StyledTableCell align="right">{value.prix}</StyledTableCell>
                <StyledTableCell align="right"> <input
                    type="number"
                    name="quantite"
                    value={loadTicket.quantite[index]}
                    id={value.id}
                    prix={value.prix}
                    onChange={(e) => handleQuant(e)} 
                    style={{maxWidth:40}}
                  /></StyledTableCell>
                </StyledTableRow>
              )}
          })
        );
    },[loadTicket])
     
    const display = () => {
      console.log(loadTicket)
    }

    const handleQuant = (e) => {
      
    }

    return (
        <>
<TableContainer component={Paper}>
<center><p style={{fontSize:"20px",color:"green",display:"inline"}}>Somme: {somme} DT</p></center>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
          
            <StyledTableCell align="right">Nom du produit</StyledTableCell>
            <StyledTableCell align="right">Prix</StyledTableCell>
            <StyledTableCell align="right">Quantité</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
        {data}
   </TableBody>
      </Table>
    </TableContainer>

     
    <div className={classes.bottomPush} style={{padding:'10px'}}>
    </div>
    <BottomNavigation
      value={val}
      onChange={(event, newValue) => {
        setVal(newValue);
      }}
      showLabels
      className={classes.root}
      
    >
      <BottomNavigationAction label="Vendre" style={{color:'blue'}} icon={<AiOutlineAppstoreAdd />} onClick={() => setState({ isOpen: true })} />
      <BottomNavigationAction label="Effacer" style={{color:'red'}} icon={<AiOutlineDelete />} />
      
    </BottomNavigation>
    <Vente
            handleOpen={state.isOpen}
            handleClose={() => setState({ isOpen: false })}
            somme={somme}
          />
      </>
    )
}

export default Ticket; 