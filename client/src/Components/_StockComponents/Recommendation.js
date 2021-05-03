import React, { useEffect, useState } from "react";
import * as Stock from "../../services/Stock";
import {sort} from "../../Utils/Stock"
import Card from "./Card"

import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import CircularProgress from '@material-ui/core/CircularProgress';

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

function Recommendation(props) {
  const [error, setError] = useState();
  const [data, setData] = useState();

  const handleClose = () => {
    props.handleClose();
  }

    useEffect(async()=>{
        var produits = await Stock.recommend();
        
        if(produits === "no result" || produits.length == 0) {
          setError("Aucune résultat")
        }else {
          produits = await sort(produits);
          setData(produits)
        }
    },[])

  return (
    <div>
      <Dialog
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.handleOpen}
        scroll="paper"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Les produits les plus vendus dans votre région.
        </DialogTitle>
        <DialogContent dividers>
            {error ? <center><h4>{error}</h4></center> : data ? data.map((value,index)=>(
                <Card data={value} key={index}></Card>
            ))           
            :  <center><CircularProgress /></center>}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Recommendation;
