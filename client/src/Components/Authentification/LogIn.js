import React, { useState, useEffect } from "react";

import { login } from "../../services/Authentification";
import "../../App.css";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, TextField, Grid, Button } from "@material-ui/core";

///////////////////////////////////////////////////////////////////////////////////////////////////////
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
		maxWidth: "40%",
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
function LogIn() {
	const classes = useStyles();
	///////////////////////////////////////////////////////////////////////////////////////////////////////
	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState();

	useEffect(() => {
		localStorage.removeItem("userID");
		localStorage.removeItem("commerce");
		localStorage.setItem("tableIndex", 1);
		localStorage.setItem("caisse", true)
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		login(user.email, user.password)
			.then((res) => {
				localStorage.setItem("userID", res.data.id);
				if (res.data.commerce === "attar")
					localStorage.setItem("commerce", "stock");
				else if (res.data.commerce === "hammas")
					localStorage.setItem("commerce", "stock");
				else if (res.data.commerce === "café")
					localStorage.setItem("commerce", "menu");
				else if (res.data.commerce === "restaurant")
					localStorage.setItem("commerce", "menu");
				else if (res.data.commerce === "patisserie")
					localStorage.setItem("commerce", "menu");
				window.location.href = "home";
			})
			.catch((err) => {
				setError(err.response.data);
			});
	};

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	return (
		<div className={classes.root}>
			<Paper
				className={classes.padding}
				style={{ width: "33,33%", justifyContent: "center" }}
			>
				{error ? <center>{error}</center> : ""}
				<form onSubmit={handleSubmit}>
					<div className={classes.margin}>
						<Grid container spacing={8} alignItems="flex-end">
							<Grid item md={true} sm={true} xs={true}>
								<TextField
									id="email"
									label="E-mail"
									type="email"
									fullWidth
									autoFocus
									required
									onChange={(e) => setUser({ ...user, email: e.target.value })}
								/>
							</Grid>
						</Grid>
						<Grid container spacing={8} alignItems="flex-end">
							<Grid item md={true} sm={true} xs={true}>
								<TextField
									id="username"
									label="Password"
									type="password"
									fullWidth
									required
									onChange={(e) =>
										setUser({ ...user, password: e.target.value })
									}
								/>
							</Grid>
						</Grid>
						<Grid container alignItems="center" justify="space-between">
							<Grid item style={{ paddingTop: ".5em" }}>
								<center>
									Vous n'avez pas de compte?{" "}
									<Link to="/Sign-UP" style={{ color: "#0275d8" }}>
										Créer un compte
									</Link>
								</center>
							</Grid>
						</Grid>
						<Grid container justify="center" style={{ marginTop: "10px" }}>
							<Button
								variant="outlined"
								color="primary"
								style={{ textTransform: "none", width: "10em" }}
								type="submit"
							>
								Login
							</Button>
						</Grid>
					</div>
				</form>
			</Paper>
		</div>
	);
}

export default LogIn;
