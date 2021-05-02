import React, { useEffect, useState } from "react";
import { afficherVente } from "../../services/Journal";
import { getTotale } from "../../Utils/Journal";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { ButtonGroup, Button } from "@material-ui/core";
import { GrMoney } from "react-icons/gr";

const useStyles = makeStyles({
  table: {
    Width: 650,
  },
  Button: {},
});

function Recap(props) {
  const classes = useStyles();
  const [ventes, setVentes] = useState();

  useEffect(() => {
    afficherVente().then((res) => setVentes(res.data));
  }, []);

  const getTime = (date) => {
    return date.toLocaleString("en-GB", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  };

  return (
    <div>
      <center>
        <div>
          <GrMoney style={{ width: 50, height: 20 }} />
          <p
            style={{
              color: "#8bc34a",
              fontSize: 25,
              marginBottom: 0,
              display: "inline",
            }}
          >
            <text style={{ color: "black" }}>Totale :</text>{" "}
            {ventes ? getTotale(ventes).toFixed(3) : 0.0} DT
          </p>
        </div>
      </center>

      <center>
        <TableContainer
          component={Paper}
          style={{ marginTop: "1em", width: "70%" }}
        >
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold", width: "35%" }}>
                  date
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>detail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data
                ? props.data
                    .slice(0)
                    .reverse()
                    .map((item, index) => {
                      if (localStorage.getItem("openingTime"))
                        if (
                          new Date(item.date).getTime() >
                          localStorage.getItem("openingTime")
                        )
                          return (
                            <TableRow key={index}>
                              <TableCell component="th" scope="row">
                                {getTime(new Date(item.date))}
                              </TableCell>
                              <TableCell>
                                l'utilisateur {item.id_utilisateur} a effectué
                                une opération de
                                <p
                                  style={{
                                    fontWeight: "bold",
                                    display: "inline",
                                  }}
                                >
                                  {item.operation === "vente"
                                    ? " vente "
                                    : " suppression "}
                                </p>
                                sur la ticket numero:{" "}
                                <p
                                  style={{
                                    display: "inline",
                                    color: "blue",
                                    textDecoration: "underline",
                                  }}
                                  onClick={() => {
                                    props.changePage("Recu");
                                    localStorage.setItem("id", item.numero);
                                  }}
                                >
                                  {item.numero}
                                </p>
                              </TableCell>
                            </TableRow>
                          );
                    })
                : ""}
            </TableBody>
          </Table>
        </TableContainer>
      </center>
    </div>
  );
}

export default Recap;
