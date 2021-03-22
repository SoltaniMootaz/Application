import React, { useState, useEffect } from "react";
import Vente from "./vente";
import { useSelector, useDispatch } from "react-redux";
import { LoadTicket } from "../../actions";

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
import { RiDeleteBin2Fill } from "react-icons/ri";

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
  },
}))(TableRow);
const useStyles = makeStyles((theme) => ({
  bottomPush: {
    position: "sticky",
    bottom: 0,
    textAlign: "center",
    paddingBottom: 10,
  },
  table: { maxWidth: 400 },
  Control: {
    padding: theme.spacing(5),
  },
  root: {
    position: "sticky",
    width: 400,
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

  //redux load data
  const loadTicket = useSelector((state) => state.loadTicket);

  const calculTotale = () => {
    var sm = 0;
    setSomme(0);

    loadTicket.data.map((e, index) => {
      if (e.prix_ttc) {
        sm += parseFloat(e.prix_ttc) * parseInt(loadTicket.quantite[index], 10);
      }
    });

    return sm.toFixed(2);
  };

  useEffect(() => {
    setSomme(calculTotale());
    setData(
      loadTicket.data
        .slice(0)
        .reverse()
        .map((value, index) => {
          if (value) {
            return (
              <>
                <StyledTableRow key={index}>
                  <StyledTableCell align="left">
                    {value.libelle}
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    {value.prix_ttc}
                  </StyledTableCell>

                    <StyledTableCell align="right" style={{maxWidth:0.1,paddingRight:0}}>
                      <IconButton onClick={() => dispatch(LoadTicket(value, "remove"))}>
                        <IoMdRemove style={{ width: "0.5em", height: "0.5em", color:"black" }} />
                      </IconButton>
                    </StyledTableCell>

                    <StyledTableCell align="right" style={{paddingRight:0,paddingLeft:0}}>
                      <input
                        type="number"
                        name="quantite"
                        value={loadTicket.quantite.slice(0).reverse()[index]}
                        style={{ maxWidth: "5em" }}
                      />
                    </StyledTableCell>

                    <StyledTableCell align="left" style={{maxWidth:0.1,paddingLeft:0}}>
                      <IconButton onClick={() => dispatch(LoadTicket(value))}>
                        <GrAdd style={{ width: "0.5em", height: "0.5em", color:"black" }} />
                      </IconButton>
                    </StyledTableCell>

                  <StyledTableCell align="right" style={{paddingLeft:-2}}>
                    <IconButton onClick={() => dispatch(LoadTicket(value, "remove_all"))}>
                      <RiDeleteBin2Fill style={{color:"black"}} />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              </>
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
              <StyledTableCell align="left">Nom du produit</StyledTableCell>
              <StyledTableCell align="right">Prix</StyledTableCell>
              <StyledTableCell style={{maxWidth:"1px"}} align="right"></StyledTableCell>
              <StyledTableCell align="center" style={{maxWidth:"1px"}}>Quantité</StyledTableCell>
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
            label="En attente"
            style={{ color: "#ffb300" }}
            icon={<AiOutlineFieldTime />}
          />
        <BottomNavigationAction
          label="Payer"
          style={{ color: "blue" }}
          icon={<AiOutlineAppstoreAdd />}
          onClick={() => setState({ isOpen: true })}
        />
        <BottomNavigationAction
          label="Effacer"
          style={{ color: "red" }}
          icon={<AiOutlineDelete />}
          onClick={()=>dispatch(LoadTicket({}, "remove_all_data"))}
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
