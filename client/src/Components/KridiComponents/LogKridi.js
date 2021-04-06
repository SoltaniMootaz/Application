import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const Row = (props) => {
    const url = 'http://localhost:3001/api/detailsTicket/' + props.row.id;
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [details, setDetails] = useState()
    const classes = useRowStyles();

    useEffect(()=>{
        axios.get(url).then(res=>{
            setDetails(res.data)
        }).catch(err=>{
            console.error(err.toString())
        })
    },[props.row])

    
    return (
        <React.Fragment>
        <TableRow className={classes.root}>
            <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            </TableCell>
            <TableCell component="th" scope="row" align="center">
            {row.nomPre}
            </TableCell>
            <TableCell align="center" style={{fontWeight:'bold'}}>Achat</TableCell>
            <TableCell align="center">{row.date.toString()}</TableCell>
            <TableCell align="center">{row.montant.toFixed(3)}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                    Détails
                </Typography>
                <Table size="small" aria-label="purchases">
                    <TableHead>
                    <TableRow>
                        <TableCell>Libelle</TableCell>
                        <TableCell>Quantité</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {details ? details.map((res1,index) => (
                            <TableRow key={res1.id.toString() + index.toString()}>
                            <TableCell component="th" scope="row">
                                {res1.libelle ? res1.libelle : res1.nom}
                            </TableCell>
                            <TableCell>{res1.quantite}</TableCell>
                            </TableRow>
                        )) : ""}
                    </TableBody>
                </Table>
                </Box>
            </Collapse>
            </TableCell>
        </TableRow>
        </React.Fragment>
    );
}

export default function LogKridi() {
    const url = 'http://localhost:3001/api/afficherLogKridi/' + localStorage.getItem('userID');
    const[clients, setClients] = useState();

    useEffect(()=>{
        axios.get(url)
            .then(res=>setClients(res.data))
            .catch(err=>console.error(err))
    },[])

    return (
        <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
            <TableHead>
            <TableRow>
                <TableCell />
                <TableCell align="center" style={{fontWeight:'bold'}}>Nom et prenom</TableCell>
                <TableCell align="center" style={{fontWeight:'bold'}}>Opération</TableCell>
                <TableCell align="center" style={{fontWeight:'bold'}}>Date</TableCell>
                <TableCell align="center" style={{fontWeight:'bold'}}>Montant</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {clients ?clients.map((row) => (
                <Row key={row.name} row={row} />
            )) : ""}
            </TableBody>
        </Table>
        </TableContainer>
    );
}