import React, { useEffect, useState } from "react";
import * as Stock from "../../services/Stock";
import { setSelectValues } from "../../Utils/Stock";

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
import Autocomplete from '@material-ui/lab/Autocomplete';

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

function StockAddCommande(props) {
    const [fournisseurs, setFournisseurs] = useState([])
    const [fournisseur, setFournisseur] = useState()
    const [stock, setStock] = useState([])
    const [produits, setProduits] = useState([])
	const [piece, setPiece] = useState()
	const [prodQuant, setProdQuant] = useState([{produit: null, quantite: null}])

	const handleClose = () => {
		props.handleClose();
	};

	const submit = async () => {
		try {
			await Stock.ajoutCommande(fournisseur, piece, prodQuant);
			handleClose();
		}catch(err) {
			console.log(err)
		}
	}

	const addToProdQuant = (operation, value, index) => {
		const tmp = prodQuant;

		if(tmp[index])
			if(operation === "produit") 
				tmp[index].produit = value
			else
				tmp[index].quantite = value
		else
			do {
				tmp.push({produit: null, quantite: null})

				if(tmp[index])
					if(operation === "produit") 
						tmp[index].produit = value
					else
						tmp[index].quantite = value
			}while(!tmp[index])

		setProdQuant(tmp)
	}

    const addLine = () => {
        const length = produits.length + 1;

        setProduits(produits=> [...produits, 
            <Autocomplete
                id="combo-box-demo"
                options={stock}
				onChange={(e,value)=>addToProdQuant("produit", value.id_produit, produits.length)}
                getOptionLabel={(option) => option.libelle}
                renderInput={(params) => <TextField {...params} label={"Produit num : " + length} variant="outlined" />}
            />
        ])
    }

	useEffect(async () => {
        if(fournisseurs.length === 0 && stock.length === 0) {
            const _stock = await Stock.loadUserStock()
            setStock(_stock.data)

            setProduits(produits=> [...produits, 
                <Autocomplete
                    id="combo-box-demo"
                    required
                    options={_stock.data}
					onChange={(e,value)=>addToProdQuant("produit", value.id_produit, 0)}
                    getOptionLabel={(option) => option.libelle}
                    renderInput={(params) => <TextField {...params} label={"Produit num : " + 1} variant="outlined" />}
                />
            ])

            const four = await Stock.loadFournisseurs();
			
            if(four.data.length > 0) {
                const data = await setSelectValues(four.data)
                setFournisseurs(data)
            }
        }
	}, []);

	return (
		<div>
			<Dialog
				fullWidth={true}
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={props.handleOpen}
			>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					Ajouter une commande
				</DialogTitle>
                <form>
					<DialogContent dividers>
						<Grid container fullWidth spacing={4}>
							<Grid item xs={12} style={{zIndex:"1000"}}>
								<CreatableSelect
									required
									autoFocus
									isClearable
									onChange={e=>{ if (e) setFournisseur(e.id) }}
									onInputChange={(e) => setFournisseur(e)}
									options={fournisseurs}
									placeholder={"Fournisseur"}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									required
									type="number"
									variant="outlined"
									id="outlined-basic"
									label="Numéro du piece"
									style={{ width: "100%" }}
									onChange={e=>setPiece(e.target.value)}
								></TextField>
							</Grid>

							<Grid item xs={12}>
								<hr />
								<center>
									<Typography style={{fontSize:"1em"}}><b>Les produits :</b></Typography>
								</center>
							</Grid>
		
							{produits.map((value, index) => (
								<>
									<Grid item xs={6}>
										{value}
									</Grid>
									<Grid item xs={3}>
										<TextField
											required
											type="number"
											variant="outlined"
											onChange={(e)=>addToProdQuant("quantite", e.target.value, index)}
											label="Quantité"
											style={{ width: "100%" }}
										></TextField>
									</Grid>
									<Grid item xs={3}>
										<TextField
											required
											type="number"
											variant="outlined"
											onChange={(e)=>addToProdQuant("quantite", e.target.value, index)}
											label="Prix d'achat"
											style={{ width: "100%" }}
										></TextField>
									</Grid>
								</>
							))}

							<Grid item xs={12}>
								<center>
									<Button
										variant="outlined"
										color="primary"
										onClick={addLine}
									>
										Ajouter un nouveau produit...
									</Button>
								</center>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button autoFocus color="primary" type="submit" onClick={submit}>
							Valider
						</Button>
					</DialogActions>
                </form>
			</Dialog>
		</div>
	);
}

export default StockAddCommande;
