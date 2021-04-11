import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { ButtonGroup, Button } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    Width: 650,
  },
  Button: {},
});

function Activite(props) {
  const classes = useStyles();
  const [show, setShow] = useState("vente");

  const getTime = (date) => {
    return (
      date.toLocaleString('en-GB', {minimumIntegerDigits: 2, useGrouping:false})
    );
  };

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])

  return (
    <div>
      <center>
        <ButtonGroup
          vvariant="text"
          color="default"
          style={{ marginTop: "1.5em" }}
        >
          {show === "vente" ? <Button onClick={() => setShow("vente")} style={{backgroundColor:"#ea7b9a"}}>Activité de vente</Button> 
          : <Button onClick={() => setShow("vente")}>Activité de vente</Button>}

          {show === "normal" ? <Button onClick={() => setShow("normal")} style={{backgroundColor:"#ea7b9a"}}>Activité normale</Button> 
          : <Button onClick={() => setShow("normal")}>Activité normale</Button>}
        </ButtonGroup>
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
              {show === "vente"
                ? props.data
                  ? props.data
                      .slice(0)
                      .reverse()
                      .map((item, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {getTime(new Date(item.date))}
                          </TableCell>
                          <TableCell>
                            l'utilisateur {item.id_utilisateur} a effectué une
                            opération
                            {item.operation === "vente"
                              ? " de vente "
                              : " de suppression "}
                            sur la ticket numero: <p style={{display:"inline",color:"blue",textDecoration:"underline"}} 
                                                     onClick={()=>{
                                                       props.changePage("Recu");
                                                       localStorage.setItem("id", item.numero)
                                                     }}
                                                  >{item.numero}</p>
                          </TableCell>
                        </TableRow>
                      ))
                  : ""
                : ""}
              {show === "normal"
                ? props.data2
                  ? props.data2
                    .slice(0)
                    .reverse().map((item, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {getTime(new Date(item.date))}
                        </TableCell>
                        <TableCell>
                          l'utilisateur {item.id_utilisateur} a effectué un
                          opération{" "}
                          {item.operation === "aArticle"
                            ? "d'ajout d'un article"
                            : "d'ajout d'une categorie"}
                        </TableCell>
                      </TableRow>
                    ))
                  : ""
                : ""}
            </TableBody>
          </Table>
        </TableContainer>
      </center>
    </div>
  );
}

export default Activite;
