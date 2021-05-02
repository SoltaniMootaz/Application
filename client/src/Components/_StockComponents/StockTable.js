import React, { useEffect, useState } from "react";
import { loadUserStock } from "../../services/Stock";
import { search, loopStock } from "../../Utils/Stock";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import StockStats from "./StockStats";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#1769aa",
    color: theme.palette.common.white,
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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    maxHeight: "30em",
  },
});

function StockTable() {
  const classes = useStyles();
  const [allData, setAllData] = useState();
  const [data, setData] = useState();
  const [data1, setData1] = useState();
  const [length, setLength] = useState(20);
  const [searching, setSearching] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);
  const [state, setState] = useState(false);
  useEffect(() => {
    loadUserStock().then(async (res) => {
      setAllData(res.data);
      const stock = await loopStock(res.data, 20);

      setData(stock);
      setData1(stock);
    });
  }, []);

  const handleChange = async (e) => {
    if (e.target.value !== "") {
      setSearching(true);
      setLength(20);

      const result = await search(allData, e.target.value);
      setData(result);

      const stock = await loopStock(result, 20);
      setData1(stock);
    } else {
      setLength(20);
      setSearching(false);

      const stock = await loopStock(allData, 20);
      setData1(stock);
    }
  };

  const fetchMoreData = async () => {
    if (searching) {
      const stock = await loopStock(data, length + 20);
      setData(stock);
      setData1(stock);

      setLength(length + 20);
    } else {
      const stock = await loopStock(allData, length + 20);
      setData(stock);
      setData1(stock);

      setLength(length + 20);
    }
  };
   
  return (
    <div>
      <Paper>
        <TextField
          id="standard-search"
          label="Rechercher"
          type="search"
          variant="outlined"
          style={{
            marginLeft: "80%",
            marginTop: "-5.5em",
            marginBottom: "1em",
          }}
          onChange={(e) => handleChange(e)}
        />

        {data1 ? (
          <InfiniteScroll
            dataLength={data1.length}
            next={fetchMoreData}
            hasMore={true}
          >
            <Table
              stickyHeader
              className={classes.table}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>#id</StyledTableCell>
                  <StyledTableCell>Libelle</StyledTableCell>
                  <StyledTableCell>Prix achat</StyledTableCell>
                  <StyledTableCell>Prix vente</StyledTableCell>
                  <StyledTableCell>Quantité</StyledTableCell>
                  <StyledTableCell>Statistique</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ width: "100%" }}>
                {data1.map((row, index) => {
                  let idP=row.id_produit;
                  if (row)
                    return (                     
                      <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row">
                          {row.id_produit}
                        </StyledTableCell>
                        <StyledTableCell>{row.libelle}</StyledTableCell>
                        <StyledTableCell>{row.prix_ttc}</StyledTableCell>
                        <StyledTableCell>{row.prix_vente}</StyledTableCell>
                        <StyledTableCell>{row.quantite}</StyledTableCell>
                        <StyledTableCell><Button value={idP}
                         onClick={()=>{
                           console.log(idP);
                           setCurrentStat(idP)
                           setState(true)}}
                        >Voir</Button></StyledTableCell>
                      </StyledTableRow>
                    );
                })}
              </TableBody>
            </Table>
          </InfiniteScroll>
        ) : (
          ""
        )}

        {data1 ? (
          data1.length === 0 ? (
            <center>
              <h4>Aucune résultat</h4>
              <br />
            </center>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </Paper>
      {state?(
      <StockStats handleOpen={state} handleClose={() => setState(false)} idP={currentStat} />
      ):""
}
          </div>
  );
}

export default StockTable;
