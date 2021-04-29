import React,{useEffect, useState} from 'react';
import {loadUserStock} from "../../services/Stock"
import {search} from "../../Utils/Stock"
import InfiniteScroll from 'react-infinite-scroll-component';

import { Paper,Table,TableBody,TableCell,TableHead,TableRow } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#1769aa',
      color: theme.palette.common.white,
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
  
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
      maxHeight:'30em'
    },
  });

function StockTable() {
  const classes = useStyles();
  const [data, setData] = useState()
  const [data1, setData1] = useState()

  useEffect(() => {
    loadUserStock().then( (res) =>{
        setData(res.data)
        setData1(res.data)
    })
  }, [])

  const handleChange = async (e) => {
		if(e.target.value !== "") {
			setData1(await search(data, e.target.value))	
		}else
			setData1(data)
	}

  /* const fetchMoreData = () => {
    setTimeout(() => {
      setData1(data1.concat(Array.from({ length: 20 })));
    }, 1500);
  }; */
   
  return (
    <div>       
      <Paper style={{maxHeight:'20em',overflowY:'scroll'}}>
        <TextField 
          id="standard-search" 
          label="Rechercher" 
          type="search" 
          variant="outlined" 
          style={{marginLeft:"80%", marginTop:"-5.5em",marginBottom:"1em"}}
          onChange={(e)=>handleChange(e)}
        />
        <Table stickyHeader className={classes.table} aria-label="customized table">
        <TableHead>
              <TableRow>
                <StyledTableCell>#id</StyledTableCell>
                <StyledTableCell >Libelle</StyledTableCell>
                <StyledTableCell >Prix achat</StyledTableCell>
                <StyledTableCell >Prix vente</StyledTableCell>
                <StyledTableCell >Quantité</StyledTableCell>
              </TableRow>
        </TableHead>
        <TableBody>
          {/* {data1 ? 
          <InfiniteScroll
            dataLength={data1.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          > */}
            {data1 ? data1.map(row=>(
              <StyledTableRow >
                      <StyledTableCell component="th" scope="row">{row.id_produit}</StyledTableCell>
                      <StyledTableCell>{row.libelle}</StyledTableCell>
                      <StyledTableCell>{row.prix_ttc}</StyledTableCell>
                      <StyledTableCell>{row.prix_vente}</StyledTableCell>
                      <StyledTableCell>{row.quantite}</StyledTableCell>
              </StyledTableRow>
            )) : ""}
          {/* </InfiniteScroll>
          :""} */}
        </TableBody>
        </Table>
        </Paper>
    </div>
  )
}

export default StockTable
