import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});
function InfoClient(props) {
	const classes = useStyles();
	return (
		<div>
			<div>
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
							{props.data
								? props.data.map((item, index) => (
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
		</div>
	);
}

export default InfoClient;
