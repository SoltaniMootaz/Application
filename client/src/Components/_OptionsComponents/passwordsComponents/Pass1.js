import React, { useState } from "react";
import { changePassword } from "../../../services/Options";

import {
	Paper,
	Grid,
	TextField,
	Button,
	Typography,
	ThemeProvider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

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
function Pass1() {
	const classes = useStyles();

	const [pass1, setsPass1] = useState();
	const [pass2, setsPass2] = useState();
	const [err, setErr] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (pass1 === pass2)
			if (pass1.length >= 6) {
				changePassword(pass1)
					.then(() => {
						window.location.reload(false);
					})
					.catch((err) => {
						setErr(err.response.data);
					});
			} else {
				setErr("Votre mot de passe doit être contenir 6 caractéres minimum");
			}
		else setErr("Vérifier votre mot de passe");
	};

	return (
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
						<center>Changer votre mot de passe actuelle:</center>
						<br />
					</Typography>
					<form onSubmit={handleSubmit}>
						<div className={classes.margin}>
							<Grid container spacing={8} alignItems="flex-end">
								<Grid item md={true} sm={true} xs={true}>
									<TextField
										color="secondary"
										id="p1"
										label="nouvelle mot de passe"
										type="password"
										fullWidth
										autoFocus
										required
										onChange={(e) => setsPass1(e.target.value)}
									/>
								</Grid>
							</Grid>
							<Grid container spacing={8} alignItems="flex-end">
								<Grid item md={true} sm={true} xs={true}>
									<TextField
										color="secondary"
										id="p2"
										label="confirmer votre mot de passe"
										type="password"
										fullWidth
										required
										onChange={(e) => setsPass2(e.target.value)}
									/>
								</Grid>
								<Grid xs={12}>
									<center>
										<Typography style={{ color: "red" }}>{err}</Typography>
									</center>
								</Grid>
							</Grid>
							<br></br>
							<br></br>
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
								>
									Changer mot de passe
								</Button>
							</Grid>
						</div>
					</form>
				</Paper>
			</ThemeProvider>
		</div>
	);
}

export default Pass1;
