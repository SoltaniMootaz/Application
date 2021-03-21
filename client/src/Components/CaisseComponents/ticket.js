import React, { useState, useEffect } from "react";
import Vente from "./vente";
import { useSelector, useDispatch } from "react-redux";
import { LoadTicket } from '../../actions'

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { AiOutlineAppstoreAdd, AiOutlineDelete } from "react-icons/ai";
import { GrAdd } from "react-icons/gr"
import { IoMdRemove } from "react-icons/io"

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "",
    color: theme.palette.common.black,
    width: 340,
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
  },
}))(TableRow);
const useStyles = makeStyles((theme) => ({
  bottomPush: {
    position: "sticky",
    bottom: 0,
    textAlign: "center",
    paddingBottom: 10,
  },
  table: { maxWidth: 340 },
  Control: {
    padding: theme.spacing(5),
  },
  root: {
    position: "sticky",
    width: 340,
    bottom: 0,
    textAlign: "center",
    paddingBottom: 10,
  },
}));

function Ticket() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [val, setVal] = React.useState(0);
  const [state, setState] = useState({
    isOpen: Boolean(false),
  });

  const [data, setData] = useState();
  const [somme, setSomme] = useState(0);

  const loadTicket = useSelector((state) => state.loadTicket);

  const calculTotale = () => {    
    var sm = 0;
    setSomme(0);

    loadTicket.data.map((e,index)=> {
      if(e.prix_ttc) {
        sm += parseFloat(e.prix_ttc) * parseInt(loadTicket.quantite[index],10);
      }
    })

    return sm.toFixed(2);
  }

  useEffect(() => {
    setSomme(calculTotale());
    setData(
      loadTicket.data.slice(0).reverse().map((value, index) => {
        if (value.libelle) {
          return (
            <StyledTableRow key={index}>
              <StyledTableCell align="right">{value.libelle}</StyledTableCell>
              <StyledTableCell align="right">{value.prix_ttc}</StyledTableCell>
              <StyledTableCell align="right">
              <IoMdRemove onClick={()=>dispatch(LoadTicket(value, "remove"))} /> &nbsp;
                <input
                  type="number"
                  name="quantite"
                  value={loadTicket.quantite.slice(0).reverse()[index]}
                  id={value.id}
                  prix={value.prix_ttc}
                  style={{ maxWidth: 30 }}
                />
                &nbsp;<GrAdd onClick={()=>dispatch(LoadTicket(value))} />
              </StyledTableCell>
            </StyledTableRow>
          );
        }
      })
    );
  }, [loadTicket]);

  return (
    <>
      <TableContainer component={Paper}>
        <center>
          <p style={{ fontSize: "20px", color: "green", display: "inline" }}>
            Somme: {somme} DT
          </p>
        </center>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">Nom du produit</StyledTableCell>
              <StyledTableCell align="right">Prix</StyledTableCell>
              <StyledTableCell align="center">Quantité</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{data}</TableBody>
        </Table>
      </TableContainer>

      <div className={classes.bottomPush} style={{ padding: "10px" }}></div>
      <BottomNavigation
        value={val}
        onChange={(event, newValue) => {
          setVal(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          label="Valider"
          style={{ color: "blue" }}
          icon={<AiOutlineAppstoreAdd />}
          onClick={() => setState({ isOpen: true })}
        />
        <BottomNavigationAction
          label="Effacer"
          style={{ color: "red" }}
          icon={<AiOutlineDelete />}
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
