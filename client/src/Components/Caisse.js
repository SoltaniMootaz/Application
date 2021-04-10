import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { LoadTicket } from "../actions";

import Ticket from "./CaisseComponents/ticket";
import AfficheArticle from "./CaisseComponents/AfficheArticle";
import AfficheStock from "./CaisseComponents/AfficheStock";
import "./css/Article.css";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import Table from "../Components/CaisseComponents/tables";

////////////////////////////////////////////////////////////

import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, fade } from "@material-ui/core/styles";
import { InputBase } from "@material-ui/core";
import { SiAirtable } from "react-icons/si";
import BarcodeReader from "react-barcode-reader";
import SearchIcon from "@material-ui/icons/Search";

///////////////////////////////////////////////////////////////

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	root: {
		display: "flex",
	},
	drawer: {
		[theme.breakpoints.up("md")]: {
			width: drawerWidth,
			flexShrink: 0,
		},
		[theme.breakpoints.down("md")]: {
			width: 300,
			flexShrink: 0,
		},
	},
	appBar: {
		flexGrow: 1,
		[theme.breakpoints.up("md")]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
		[theme.breakpoints.down("md")]: {
			width: `calc(100% - 300px)`,
			marginLeft: 300,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		[theme.breakpoints.up("md")]: {
			width: drawerWidth,
		},
		[theme.breakpoints.down("md")]: {
			width: 300,
		},
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	search: {
		position: "relative",
		marginLeft: "85%",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},

		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(1),
			width: "auto",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
	icon: {
		width: "1.2em",
		height: "1.2em",
		color: "white",
	},
	Badge: {
		position: "relative",
	},
	title: {
		flexGrow: 1,
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "block",
		},
	},
}));

/////////////////////////////////////////////////////////////////////////

function Caisse() {
	const dispatch = useDispatch();
	const [searchValue, setSearchValue] = useState();

	const handleScan = (data) => {
		dispatch(LoadTicket(data, "barcode"));
	};

	const handleSearch = (e) => {
		setSearchValue(e.target.value);
	};

	const classes = useStyles();
	const [modal, setModal] = useState({
		isOpen: Boolean(false),
	});

	const drawer = (
		<div>
			<div style={{ width: "100% " }}>
				<h1>
					<center>Ticket</center>
				</h1>
			</div>
			<Divider />
			<Divider />
			<Ticket />
			<Divider />
		</div>
	);

	return (
		<>
			<BarcodeReader
				onError={(err) => handleScan(err)}
				onScan={(data) => handleScan(data)}
			/>
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="fixed"
					className={classes.appBar}
					color="primary"
					style={{ backgroundColor: "#00bcd4" }}
				>
					<Toolbar style={{ justifyContent: "space-between" }}>
						<div>
							<IconButton aria-label="add an alarm" component={Link} to="/Home">
								<AiFillHome
									className="icon"
									style={{ width: "1.2em", height: "1.2em" }}
								/>
							</IconButton>
						</div>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder="Search…"
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
								inputProps={{ "aria-label": "search" }}
								onChange={handleSearch}
							/>
						</div>
						{localStorage.getItem("commerce") === "menu" ? (
							<div className={classes.Badge}>
								<IconButton>
									<Badge
										color="secondary"
										overlap="circle"
										badgeContent="1"
										variant="dot"
										onClick={() => setModal({ isOpen: true })}
									>
										<SiAirtable className={classes.icon} />
									</Badge>
								</IconButton>

								<Table
									handleOpen={modal.isOpen}
									handleClose={() => setModal({ isOpen: false })}
								/>
							</div>
						) : (
							""
						)}
					</Toolbar>
				</AppBar>
				<nav className={classes.drawer} aria-label="mailbox folders">
					<Hidden implementation="css">
						<Drawer
							classes={{
								paper: classes.drawerPaper,
							}}
							variant="permanent"
							open
						>
							{drawer}
						</Drawer>
					</Hidden>
				</nav>

				<main className={classes.content}>
					<div className={classes.toolbar} />

					{localStorage.getItem("commerce") === "menu" ? (
						<AfficheArticle search={searchValue} />
					) : (
						<AfficheStock search={searchValue} />
					)}
				</main>
			</div>
		</>
	);
}

export default Caisse;
