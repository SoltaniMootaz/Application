import React, { useState } from "react";
import { signup } from "../../services/Authentification";
import "react-phone-number-input/style.css";
import "../../App.css";

import PropTypes from "prop-types";
import {
	getCountries,
	getCountryCallingCode,
} from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en.json";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
	Paper,
	TextField,
	InputLabel,
	Grid,
	Button,
	Select,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing.unit * 2,
	},
	root: {
		backgroundColor: "#f7f7f7",
		opacity: "0.8",
		width: "100%",
		height: "100%",
		zIndex: "1000",
		position: "absolute"
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
			maxWidth: "85%",
		},
	},
}));
function SignUp() {
	const classes = useStyles();

	const [succes, setSucces] = useState();
	const [error, setError] = useState();
	const [country, setCountry] = useState();

	const [user, setUser] = useState({
		name: "",
		lastName: "",
		email: "",
		password: "",
		Country: "",
		phoneNumber: "",
		commerce: "",
	});

	const handleSubmit = (event) => {
		event.preventDefault();

		signup(
			user.email,
			user.name,
			user.lastName,
			user.Country,
			user.phoneNumber,
			user.password,
			user.commerce
		)
			.then((res) => {
				setSucces(res.data);
				setError();
			})
			.catch((err) => {
				setSucces();
				setError(err.response.data);
			});
	};

	const CountrySelect = ({ value, onChange, labels, ...rest }) => (
		<>
			<InputLabel htmlFor="commerce">Pays</InputLabel>
			<Select
				native
				inputProps={{
					name: "commerce",
					id: "commerce",
				}}
				style={{ width: "100%" }}
				{...rest}
				value={value}
				onChange={(event) => onChange(event.target.value || undefined)}
			>
				<option value="">{labels["ZZ"]}</option>
				{getCountries().map((country) => (
					<option key={country} value={country}>
						{labels[country]} +{getCountryCallingCode(country)}
					</option>
				))}
			</Select>
		</>
	);

	CountrySelect.propTypes = {
		value: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		labels: PropTypes.objectOf(PropTypes.string).isRequired,
	};

	return (
		<div className={classes.root}>
			<Paper
				className={classes.padding}
				style={{ width: "33,33%", justifyContent: "center" }}
			>
				{error ? <center>{error}</center> : ""}
				{succes ? <center>{succes}</center> : ""}
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
									id="nom"
									label="Nom"
									type="text"
									fullWidth
									autoFocus
									required
									onChange={(e) => setUser({ ...user, name: e.target.value })}
								/>
							</Grid>
						</Grid>
						<Grid container spacing={8} alignItems="flex-end">
							<Grid item md={true} sm={true} xs={true}>
								<TextField
									id="prénom"
									label="Prénom"
									type="text"
									fullWidth
									autoFocus
									required
									onChange={(e) =>
										setUser({ ...user, lastName: e.target.value })
									}
								/>
							</Grid>
						</Grid>
						<Grid container spacing={8} alignItems="flex-end">
							<Grid item md={true} sm={true} xs={true}>
								<TextField
									id="password"
									label="Mot de passe"
									type="password"
									fullWidth
									required
									onChange={(e) =>
										setUser({ ...user, password: e.target.value })
									}
								/>
							</Grid>
						</Grid>
						<Grid container spacing={8} alignItems="flex-end">
							<Grid item md={true} sm={true} xs={true}>
								<InputLabel htmlFor="commerce">Commerce</InputLabel>
								<Select
									native
									inputProps={{
										name: "commerce",
										id: "commerce",
									}}
									onChange={(e) =>
										setUser({ ...user, commerce: e.target.value })
									}
									style={{ width: "100%" }}
								>
									<option value="attar">Attar</option>
									<option value="hammas">Hammas</option>
									<option value="café">Café</option>
									<option value="restaurant">Restaurant</option>
									<option value="patisserie">Patisserie</option>
								</Select>
							</Grid>
						</Grid>
						<Grid container spacing={8} alignItems="flex-end">
							<Grid item md={true} sm={true} xs={true}>
								<CountrySelect
									required
									className="country"
									labels={en}
									value={country}
									onChange={(e) => {
										setUser({ ...user, Country: e });
										setCountry(e);
									}}
								/>
							</Grid>
						</Grid>

						<Grid container justify="center" style={{ marginTop: "20px" }}>
							<TextField
								id="numtlphone"
								label="numéro de télephone"
								type=""
								fullWidth
								required
								onChange={(e) =>
									setUser({ ...user, phoneNumber: e.target.value })
								}
								pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
							/>
						</Grid>
						<Grid container alignItems="center" justify="space-between">
							<Grid item style={{ paddingTop: ".5em" }}>
								<center>
									Vous avez déjà un compte?{" "}
									<Link to="/Log-In" style={{ color: "#0275d8" }}>
										Connexion
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
								Sign-Up
							</Button>
						</Grid>
					</div>
				</form>
			</Paper>
			<div style={{backgroundColor: "#f7f7f7",}}>
				<br />
			</div>
		</div>
	);
}

export default SignUp;
