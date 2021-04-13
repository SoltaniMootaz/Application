import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import {AiFillHome} from "react-icons/ai";
import {  ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from "@material-ui/core/styles";
import {Link} from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
const theme = createMuiTheme({
	palette: {
		primary: {
			main:"#2196f3"  ,
		},
		
	},
});
function StockAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
        <IconButton aria-label="" component={Link} to="/Home">
              <AiFillHome
                className="icon"
                style={{ width: "1.5em", height: "1.5em" }}
              />
            </IconButton>
       
          
        </Toolbar>
      </AppBar>
      </ThemeProvider>
    </div>
  );
}
export default StockAppBar