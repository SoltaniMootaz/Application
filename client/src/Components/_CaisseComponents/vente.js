import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VenteTicket } from "../../actions";
import TicketVente from "./tickets/ticketVente";
import * as Kridi from "../../services/Kridi";
import { saveTicket } from "../../services/Caisse";
import * as caisseUtils from "../../Utils/Caisse";

import d17 from "./img/D17.png";
import mobiflouss from "./img/mobiflouss.jpg";
import sobflous from "./img/sobflous.png";
import edinar from "./img/edinar.png";

//////////////////////////////////////////////////////////
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { Divider, ButtonGroup } from "@material-ui/core";
import { IoMdCash } from "react-icons/io";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { GrCreditCard } from "react-icons/gr";
import { IoIosPaper } from "react-icons/io";

////////////////////////////////////////////////////////////////////////////

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300,
	},
	chips: {
		display: "flex",
		flexWrap: "wrap",
	},
	chip: {
		margin: 2,
	},
	noLabel: {
		marginTop: theme.spacing(3),
	},
	multilineColor: {
		color: "black",
	},
}));

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
});

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton
					aria-label="close"
					className={classes.closeButton}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
	},
}))(MuiDialogActions);

function Vente(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const loadTicket = useSelector((state) => state.loadTicket);

	const [direct, setDirect] = useState(false);
	const [kridi, setKridi] = useState(false);
	const [espece, setEspece] = useState(true);
	const [cheque, setCheque] = useState(false);

	const [style1, setStyle1] = useState(false);
	const [style2, setStyle2] = useState(false);
	const [style3, setStyle3] = useState(false);
	const [style4, setStyle4] = useState(false);

	const [client, setClient] = useState({
		nomPre: "",
		tel: "",
	});

	const [selectedClient, setSelectedClient] = useState();
	const [clientData, setClientData] = useState([]);
	const [expanded, setExpanded] = useState(false);
	const [print, setPrint] = useState(false);

	const [error, setError] = useState("");
	const [montant, setMontant] = useState(0.0);
	const [rendu, setRendu] = useState(0);
	const [totale, setTotale] = useState([
		{
			methode: "espece",
			montant: 0,
		},
		{
			methode: "cheque",
			montant: 0,
		},
		{
			methode: "kridi",
			montant: 0,
		},
		{
			methode: "d17",
			montant: 0,
		},
		{
			methode: "mobiflouss",
			montant: 0,
		},
		{
			methode: "sobflous",
			montant: 0,
		},
		{
			methode: "edinar",
			montant: 0,
		},
	]);

	const handleMontant = (montant, index) => {
		var tmp = totale;

		if (montant === "") {
			tmp[index].montant = 0;
		} else {
			tmp[index].montant = montant;
		}

		setTotale(tmp);
		calculSomme(tmp);
	};

	const calculSomme = (_total) => {
		const somme = caisseUtils.calculSomme(_total);

		if (props.somme - somme < 0) {
			setMontant(0);
			setRendu(Math.abs((props.somme - somme).toFixed(3)));
		} else {
			setMontant((props.somme - somme).toFixed(3));
			setRendu(0);
		}
	};

	useEffect(() => {
		Kridi.afficherClients().then((res) => {
			setClientData(res.data);
		});

		if (print == true) {
			setMontant(0);
			props.setSomme(0);
			close();
		} else setMontant(props.somme);

		setRendu(0);
	}, [props.somme, print]);

	const handleAccChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const handleTicket = (idClient) => {
		saveTicket(props.somme, "vente", totale, idClient, loadTicket)
			.then(() => {
				dispatch(VenteTicket(totale));
				handleClick();
			})
			.catch((err) => {
				setError(err.response.data);
			});
	};

	const close = () => {
		setStyle1(false);
		setStyle2(false);
		setStyle3(false);
		setStyle4(false);
		setCheque(false);
		setDirect(false);
		setEspece(true);
		setKridi(false);
		setRendu(0);
		setMontant(props.somme);
		setError();
		setExpanded(false);
		setTotale(caisseUtils.setTotaleToNull(totale));
		props.handleClose();
	};

	const handleClick = () => {
		if (props.somme > 0) {
			setPrint(true);
			close(true);
		} else setError("Le montant doit être supérieur à 0");
	};

	function submit(e) {
		if (props.somme > 0)
			if (montant == 0) {
				if (kridi) {
					if (expanded === "panel1") {
						e.preventDefault();
						Kridi.ajouterClient(client.nomPre, client.tel)
							.then((res) => handleTicket(res.data))
							.catch((err) => setError(err));
					} else if (expanded === "panel2") handleTicket(selectedClient);
				} else handleTicket();
			} else setError("Veuillez payer le reste du montant");
	}

	const clients = caisseUtils.getClients(clientData, setSelectedClient);

	return (
		<>
			<Dialog
				fullWidth={true}
				onClose={close}
				aria-labelledby="customized-dialog-title"
				open={props.handleOpen}
			>
				<DialogTitle id="customized-dialog-title" onClose={close}>
					<Grid container>
						<Grid item xs={6}>
							<p style={{ display: "inline", color: "#00695f" }}>
								À payer : {montant} DT
							</p>
						</Grid>
						<Grid item xs={6}>
							<p style={{ display: "inline", color: "#b51c07" }}>
								Rendu monnaie : -{rendu} DT
							</p>
						</Grid>
						{error ? (
							<p
								style={{ color: "red", fontSize: "20px", textAlign: "center" }}
							>
								{error}
							</p>
						) : (
							""
						)}
					</Grid>
				</DialogTitle>
				<DialogContent dividers>
					<Grid container>
						<Grid container spacing={0} style={{ marginLeft: "2em" }}>
							<Grid item xs={12}>
								<center>
									<ButtonGroup
										variant="contained"
										color="default"
										aria-label="contained primary button group"
									>
										{espece ? (
											<Button
												onClick={() => setEspece(!espece)}
												style={{ backgroundColor: "#00bcd4",color:'white' }}
												startIcon={<IoMdCash />}
											>
												espece
											</Button>
										) : (
											<Button
												onClick={() => setEspece(!espece)}
												startIcon={<IoMdCash />}
											>
												espece
											</Button>
										)}

										{cheque ? (
											<Button
												onClick={() => setCheque(!cheque)}
												style={{ backgroundColor: "#00bcd4",color:'white' }}
												startIcon={<FaMoneyCheckAlt />}
											>
												cheque
											</Button>
										) : (
											<Button
												onClick={() => setCheque(!cheque)}
												startIcon={<FaMoneyCheckAlt />}
											>
												cheque
											</Button>
										)}

										{direct ? (
											<Button
												onClick={() => setDirect(!direct)}
												style={{ backgroundColor: "#00bcd4",color:'white'}}
												startIcon={<GrCreditCard style={{color:'white'}}/>}
											>
												en ligne
											</Button>
										) : (
											<Button
												onClick={() => setDirect(!direct)}
												startIcon={<GrCreditCard />}
											>
												en ligne
											</Button>
										)}

										{kridi ? (
											<Button
												onClick={() => setKridi(!kridi)}
												style={{ backgroundColor: "#00bcd4",color:'white' }}
												startIcon={<IoIosPaper />}
											>
												Kridi
											</Button>
										) : (
											<Button
												onClick={() => setKridi(!kridi)}
												startIcon={<IoIosPaper />}
											>
												Kridi
											</Button>
										)}
									</ButtonGroup>
								</center>
							</Grid>
						</Grid>

						<br></br>

						<Grid item xs={12}>
							{espece ? (
								<>
									<br />
									<Typography subtitle1 align="center">
										Payement en espece:
									</Typography>
									<br />
									<center>
										<TextField
											required
											id="outlined-number"
											label="Montant"
											variant="outlined"
											type="number"
											autoFocus
											onChange={(e) => handleMontant(e.target.value, 0)}
											InputProps={{
												className: classes.multilineColor,
											}}
											InputLabelProps={{
												shrink: true,
											}}
										/>
									</center>
									<br></br>
								</>
							) : (
								""
							)}
							{cheque && espece ? <hr /> : ""}
						</Grid>

						<Grid item xs={12}>
							{cheque ? (
								<>
									<br />
									<Typography subtitle1 align="center">
										Payement avec cheque:
									</Typography>
									<br />
									<center>
										<TextField
											required
											id="outlined-number"
											label="Montant"
											type="number"
											onChange={(e) => handleMontant(e.target.value, 1)}
											InputProps={{
												className: classes.multilineColor,
											}}
											InputLabelProps={{
												shrink: true,
											}}
											style={{}}
											variant="outlined"
										/>
									</center>
									<br></br>
								</>
							) : (
								""
							)}
							{cheque && direct ? <hr /> : ""}
						</Grid>

						{direct ? (
							<>
								<br />
								<br />
								<br />
								<br />
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<Typography subtitle1 align="center">
											Payement en ligne:
										</Typography>
									</Grid>
									<Grid item xs={3}>
										{style1 ? (
											<>
												<img
													alt="img1"
													src={d17}
													width="100%"
													height="100%"
													style={{ border: "2px solid #021a40" }}
													onClick={() => setStyle1(!style1)}
												></img>
											</>
										) : (
											<img
												alt="img1"
												src={d17}
												width="100%"
												height="100%"
												onClick={() => setStyle1(!style1)}
											></img>
										)}
									</Grid>
									<Grid item xs={3}>
										{style2 ? (
											<>
												<img
													alt="img2"
													src={mobiflouss}
													width="100%"
													height="100%"
													style={{ border: "2px solid #021a40" }}
													onClick={() => setStyle2(!style2)}
												></img>
											</>
										) : (
											<img
												alt="img2"
												src={mobiflouss}
												width="100%"
												height="100%"
												onClick={() => setStyle2(!style2)}
											></img>
										)}
									</Grid>
									<Grid item xs={3}>
										{style3 ? (
											<>
												<img
													alt="img3"
													src={sobflous}
													width="100%"
													height="100%"
													style={{ border: "2px solid #021a40" }}
													onClick={() => setStyle3(!style3)}
												></img>
											</>
										) : (
											<img
												alt="img3"
												src={sobflous}
												width="100%"
												height="100%"
												onClick={() => setStyle3(!style3)}
											></img>
										)}
									</Grid>
									<Grid item xs={3}>
										{style4 ? (
											<>
												<img
													alt="img3"
													src={edinar}
													width="100%"
													height="100%"
													style={{ border: "2px solid #021a40" }}
													onClick={() => setStyle4(!style4)}
												></img>
											</>
										) : (
											<img
												alt="img3"
												src={edinar}
												width="100%"
												height="100%"
												onClick={() => setStyle4(!style4)}
											></img>
										)}
									</Grid>
								</Grid>

								<Grid item xs={12}>
									<br />
								</Grid>

								<Grid container spacing={2}>
									<Grid item xs={3}>
										{style1 ? (
											<TextField
												required
												id="outlined-number"
												label="Montant"
												type="number"
												onChange={(e) => handleMontant(e.target.value, 3)}
												InputProps={{
													className: classes.multilineColor,
												}}
												InputLabelProps={{
													shrink: true,
												}}
												variant="outlined"
											/>
										) : (
											<>
												<br />
												<br />
												<br />{" "}
											</>
										)}
									</Grid>

									<Grid item xs={3}>
										{style2 ? (
											<TextField
												required
												id="outlined-number"
												label="Montant"
												type="number"
												onChange={(e) => handleMontant(e.target.value, 4)}
												InputProps={{
													className: classes.multilineColor,
												}}
												InputLabelProps={{
													shrink: true,
												}}
												variant="outlined"
											/>
										) : (
											""
										)}
									</Grid>

									<Grid item xs={3}>
										{style3 ? (
											<TextField
												required
												id="outlined-number"
												label="Montant"
												type="number"
												onChange={(e) => handleMontant(e.target.value, 5)}
												InputProps={{
													className: classes.multilineColor,
												}}
												InputLabelProps={{
													shrink: true,
												}}
												variant="outlined"
											/>
										) : (
											""
										)}
									</Grid>

									<Grid item xs={3}>
										{style4 ? (
											<TextField
												required
												id="outlined-number"
												label="Montant"
												type="number"
												onChange={(e) => handleMontant(e.target.value, 6)}
												InputProps={{
													className: classes.multilineColor,
												}}
												InputLabelProps={{
													shrink: true,
												}}
												variant="outlined"
											/>
										) : (
											""
										)}
									</Grid>
								</Grid>
							</>
						) : (
							""
						)}

						{kridi ? (
							<>
								<div className={classes.root}>
									{direct && kridi ? <hr /> : ""}
									<Typography subtitle1 align="center">
										Payement en kridi:
									</Typography>
									<br />
									<Accordion
										expanded={expanded === "panel1"}
										onChange={handleAccChange("panel1")}
									>
										<AccordionSummary
											expandIcon={<ExpandMoreIcon />}
											aria-controls="panel1bh-content"
											id="panel1bh-header"
										>
											<Typography className={classes.heading}>
												Payement en kridi:
											</Typography>
										</AccordionSummary>
										<AccordionDetails>
											<Typography>
												<center>
													<Grid container spacing={3}>
														<Grid item xs={12}>
															<TextField
																required
																id="standard-basic"
																label="Nom et prénom"
																type="text"
																InputProps={{
																	className: classes.multilineColor,
																}}
																onChange={(e) =>
																	setClient({
																		...client,
																		nomPre: e.target.value,
																	})
																}
															/>
														</Grid>
														<Grid item xs={12}>
															<TextField
																id="standard-basic"
																label="Télèphone"
																type="text"
																InputProps={{
																	className: classes.multilineColor,
																}}
																onChange={(e) =>
																	setClient({ ...client, tel: e.target.value })
																}
															/>
														</Grid>
														<Grid item xs={12}>
															<TextField
																required
																id="standard-basic"
																label="Montant"
																type="number"
																onChange={(e) =>
																	handleMontant(e.target.value, 2)
																}
																InputProps={{
																	className: classes.multilineColor,
																}}
															/>
														</Grid>
													</Grid>
												</center>
											</Typography>
										</AccordionDetails>
									</Accordion>
									<Accordion
										expanded={expanded === "panel2"}
										style={{ width: "100%" }}
										onChange={handleAccChange("panel2")}
									>
										<AccordionSummary
											expandIcon={<ExpandMoreIcon />}
											aria-controls="panel2bh-content"
											id="panel2bh-header"
										>
											<Typography className={classes.heading}>
												Sélectionner client
											</Typography>
										</AccordionSummary>
										<AccordionDetails>
											<Grid container spacing={3}>
												<Grid item xs={6}>
													<InputLabel id="demo-simple-select-label">
														Clients
													</InputLabel>
													<Select
														labelId="demo-simple-select-label"
														id="demo-simple-select"
														required
														style={{ width: "100%" }}
														InputProps={{
															className: classes.multilineColor,
														}}
													>
														{clients}
													</Select>
												</Grid>
												<Grid item xs={6}>
													<TextField
														required
														id="standard-basic"
														label="Montant"
														type="number"
														onChange={(e) => handleMontant(e.target.value, 2)}
														InputProps={{
															className: classes.multilineColor,
														}}
													/>
												</Grid>
											</Grid>
										</AccordionDetails>
									</Accordion>
								</div>
								<Divider />
							</>
						) : (
							""
						)}
					</Grid>
				</DialogContent>
				<DialogActions style={{ justifyContent: "center", height: "5em" }}>
					<Button
						variant="contained"
						color="primary"
						style={{ backgroundColor: "#00bcd4" }}
						onClick={(e) => submit(e)}
					>
						Valider
					</Button>
				</DialogActions>
			</Dialog>
			<div style={{ display: "none" }}>
				<TicketVente print={print} setPrint={setPrint} />
			</div>
		</>
	);
}

export default Vente;
