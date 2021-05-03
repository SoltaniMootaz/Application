import React, { useState, useEffect } from "react";
import Ingredient from "./ingredients";
import * as MenuServices from "../../services/Menu";
import * as MenuUtils from "../../Utils/Menu"
import { ajouterActivite } from "../../services/Activite";

///////////////////////////////////////////////////////////////////////

import { withStyles, makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useSelector } from "react-redux";

////////////////////////////////////////////////////////////////////////////
const theme = createMuiTheme({
	palette: {
		primary: {
			main:"#00A600"  ,
		},
		
	},
});
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  multilineColor: {
    color: "black",
  },
}));

const styles = (theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
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

function AjouterCat(props) {
  const loadIngredients = useSelector((state) => state.loadIngredients);

  const [length, setLength] = useState(0);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [vente, setVente] = useState(false);
  const [tracer, setTracer] = useState(false);
  const [categories, setCategories] = useState([]);
  const [Data, setData] = useState({
    nom: "",
    categorie: "",
    prix: "",
    unite: "",
  });
  const [somme, setSomme] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const classes = useStyles();

  const getCategories = () => {
    MenuServices.loadCategories()
      .then((res) => {
        setCategories(MenuUtils.addCategorie(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleIngredient = () => {
    setItems((items) => [...items, <Ingredient id={length} />]);
    setLength(length + 1);
  };

  useEffect(() => {
    setSomme(MenuUtils.calculTotale(loadIngredients.data));

    if (!loaded) {
      getCategories();
      setLoaded(true);
    }
  }, [loadIngredients]);

  function submit(e) {
    e.preventDefault();
    MenuServices.ajouterArticle(Data.nom, Data.categorie, Data.prix, Data.unite)
      .then((res) => {
        loadIngredients.data.map((element) => {
          if (element)
            MenuServices.ajouterIngredient(
              element.idIngr,
              element.quantite,
              res.data.rows[0].id
            ).catch((err) => {
              setError(err.response.data);
            });
        });

        ajouterActivite("aArticle", Data.nom).catch((err) => {
          setError(err.response.data);
        });

        if (!error) {
          props.handleClose();
          window.location.reload(false);
        }
      })
      .catch((err) => {
        setError(err.response.data);
      });
  }

  return (
    <>
      <Dialog
        fullWidth={true}
        onClose={() => {
          props.handleClose();
          setError("");
        }}
        aria-labelledby="customized-dialog-title"
        open={props.handleOpen}
      >
        <DialogTitle id="customized-dialog-title">Ajouter article</DialogTitle>
        <DialogContent dividers>
          <form noValidate autoComplete="off">
            <Grid container>
              {error ? (
                <>
                  <p style={{ color: "red", textAlign: "center" }}>{error}</p>
                </>
              ) : (
                ""
              )}

              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    id="standard-basic"
                    label="Nom"
                    required
                    onChange={(e) => setData({ ...Data, nom: e.target.value })}
                    style={{ width: "100%" }}
                    color="primary"
                    InputProps={{
                      className: classes.multilineColor,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} style={{ paddingTop: "3em" }}>
                  <InputLabel id="demo-simple-select-label">
                    Catégorie
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue=""
                    color="primary"
                    required
                    onChange={(e) =>
                      setData({ ...Data, categorie: e.target.value })
                    }
                    style={{ width: "100%" }}
                    InputProps={{
                      className: classes.multilineColor,
                    }}
                    InputProps={{
                      className: classes.multilineColor,
                    }}
                  >
                    {categories}
                  </Select>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} style={{ paddingTop: "3em" }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={vente}
                        onChange={() => setVente(!vente)}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Vente par poids"
                  />
                </Grid>
              </Grid>
              {vente ? (
                <>
                  <Grid container>
                    <Grid item xs={9}>
                      <TextField
                        id="standard-basic"
                        required
                        label="Prix"
                        onBlur={(e) =>
                          (e.target.value = parseFloat(e.target.value).toFixed(
                            3
                          ))
                        }
                        onChange={(e) =>
                          setData({
                            ...Data,
                            prix: parseFloat(e.target.value).toFixed(3),
                          })
                        }
                        style={{ width: "95%" }}
                        InputProps={{
                          className: classes.multilineColor,
                        }}
                      />
                    </Grid>

                    <Grid item xs={3}>
                      <InputLabel id="demo-simple-select-label">
                        Unité
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="unite"
                        a
                        onChange={(e) =>
                          setData({ ...Data, unite: e.target.value })
                        }
                        style={{ width: "100%" }}
                      >
                        <MenuItem value="gramme">gramme</MenuItem>
                        <MenuItem value="KG">KG</MenuItem>
                        <MenuItem value="litre">litre</MenuItem>
                      </Select>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <Grid item xs={12}>
                  <TextField
                    id="standard-basic"
                    required
                    label="Prix"
                    onBlur={(e) =>
                      (e.target.value = parseFloat(e.target.value).toFixed(3))
                    }
                    onChange={(e) =>
                      setData({
                        ...Data,
                        prix: parseFloat(e.target.value).toFixed(3),
                      })
                    }
                    style={{ width: "100%" }}
                  />
                </Grid>
              )}
              <Grid container style={{ paddingTop: "3em" }}>
                <Grid Item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={tracer}
                        onChange={() => setTracer(!tracer)}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Tracer dans l'inventaire"
                  />
                </Grid>
              </Grid>
              {tracer ? (
                <div>
                  <Grid container>
                    <p style={{ textAlign: "right", color: "red" }}>
                      Coût : {somme} DT
                    </p>
                    {items}

                    <Grid container style={{ paddingTop: "1em" }}>
                      <Grid item xs={12}>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={(e) => {
                            e.preventDefault();
                            handleIngredient();
                          }}
                        >
                          Ajouter nouveau article...
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              ) : (
                ""
              )}
              <br />
              <br />
            </Grid>
          </form>
        </DialogContent>
       
        <DialogActions style={{ justifyContent: "center" }}>
        <ThemeProvider theme={theme}>
          <Fab
            color="primary"
            aria-label="add"
            onClick={(e) => {
              submit(e);
            }}
          >
            <AddIcon style={{backgroundColor:'#00A600"'}}/>
          </Fab>
          </ThemeProvider>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AjouterCat;
