import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';

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
			setData(await props.data.filter(val=>
				val.nomPre.toLowerCase().indexOf(e.target.value) > -1 || val.telephone.indexOf(e.target.value) > -1
			))	
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
