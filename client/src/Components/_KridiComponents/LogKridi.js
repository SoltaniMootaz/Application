import React, { useState, useEffect } from "react";
import { afficherTicket } from "../../services/Caisse";
import { afficherLogKridi } from "../../services/Kridi";
import {search} from '../../Utils/Kridi'

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import TextField from '@material-ui/core/TextField';

const useRowStyles = makeStyles({
	root: {
		"& > *": {
			borderBottom: "unset",
		},
	},
});

const Row = (props) => {
	const { row } = props;
	const [open, setOpen] = React.useState(false);
	const [details, setDetails] = useState();
	const classes = useRowStyles();

	useEffect(() => {
		afficherTicket(row.id_ticket).then((res) => setDetails(res.data));
	}, [props.row]);

	const getTime = (date) => {
		return (
		  date.toLocaleString('en-GB', {minimumIntegerDigits: 2, useGrouping:false})
		);
	};	

	return (
		<React.Fragment>
			<TableRow className={classes.root}>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row" align="center">
					{row.nomPre}
				</TableCell>
				<TableCell align="center" style={{ fontWeight: "bold" }}>
					Achat
				</TableCell>
				<TableCell align="center">
					{getTime(new Date(row.date))}
				</TableCell>
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
									{details
										? details.map((res1, index) => (
												<TableRow key={index}>
													<TableCell component="th" scope="row">
														{res1.libelle ? res1.libelle : res1.nom}
													</TableCell>
													<TableCell>{res1.quantite}</TableCell>
												</TableRow>
										  ))
										: ""}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
};

export default function LogKridi() {
	const [clients, setClients] = useState();
	const [data, setData] = useState()

	useEffect(() => {
		afficherLogKridi().then((res) => {
			setClients(res);
			setData(res.data);
		});
	}, []);

	const handleChange = async (e) => {
		if(e.target.value !== "")
			setData(await search(data, e.target.value))
		else
			setData(clients.data)
	}

	return (<>
		<TextField 
			id="standard-search" 
			label="Rechercher" 
			type="search" 
			variant="outlined" 
			style={{marginLeft:"80%"}}
			onChange={(e)=>handleChange(e)}
		/>
		<br /><br />

		<TableContainer component={Paper}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow>
						<TableCell />
						<TableCell align="center" style={{ fontWeight: "bold" }}>
							Nom et prenom
						</TableCell>
						<TableCell align="center" style={{ fontWeight: "bold" }}>
							Opération
						</TableCell>
						<TableCell align="center" style={{ fontWeight: "bold" }}>
							Date
						</TableCell>
						<TableCell align="center" style={{ fontWeight: "bold" }}>
							Montant
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data
						? data.map((row) => <Row key={row.name} row={row} />)
						: ""}
				</TableBody>
			</Table>
		</TableContainer>
	</>);
}
