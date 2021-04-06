import axios from 'axios';
import React,{useState,useEffect} from 'react'

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function Recu() {
  const [data, setData] = useState();
  var arr = [];
  const userId = localStorage.getItem("userID");
  const commerce = localStorage.getItem("commerce");
  const url = "http://localhost:3001/api/afficherRecu/"+commerce+"/"+userId;
  
  useEffect(() => {
    axios.get(url).then((res)=>setData(res.data)).catch((err)=>console.log(err))
  }, []);

  return (<>
    {data ? data.map((row) => {
      if(!arr.includes(row.numero)) {
        var lib = [];
        var methd = [];
        arr.push(row.numero)
        return(<center>
          <TableContainer component={Paper} style={{width:"40%"}}>
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
                  {data.filter(val=>val.numero === row.numero).map(row1=>{
                    if(!lib.includes(row1.libelle)) {
                      lib.push(row1.libelle)
                      return(
                        <TableRow key={row1.libelle}>
                          <TableCell style={{width:"50%"}}>{row1.libelle}</TableCell>
                          <TableCell align="right">{row1.quantite}</TableCell>
                          <TableCell align="right">{row1.prix_ttc.toFixed(3)}</TableCell>
                          <TableCell align="right">{(parseFloat(row1.prix_ttc) * parseInt(row1.quantite,10)).toFixed(3)}</TableCell>
                        </TableRow> 
                      )
                    }
                  })}
                  {data.filter(val=>val.numero === row.numero).map((row1,index)=>{
                    if(!methd.includes(row1.methode)) {
                      methd.push(row1.methode)
                      return(
                        <TableRow>
                          <TableCell colSpan={1} />
                          <TableCell colSpan={2}>{row1.methode}</TableCell>
                          <TableCell align="right">{row1.montant.toFixed(3)}</TableCell>
                        </TableRow>
                      )
                    }
                  })}
                <TableRow>
                  <TableCell colSpan={1}></TableCell>
                  <TableCell colSpan={2}>TOTALE =</TableCell>
                  <TableCell align="right">{row.somme.toFixed(3)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer> 
          <br />
        </center>)
      }
    }) : ""}
  </>)
}

export default Recu
