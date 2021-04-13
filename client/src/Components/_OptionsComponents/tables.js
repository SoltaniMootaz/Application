import React, { useState } from "react";

import { Paper, Button, ThemeProvider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

////////////////////////////////////////////////////////

const theme = createMuiTheme({
	palette: {
		primary: {
			main: purple[500],
		},
		secondary: {
			main: green[500],
		},
	},
});

const useStyles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing.unit * 2,
	},
	root: {
		backgroundColor: "#f7f7f7",
		opacity: "0.8",

		position: "fixed",
		width: "100%",
		height: "100%",
		top: "0px",
		left: "0px",
		zIndex: "1000",
	},
	padding: {
		padding: theme.spacing.unit,
		maxWidth: "95%",
		maxHeight: "40em",
		margin: "0 auto",
		display: "flex",
		flexDirection: "column",
		marginTop: "75px",
		[theme.breakpoints.down("sm")]: {
			maxWidth: "75%",
		},
	},
}));

function Tables() {
	const classes = useStyles();

	const [nbTable, setNbTable] = useState();

	function submit(e) {
		e.preventDefault();
		localStorage.setItem("nbTables", nbTable);
		window.location.reload(false);
	}

	return (
		<>
			<div>
				<ThemeProvider theme={theme}>
					<Paper
						className={classes.padding}
						style={{ width: "75%", justifyContent: "center" }}
					>
						<Typography
							variant="h5"
							style={{ color: "#4caf50", fontWeight: "bold" }}
						>
							<center>Changer le nombre de tables :</center>
							<br />
						</Typography>
						<Grid container>
							<Grid item xs={12}>
								<TextField
									id="standard-basic"
									color="secondary"
									label="Nombre de tables"
									onChange={(e) => setNbTable(e.target.value)}
									required
									style={{ width: "100%" }}
								/>
							</Grid>
						</Grid>
						<Grid container justify="center" style={{ marginTop: "10px" }}>
							<Button
								variant="outlined"
								color="secondary"
								style={{
									textTransform: "none",
									width: "20em",
									marginTop: "2em",
								}}
								type="submit"
								onClick={(e) => submit(e)}
							>
								Valider
							</Button>
						</Grid>
					</Paper>
				</ThemeProvider>
			</div>
		</>
	);
}

export default Tables;
