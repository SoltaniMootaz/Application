import React, { useState, useEffect } from "react";
import Vente from "./vente";
import { useSelector, useDispatch } from "react-redux";
import { LoadTicket } from "../../actions";
import Cuisine from './tickets/cuisine'
import axios from 'axios'

/////////////////////////////////////////////////////////////////
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton  from "@material-ui/core/IconButton";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { AiOutlineAppstoreAdd, AiOutlineDelete, AiOutlineFieldTime } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";
import { IoMdRemove } from "react-icons/io";
import {AiOutlineCloseCircle} from "react-icons/ai"
import Typography from '@material-ui/core/Typography';import TextField from '@material-ui/core/TextField';

/////////////////////////////////////////////////////////////////////

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "",
    color: theme.palette.common.black,
    width: 400,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    width:'100%'
  },
}))(TableRow);
const useStyles = makeStyles((theme) => ({
  bottomPush: {
    position: "sticky",
    bottom: 0,
    textAlign: "center",
    paddingBottom: 10,
  },
  table: { width:'100%' },
  Control: {
    padding: theme.spacing(5),
  },
  root: {
    position: "sticky",
    width: '99%',
    bottom: 0,
    textAlign: "center",
    paddingBottom: 10,
  },
}));

function Ticket() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const url = "http://localhost:3001/api/ticket";

  const [val, setVal] = React.useState(0);
  const [state, setState] = useState({
    isOpen: Boolean(false),
  });

  const [data, setData] = useState();
  const [somme, setSomme] = useState(0);
  const [focus, setFocus] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  //redux load data
  const loadTicket = useSelector((state) => state.loadTicket);

  const handleMessage = (event) => {
    if (event.data.action === 'receipt-loaded') {
      setIsLoading(false);
    }
  };

/*   const printIframe = (id) => {
    const iframe = document.frames
      ? document.frames[id]
      : document.getElementById(id);
    const iframeWindow = iframe.contentWindow || iframe;

    iframe.focus();
    iframeWindow.print();

    return false;
  }; */

  const Effacer = () => {
    if(localStorage.getItem('ticket' + localStorage.getItem('tableIndex'))) {
      const tmp = JSON.parse(localStorage.getItem('ticket' + localStorage.getItem('tableIndex')));
      var current = new Date();

      axios.post(url, {
        data: tmp.data,
        quantite: tmp.quantite,
        table: tmp.table,
        somme: somme,
        date: current.toLocaleString(),
        operation: "effacé",
        id_utilisateur: localStorage.getItem('userID')
      }).then(()=> {
        localStorage.removeItem('ticket' + localStorage.getItem('tableIndex'));

        if(localStorage.getItem('tableIndex') == 1 && localStorage.getItem('nbTables') > 1)
          localStorage.setItem('tableIndex',2)
        else
          localStorage.setItem('tableIndex',1)

        dispatch(LoadTicket({}, "remove_all_data"))
      })
    }else {
      dispatch(LoadTicket({}, "remove_all_data"))
    }
  }

  const pending = () => {
    if(loadTicket.data.length > 0) {
      const ticket = {data : loadTicket.data , quantite : loadTicket.quantite , table : localStorage.getItem('tableIndex')}
      localStorage.setItem('ticket' + localStorage.getItem('tableIndex') , JSON.stringify(ticket));

      if(localStorage.getItem('tableIndex') == 1 && localStorage.getItem('nbTables') > 1)
        localStorage.setItem('tableIndex',2)
      else
        localStorage.setItem('tableIndex',1)

      //printIframe('ticketCuisine')
      dispatch(LoadTicket({}, "remove_all_data"))
    }
  }
  
  const calculTotale = () => {
    var sm = 0;
    setSomme(0);

    loadTicket.data.map((e, index) => {
      if(e) {
        if (e.prix_ttc) {
          sm += parseFloat(e.prix_ttc) * parseInt(loadTicket.quantite[index], 10);
        }
      }
    });

    return sm.toFixed(3);
  };

  useEffect(()=> {
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  },[])

  useEffect(() => {
    dispatch(LoadTicket({}, "remove_all_data"))
    const ticket = JSON.parse(localStorage.getItem('ticket' + localStorage.getItem('tableIndex')))
    if(ticket && ticket.data) {
      ticket.data.map((value,index) => {
        dispatch(LoadTicket(value,"quantity change",ticket.quantite[index]));
      })
    }
  },[localStorage.getItem('tableIndex')])

  useEffect(() => {
    setSomme(calculTotale());
    setFocus("")
    setData(
      loadTicket.data
        .slice(0)
        .reverse()
        .map((value, index) => {
          if (value) {
            return (
              <>
                <TableRow key={index}  >
                  <TableCell style={{border:'0'}}  align="left" colSpan={4}>
                    <center>
                      <Typography variant="subtitle1" gutterBottom>
                        {value.libelle}
                      </Typography>
                    </center>
                    
                  </TableCell>
                  <IconButton onClick={() => dispatch(LoadTicket(value, "remove_all"))}>
                      <AiOutlineCloseCircle style={{color:"red", width:"0.9em",alignSelf:"right"}} />
                    </IconButton>
                  </TableRow>
                  <StyledTableRow key={index}>
                  <StyledTableCell align="left">
                    <Typography variant="subtitle1" gutterBottom>
                      {value.prix_ttc.toFixed(3)}
                    </Typography>
                  </StyledTableCell>

                    <StyledTableCell align="right" style={{paddingRight:0}}>
                      <IconButton onClick={() => dispatch(LoadTicket(value, "remove"))}>
                        <IoMdRemove style={{ width: "0.5em", height: "0.5em", color:"black"}} />
                      </IconButton>
                    
                      {index === focus ? 
                        <input
                          type="text"
                          name="quantite"
                          key={loadTicket.quantite.slice(0).reverse()[index]}
                          defaultValue={loadTicket.quantite.slice(0).reverse()[index]}
                          autoFocus
                          onChange={(e)=> {
                            setFocus(index);
                            if (e.target.value > 0 && e.target.value !== "") {
                              dispatch(LoadTicket(value, "quantity change", e.target.value))
                            }
                          }}
                          style={{ maxWidth: "3em",alignContent:"right" }}
                        />
                      : 
                        <input
                        type="text"
                        name="quantite"
                        key={loadTicket.quantite.slice(0).reverse()[index]}
                        defaultValue={loadTicket.quantite.slice(0).reverse()[index]}
                        onChange={(e)=> {
                          setFocus(index);
                          if (e.target.value > 0 && e.target.value !== "") {
                            dispatch(LoadTicket(value, "quantity change", e.target.value))
                          }
                        }}
                        style={{ maxWidth: "3em",alignContent:"right" }}
                      /> }
                      
                  
                      <IconButton onClick={() => dispatch(LoadTicket(value))}>
                        <GrAdd style={{ width: "0.5em", height: "0.5em", color:"black" }} />
                      </IconButton>
                    </StyledTableCell>

                    <StyledTableCell align="center" style={{paddingRight:0}}>
                      <Typography variant="subtitle1" gutterBottom>
                        {(value.prix_ttc * loadTicket.quantite.slice(0).reverse()[index]).toFixed(3)}
                      </Typography>
                    </StyledTableCell>

                  {/* <StyledTableCell align="right" style={{paddingLeft:0}}>
                    <IconButton onClick={() => dispatch(LoadTicket(value, "remove_all"))}>
                      <AiOutlineCloseCircle style={{color:"grey", width:"0.9em"}} />
                    </IconButton>
                  </StyledTableCell> */}
                </StyledTableRow>
              </>
            );
          }
        })
    );
  }, [loadTicket]);

  return (
    <>
    <center>
      <br></br>
          <p style={{ fontSize: "20px", color: "#00695f", display: "inline" }}>
            Somme: {somme} DT
          </p>
        </center>
        <center>
          <p style={{ fontSize: "15px", color: "#008394", display: "inline",  }}>
            Table: {localStorage.getItem('tableIndex')} 
          </p></center>
          <br></br>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead style={{width:'100%'}}>
            <TableRow>
              {/* <StyledTableCell align="left">Nom du produit</StyledTableCell> */}
              <StyledTableCell align="left">Prix</StyledTableCell>
              
              <StyledTableCell align="center" style={{width:"50em"}}>Quantité</StyledTableCell>
              <StyledTableCell align="right">Totale</StyledTableCell> 

            </TableRow>
          </TableHead>
          <TableBody>{data}</TableBody>
        </Table>
      </TableContainer>

  
      <BottomNavigation
        value={val}
        onChange={(event, newValue) => {
          setVal(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <iframe
          id="ticketCuisine"
          src="/cuisine"
          style={{ display: 'none' }}
          title="Receipt"
        />
        <BottomNavigationAction
            label="En attente"
            style={{ color: "#ffb300" }}
            icon={<AiOutlineFieldTime />}
            onClick={()=>pending()}
          />
        <BottomNavigationAction
          label="Payer"
          style={{ color: "#00bcd4" }}
          icon={<AiOutlineAppstoreAdd />}
          onClick={() => setState({ isOpen: true })}
        />
        <BottomNavigationAction
          label="Effacer"
          style={{ color: "red" }}
          icon={<AiOutlineDelete />}
          onClick={Effacer}
        />
      </BottomNavigation>
 
      <Vente
        handleOpen={state.isOpen}
        handleClose={() => setState({ isOpen: false })}
        somme={somme}
      />
    </>
  );
}

export default Ticket;