import React, { useEffect, useState } from "react";
import {search} from '../../Utils/Kridi'

import { makeStyles } from "@material-ui/core/styles";
import {Button, TextField, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table} from '@material-ui/core';
import {GiReceiveMoney} from "react-icons/gi";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});
function InfoClient(props) {
	const classes = useStyles();
	const [data, setData] = useState();

	useEffect(()=>{
		setData(props.data)
	},[])

	const handleChange = async (e) => {
		if(e.target.value !== "") {
			setData(await search(data, e.target.value))	
		}else
			setData(props.data)
	}

	return (
		<div>
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
								Nom et prénom
							</TableCell>
							<TableCell style={{ fontWeight: "bold" }}>
								Numéro du telephone
							</TableCell>
							<TableCell style={{ fontWeight: "bold" }}>
								Montant
							</TableCell>
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
										<TableCell>{item.montant.toFixed(3) }DT</TableCell>
										<TableCell>
											<Button
												variant="contained"
												color="default"
												className={classes.button}
												startIcon={<GiReceiveMoney />}
											>
												Payer
											</Button>
										</TableCell>
									</TableRow>
								))
							: ""}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}

export default InfoClient;