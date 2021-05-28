import React, { useEffect, useState } from "react";
import { search, getTotale } from "../../Utils/Kridi";
import Payer from './Payer'

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Grid
} from "@material-ui/core";
import { GiReceiveMoney } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
function InfoClient(props) {
  const classes = useStyles();
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [client, setClient] = useState();
  const [totale, setTotale] = useState(0);

  const handleDialog = (value) => {
    setOpen(value);
  }

  useEffect(async () => {
    setData(props.data);
    setTotale(await getTotale(props.data))
  }, [props.data]);

  const handleChange = async (e) => {
    if (e.target.value !== "") {
      setData(await search(data, e.target.value));
    } else setData(props.data);
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={4} style={{paddingTop:"1em"}}>
          <GrMoney style={{ width: 50, height: 20 }} />
          <h4 style={{display:'inline', fontSize:"1.3em"}}>Total : {totale.toFixed(3) + " DT"}</h4>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={2}>
          <TextField
            id="standard-search"
            label="Rechercher"
            type="search"
            variant="outlined"
            onChange={(e) => handleChange(e)}
          />
        </Grid>
      </Grid>
      <br />
      <br />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                style={{ fontWeight: "bold" }}
              >
                id
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                Nom
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                Télephone
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Montant</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.length > 0
              ? data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {item.id}
                    </TableCell>
                    <TableCell>{item.nomPre}</TableCell>
                    <TableCell>{item.telephone}</TableCell>
                    <TableCell>{item.montant.toFixed(3)}DT</TableCell>
                    <TableCell>
                      {item.montant === 0 ? 
                        <Button
                          variant="contained"
                          color="default"
                          disabled
                          className={classes.button}
                          startIcon={<GiReceiveMoney />}
                        >
                          Payer
                        </Button>
                      :
                        <Button
                          variant="contained"
                          color="default"
                          className={classes.button}
                          startIcon={<GiReceiveMoney />}
                          onClick={()=> {
                            setOpen(true)
                            setClient(item)
                          }}
                        >
                          Payer
                        </Button>
                      }
                    </TableCell>
                  </TableRow>
                ))
              : ""}
          </TableBody>
        </Table>
      </TableContainer>
	  <Payer handleDialog={handleDialog} open={open} client={client}></Payer>
    </div>
  );
}

export default InfoClient;
