import React, { useState } from "react";
import Passwords from "./OptionsComponents/Passwords";
import Tables from "./OptionsComponents/tables";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { IconButton } from "@material-ui/core";
import { GiTable } from "react-icons/gi";

///////////////////////////////////////////////////////

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	appBar: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		backgroundColor: "#00A600",
		width: drawerWidth,
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing(3),
	},
}));

function Options() {
	const classes = useStyles();
	const [currentPage, setCurrentPage] = useState("mdp");
	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar color="info" position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton aria-label="add an alarm" component={Link} to="/Home">
						<AiFillHome
							className="icon2"
							style={{ width: "1.5em", height: "1.5em" }}
						/>
					</IconButton>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="permanent"
				classes={{
					paper: classes.drawerPaper,
				}}
				anchor="left"
			>
				<div className={classes.toolbar} />

				<List>
					{currentPage === "mdp" ? (
						<ListItem
							button
							onClick={() => {
								setCurrentPage("mdp");
							}}
							style={{ backgroundColor: "#008000" }}
						>
							<ListItemIcon>
								<RiLockPasswordFill
									style={{ color: "white", width: "1.4em", height: "1.4em" }}
								/>
							</ListItemIcon>
							<ListItemText
								primary={"Mots de passe"}
								style={{ color: "white" }}
							/>
						</ListItem>
					) : (
						<ListItem
							button
							onClick={() => {
								setCurrentPage("mdp");
							}}
						>
							<ListItemIcon>
								<RiLockPasswordFill
									style={{ color: "white", width: "1.4em", height: "1.4em" }}
								/>
							</ListItemIcon>
							<ListItemText
								primary={"Mots de passe"}
								style={{ color: "white" }}
							/>
						</ListItem>
					)}

					<br />
					{localStorage.getItem("commerce") === "menu" ? (
						currentPage === "tables" ? (
							<ListItem
								button
								onClick={() => {
									setCurrentPage("tables");
								}}
								style={{ backgroundColor: "#008000" }}
							>
								<ListItemIcon>
									<GiTable
										style={{ color: "white", width: "1.4em", height: "1.4em" }}
									/>
								</ListItemIcon>
								<ListItemText
									primary={"Modifier tables"}
									style={{ color: "white" }}
								/>
							</ListItem>
						) : (
							<ListItem
								button
								onClick={() => {
									setCurrentPage("tables");
								}}
							>
								<ListItemIcon>
									<GiTable
										style={{ color: "white", width: "1.4em", height: "1.4em" }}
									/>
								</ListItemIcon>
								<ListItemText
									primary={"Modifier tables"}
									style={{ color: "white" }}
								/>
							</ListItem>
						)
					) : (
						""
					)}
				</List>
			</Drawer>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				{currentPage === "mdp" ? (
					<>
						<Passwords />
					</>
				) : (
					""
				)}

				{currentPage === "tables" ? (
					<>
						<Tables />
					</>
				) : (
					""
				)}
			</main>
		</div>
	);
}

export default Options;
