import React, { useState, useEffect } from "react";
import Vente from "./vente";
import Effacer from "./effacer";
import { useSelector, useDispatch } from "react-redux";
import { LoadTicket } from "../../actions";
import Cuisine from "./tickets/cuisine";
import * as caisseUtils from "../../Utils/Caisse";

/////////////////////////////////////////////////////////////////

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import {
  AiOutlineAppstoreAdd,
  AiOutlineDelete,
  AiOutlineFieldTime,
} from "react-icons/ai";
import { GrAdd } from "react-icons/gr";
import { IoMdRemove } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Typography from "@material-ui/core/Typography";

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
    width: "100%",
  },
}))(TableRow);
const useStyles = makeStyles((theme) => ({
  bottomPush: {
    position: "sticky",
    bottom: 0,
    textAlign: "center",
    paddingBottom: 10,
  },
  table: { width: "100%" },
  Control: {
    padding: theme.spacing(5),
  },
  root: {
    position: "sticky",
    width: "99%",
    bottom: 0,
    textAlign: "center",
    paddingBottom: 10,
  },
}));

function Ticket() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const commerce = localStorage.getItem("commerce");

  const [val, setVal] = React.useState(0);
  const [state, setState] = useState(false);
  const [state1, setState1] = useState(false);

  const [data, setData] = useState();
  const [somme, setSomme] = useState(0);
  const [focus, setFocus] = useState(0);
  const [print, setPrint] = useState(false);

  //redux load data
  const loadTicket = useSelector((state) => state.loadTicket);

  const pending = () => {
    if (loadTicket.data.length > 0) {
      setPrint(true);
      const ticket = {
        data: loadTicket.data,
        quantite: loadTicket.quantite,
        table: localStorage.getItem("tableIndex"),
      };
      localStorage.setItem(
        "ticket" + localStorage.getItem("tableIndex"),
        JSON.stringify(ticket)
      );
    }
  };

  useEffect(() => {
    dispatch(LoadTicket({}, "remove_all_data"));
    const ticket = JSON.parse(
      localStorage.getItem("ticket" + localStorage.getItem("tableIndex"))
    );
    if (ticket && ticket.data) {
      ticket.data.map((value, index) => {
        dispatch(LoadTicket(value, "quantity change", ticket.quantite[index]));
      });
    }
  }, [localStorage.getItem("tableIndex")]);

  useEffect(() => {
    setSomme(0);
    setSomme(caisseUtils.calculTotale(loadTicket.data, loadTicket.quantite));
    setFocus("");
    setData(
      loadTicket.data
        .slice(0)
        .reverse()
        .map((value, index) => {
          if (value) {
            return (
              <>
                <TableRow key={index}>
                  <TableCell style={{ border: "0" }} align="left" colSpan={4}>
                    <center>
                      <Typography variant="subtitle1" gutterBottom>
                        {value.libelle}
                      </Typography>
                    </center>
                  </TableCell>
                  <IconButton
                    onClick={() => dispatch(LoadTicket(value, "remove_all"))}
                  >
                    <AiOutlineCloseCircle
                      style={{
                        color: "red",
                        width: "0.9em",
                        alignSelf: "right",
                      }}
                    />
                  </IconButton>
                </TableRow>
                <StyledTableRow key={index}>
                  <StyledTableCell align="left">
                    <Typography variant="subtitle1" gutterBottom>
                      {value.prix_ttc.toFixed(3)}
                    </Typography>
                  </StyledTableCell>

                  <StyledTableCell align="right" style={{ paddingRight: 0 }}>
                    <div style={{display:'flex'}}>
                    <IconButton
                      onClick={() => dispatch(LoadTicket(value, "remove"))}
                    >
                      <IoMdRemove
                        style={{
                          width: "0.4em",
                          height: "0.4em",
                          color: "black",
                        }}
                      />
                    </IconButton>

                    {index === focus ? (
                      <input
                        type="text"
                        name="quantite"
                        key={loadTicket.quantite.slice(0).reverse()[index]}
                        defaultValue={
                          loadTicket.quantite.slice(0).reverse()[index]
                        }
                        autoFocus
                        onChange={(e) => {
                          setFocus(index);
                          if (e.target.value > 0 && e.target.value !== "") {
                            dispatch(
                              LoadTicket(
                                value,
                                "quantity change",
                                e.target.value
                              )
                            );
                          }
                        }}
                        style={{ maxWidth: "3em", alignContent: "center" ,height:'2.4em'}}
                      />
                    ) : (
                      <input
                        type="text"
                        name="quantite"
                        key={loadTicket.quantite.slice(0).reverse()[index]}
                        defaultValue={
                          loadTicket.quantite.slice(0).reverse()[index]
                        }
                        onChange={(e) => {
                          setFocus(index);
                          if (e.target.value > 0 && e.target.value !== "") {
                            dispatch(
                              LoadTicket(
                                value,
                                "quantity change",
                                e.target.value
                              )
                            );
                          }
                        }}
                        style={{ maxWidth: "3em", alignContent: "center",height:'2.4em' }}
                      />
                    )}

                    <IconButton onClick={() => dispatch(LoadTicket(value))}>
                      <GrAdd
                        style={{
                          width: "0.4em",
                          height: "0.4em",
                          color: "black",
                        }}
                      />
                    </IconButton>
                    </div>
                  </StyledTableCell>

                  <StyledTableCell align="center" style={{ paddingRight: 0 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      {(
                        value.prix_ttc *
                        loadTicket.quantite.slice(0).reverse()[index]
                      ).toFixed(3)}
                    </Typography>
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
      <center>
        <br></br>
        <p style={{ fontSize: "20px", color: "#00695f", display: "inline" }}>
          Somme: {somme} DT
        </p>
      </center>
      <center>
        <p style={{ fontSize: "15px", color: "#008394", display: "inline" }}>
          Table: {localStorage.getItem("tableIndex")}
        </p>
      </center>
      <br></br>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead style={{ width: "100%" }}>
            <TableRow>
              <StyledTableCell align="left">Prix</StyledTableCell>
              <StyledTableCell align="center" style={{ width: "50em" }}>
                Quantité
              </StyledTableCell>
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
        {commerce === "menu" ? (
          <BottomNavigationAction
            label="En attente"
            style={{ color: "#ffb300" }}
            icon={<AiOutlineFieldTime />}
            onClick={pending}
          />
        ) : (
          ""
        )}
        <BottomNavigationAction
          label="Payer"
          style={{ color: "#00bcd4" }}
          icon={<AiOutlineAppstoreAdd />}
          onClick={() => setState(true)}
        />
        <BottomNavigationAction
          label="Effacer"
          style={{ color: "red" }}
          icon={<AiOutlineDelete />}
          onClick={() => setState1(true)}
        />
      </BottomNavigation>

      <Effacer
        handleOpen={state1}
        handleClose={() => setState1(false)}
        somme={somme}
      />

      <Vente
        handleOpen={state}
        handleClose={() => setState(false)}
        somme={somme}
        setSomme={() => setSomme()}
      />
      <div style={{ display: "none" }}>
        <Cuisine print={print} setPrint={setPrint} />
      </div>
    </>
  );
}

export default Ticket;
