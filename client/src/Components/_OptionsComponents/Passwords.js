import { Divider, Grid, TextField, Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import axios from "axios";
import React from "react";
import Pass1 from "./passwordsComponents/Pass1";
import Pass2 from "./passwordsComponents/Pass2";

function Passwords() {
	return (
		<div>
			<Pass1 />
			<br />
			<Pass2 />
		</div>
	);
}

export default Passwords;
