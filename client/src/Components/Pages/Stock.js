import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import StockAddProduit from "../_StockComponents/StockAddProduit";
import StockAppBar from "../_StockComponents/StockAppbar";
import StockTable from "../_StockComponents/StockTable";
import Recommendation from "../_StockComponents/Recommendation";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
function Stock() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  return (
    <div>
      <StockAppBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container style={{ marginBottom: "2em" }}>
          <Grid xs={3}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#4dabf5",
                color: "white",
                height: "4em",
                width: "100%",
              }}
              onClick={() => setOpen(true)}
            >
              Ajouter un nouveau produit
            </Button>
          </Grid>
          <Grid xs={1}></Grid>
          <Grid xs={3}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#4dabf5",
                color: "white",
                height: "4em",
                width: "100%",
              }}
              onClick={() => setOpen1(true)}
            >
              Recommendation
            </Button>
          </Grid>
        </Grid>
        <StockTable />
      </main>
      <StockAddProduit
        handleOpen={open}
        handleClose={() => setOpen(false)}
      ></StockAddProduit>
      <Recommendation
        handleOpen={open1}
        handleClose={() => setOpen1(false)}
      ></Recommendation>
    </div>
  );
}

export default Stock;
