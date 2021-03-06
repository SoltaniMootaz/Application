import React, { useEffect, useState } from "react";
import * as Stock from "../../services/Stock";
import { getGammes } from "../../Utils/Caisse";
import { loadStock } from "../../services/Caisse";
import { setSelectValues, getScannedProduit } from "../../Utils/Stock";
import BarcodeReader from "react-barcode-reader";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { Grid, TextField } from "@material-ui/core";
import CreatableSelect from "react-select/creatable";

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

function StockAddProduit(props) {
  const [libelle, setLibelle] = useState();
  const [codeBarre, setCodeBarre] = useState();
  const [prixVente, setPrixVente] = useState();
  const [categorie, setCategorie] = useState();
  const [gammes, setGammes] = useState([]);
  const [error, setError] = useState();

  const handleClick = () => {
    if(categorie)
      if (categorie.length > 0)
        Stock.ajouterProduit(
          libelle,
          codeBarre,
          prixVente,
          categorie
        )
          .then((res) => {
            window.location.reload(false)
            setError();
          })
          .catch((err) => {
            setError(err.response.data);
          });
      else setError("Veuiller choisir une catégorie");
  };

  const handleScan = async (data) => {
    const stock = await Stock.loadAllStock();
		const result = await getScannedProduit(stock.data, data);
    if(result.length > 0) {
      setLibelle(result[0].libelle)
      setCodeBarre(result[0].code_a_barre)
      setCategorie(result[0].gamme_code)
    }
	};

  const handleCategorie = (data) => {
    if (data.length > 0) setCategorie(data);
  };

  const handleClose = () => {
    props.handleClose();
    setError();
    setCategorie();
    setCodeBarre();
    setLibelle();
  }

  useEffect(async () => {
    if (gammes.length === 0) {
      const stock = await loadStock();
      const categories = await getGammes(stock.data);
      setGammes(await setSelectValues(categories));
    }
  }, []);

  return (
    <div>
      <BarcodeReader
        onError={(err) => handleScan(err)}
        onScan={(data) => handleScan(data)}
      />
      <Dialog
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.handleOpen}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Ajouter un produit
          <p style={{ color: "red" }}>{error}</p>
        </DialogTitle>
        <form>
        <DialogContent dividers>
          <Grid container fullWidth>
            <Grid item xs={12}>
              <TextField
                required
                autoFocus
                id="standard-basic"
                key={libelle}
                label="Libelle"
                style={{ width: "95%" }}
                defaultValue={libelle}
                onChange={(e) => setLibelle(e.target.value)}
              />
            </Grid>

            <Grid
              item
              style={{ marginTop: "2em", marginBottom: "-1em", width: "95%" }}
            >
              {categorie ? 
              <CreatableSelect
                required
                autoFocus
                isClearable
                value={{ value: categorie, label: categorie}}
                onChange={(e) => {
                  if (e) handleCategorie(e.value);
                }}
                onInputChange={(e) => handleCategorie(e)}
                options={gammes}
                placeholder={"Catégorie"}
              />
              :
              <CreatableSelect
                required
                autoFocus
                isClearable
                onChange={(e) => {
                  if (e) handleCategorie(e.value);
                }}
                onInputChange={(e) => handleCategorie(e)}
                options={gammes}
                placeholder={"Catégorie"}
              />
              }
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                autoFocus
                key={codeBarre}
                defaultValue={codeBarre}
                id="standard-basic"
                label="Code a barre"
                style={{ width: "95%", marginTop: "2em" }}
                onChange={(e) => setCodeBarre(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                autoFocus
                type="number"
                id="standard-basic"
                label="Prix de vente"
                style={{ width: "95%", marginTop: "2em" }}
                onChange={(e) => setPrixVente(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClick} color="primary" type="submit">
            Valider
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default StockAddProduit;
