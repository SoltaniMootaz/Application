import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as caisseUtils from "../../Utils/Caisse";

import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

////////////////////////////////////////////////////////

const UseStyles = makeStyles({
  root: {
    width: "11em",
    height: "10em",

    color: "white",
  },
  icon: {
    width: "4em",
    height: "4em",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
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

function Table(props) {
  const classes = UseStyles();

  function styling(i) {
    if (localStorage.getItem("ticket" + i)) {
      return {
        backgroundColor: "#ffb300",
      };
    } else
      return {
        backgroundColor: "#33ab9f",
      };
  }
  const [Tables, setTables] = useState();
  const loadTicket = useSelector((state) => state.loadTicket);

  const submit = (e) => {
    props.handleClose();
    localStorage.setItem("tableIndex", e);
  };

  useEffect(() => {
    setTables(caisseUtils.getTables(submit, styling, classes));
  }, [
    localStorage.getItem("change"),
    localStorage.getItem("tableIndex"),
    loadTicket,
  ]);

  return (
    <>
      <Dialog
        fullWidth={true}
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.handleOpen}
      >
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          Tables
        </DialogTitle>
        <DialogContent dividers>
          <Grid container>{Tables}</Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Table;
