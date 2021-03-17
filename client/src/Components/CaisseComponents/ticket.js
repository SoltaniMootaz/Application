import React, {useState, useEffect} from 'react'
import Vente from './vente'

import { makeStyles, withStyles,useTheme,fade } from '@material-ui/core/styles';
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

function Ticket(props) {
  const [val, setVal] = React.useState(0);
    const [state, setState] = useState({
        isOpen: Boolean(false),
      });

    const [data,setData] = useState([]);
    const [index,setIndex] = useState([]);
    const [somme,setSomme] = useState(0);
    const [totale,setTotale] = useState([{
      idIngr:null,
      quantite:null,
      prix:null
    }]);
    const [changed,setChanged] = useState(false);

      const calculTotale = () => {    
        var sm = 0;
        setSomme(0);
        totale.map(e=> {
          if(e.prix !== null) {
            sm += parseFloat(e.prix) * parseInt(e.quantite,10);
          }
        })

        if(!changed) {
          sm += parseFloat(props.array.prix);
        }

        return sm.toFixed(2);
      }

      const handleQuant = (e) => {
        const _id = e.target.getAttribute('id');
        const _prix = e.target.getAttribute('prix');

        setTotale(totale.filter((e1)=>((e1.idIngr !== _id)&&(e1.idIngr !== null))));
        if(e.target.value !== "") {
          setTotale(totale => [...totale,{idIngr:_id,quantite:e.target.value,prix:_prix}]);
          setChanged(true)
        }

      }

      useEffect(() => {
        if(changed) {
          setSomme(calculTotale());         
          setChanged(false);
        }

        if(typeof props.array != "undefined"&&!index.includes(props.index)) {
          if(props.array) {
            setTotale(totale => [...totale,{idIngr:props.array.id,quantite:1,prix:props.array.prix}]);
            setSomme(calculTotale());
          }

          setIndex(index =>[...index,props.index]);
          setData(data=>[...data,
            <StyledTableRow key={props.index}>
          
            <StyledTableCell align="right">{props.index}</StyledTableCell>
            <StyledTableCell align="right">{props.array.nom ? props.array.nom : props.array.libelle}</StyledTableCell>
            <StyledTableCell align="right">{props.array.prix}</StyledTableCell>
            <StyledTableCell align="right"> <input
                type="number"
                name="quantite"
                defaultValue="1"
                id={props.array.id}
                prix={props.array.prix}
                onChange={(e) => handleQuant(e)}
                style={{maxWidth:40}}
              /></StyledTableCell>
                 {/*  <tr key={props.index}>
            <td>{props.index}</td>
            <td>{props.array.nom ? props.array.nom : props.array.libelle}</td>
            <td>{props.array.prix}</td>
            <td>
              <Form.Control
                type="number"
                name="quantite"
                defaultValue="1"
                id={props.array.id}
                prix={props.array.prix}
                onChange={(e) => handleQuant(e)}
              />
            </td>
          </tr> */}
          </StyledTableRow>
      ]);
        }
      },[props.array,totale,somme])
  
      const classes = useStyles();
     

    return (
        <>
<TableContainer component={Paper}>
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
    <p style={{fontSize:"15px",color:"green",display:"inline"}}>Somme: {somme} DT</p>
      {/* <Row>
        <Col>
          <Button variant="primary" onClick={() => setState({ isOpen: true })} style={{borderRadius:"10px",width:"8em"}}>Valider</Button> 

          <Vente
            handleOpen={state.isOpen}
            handleClose={() => setState({ isOpen: false })}
            somme={somme}
          />
      </Col>
      <Col style={{top:"0.5em"}}>
        <p style={{fontSize:"15px",color:"green",display:"inline"}}>Somme: {somme} DT</p>
      </Col>
      </Row> */}
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