import React, { useState, useEffect } from "react";
import { afficherRecu } from "../../services/Activite";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core";

const useStyle=makeStyles((theme)=>({
   tablePaper:{
    [theme.breakpoints.up("md")]: {
      width:'45%'
    },
    [theme.breakpoints.down("md")]: {
      width:'90%'
    }
   }
}))

function Recu() {
  const [data, setData] = useState();
  const [data1, setData1] = useState()
  var arr = [];

  useEffect(() => {
    afficherRecu().then((res) => {
      setData(res.data)
      setData1(res.data)
    });
  }, []);

  useEffect(()=> {
    if(localStorage.getItem("id"))
      if(document.getElementById(+localStorage.getItem("id"))) {
        document.querySelector("[id='"+ (+localStorage.getItem("id")) +"']").scrollIntoView({
          behavior: "smooth", 
          block: "end", 
          inline: "nearest"
        });

        localStorage.removeItem("id")
      }
  },[arr])

  const handleChange = async (e) => {
		if(e.target.value !== "")
			setData1(data.filter(val=>val.numero == e.target.value))
		else
			setData1(data)
	}
  const classes=useStyle();
  return (
    <>
    <center>
      <TextField 
        id="standard-search" 
        label="Rechercher ticket" 
        type="search" 
        variant="outlined" 
        onChange={(e)=>handleChange(e)}
      />
    </center>
			<br /><br />
      {data1
        ? data1.slice(0).reverse().map((row) => {
            if (!arr.includes(row.numero)) {
              var lib = [];
              var methd = [];
              arr.push(row.numero);
              return (
                <center>
                  <TableContainer id={row.numero} className={classes.tablePaper} component={Paper} >
                    <Table aria-label="spanning table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" colSpan={4}>
                            Ticket N°{row.numero}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Libelle</TableCell>
                          <TableCell align="right">Quantité</TableCell>
                          <TableCell align="right">PU</TableCell>
                          <TableCell align="right">Totale</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data
                          .filter((val) => val.numero === row.numero)
                          .map((row1, index) => {
                            if (!lib.includes(row1.libelle)) {
                              lib.push(row1.libelle);
                              return (
                                <TableRow key={index}>
                                  <TableCell style={{ width: "50%" }}>
                                    {row1.libelle}
                                  </TableCell>
                                  <TableCell align="right">
                                    {row1.quantite}
                                  </TableCell>
                                  <TableCell align="right">
                                    {row1.prix_ttc.toFixed(3)}
                                  </TableCell>
                                  <TableCell align="right">
                                    {(
                                      parseFloat(row1.prix_ttc) *
                                      parseInt(row1.quantite, 10)
                                    ).toFixed(3)}
                                  </TableCell>
                                </TableRow>
                              );
                            }
                          })}
                        {data
                          .filter((val) => val.numero === row.numero)
                          .map((row1, index) => {
                            if (!methd.includes(row1.methode)) {
                              methd.push(row1.methode);
                              return (
                                <TableRow key={index}>
                                  <TableCell colSpan={1} />
                                  <TableCell colSpan={2}>
                                    {row1.methode}
                                  </TableCell>
                                  <TableCell align="right">
                                    {row1.montant.toFixed(3)}
                                  </TableCell>
                                </TableRow>
                              );
                            }
                          })}
                        <TableRow>
                          <TableCell colSpan={1}></TableCell>
                          <TableCell colSpan={2}>TOTALE =</TableCell>
                          <TableCell align="right">
                            {row.somme.toFixed(3)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <br />
                </center>
              );
            }
          })
        : ""}
    </>
  );
}

export default Recu;
