const router = require('express').Router();
const sqlite3 = require('sqlite3').verbose();
const pool = require('../database/creerDB-postgreSQL');
const db = new sqlite3.Database('./database/mydb.db');
const verif = require('./verifToken');

router.post("/api/ajouterCateg", (req,res) => {
    const {categorie, id_utilisateur} = req.body;
    try {
        pool.query('INSERT INTO categorie(nom, "id_utilisateur") VALUES ($1,$2) RETURNING *',[categorie, id_utilisateur], (err) => {
            if(err)
                res.status(400).send("erreur");
            else
                res.status(201).send("succes");
        });
    }catch(err) {
        res.send(err.toString());
    }
});

router.post("/api/ajouterArticle", (req,res) => {
    try {
        const { nom, prix, unite, categorie, id_utilisateur } = req.body;

        pool.query('SELECT id from public.categorie where nom = $1 and "id_utilisateur" = $2',[categorie,id_utilisateur], (err,result) => {
            if(err)
                res.status(400).send(err.toString());
            else if (result.rowCount > 0)
                pool.query('INSERT INTO public."articleMenu"(nom,prix,unite,"id_utilisateur","id_categorie") VALUES ($1,$2,$3,$4,$5) RETURNING *',[nom,prix,unite,id_utilisateur,result.rows[0].id], (err,result) => {
                    if(err)
                        res.status(400).send(err.toString());
                    else
                        res.status(201).send(result);
                });
            else
                res.status(400).send("erreur");
        });
    } catch (error) {
        res.status(400).send("erreur");
    }
});

router.post("/api/ajouterIngredient", (req,res) => {
    try {
        const { idIngr,quantite,id_article,id_utilisateur } = req.body;

        pool.query("INSERT INTO public.ingredient(quantite,id_utilisateur,id_article,id_produit) VALUES ($1,$2,$3,$4)",[quantite,id_utilisateur,id_article,idIngr], (err) => {
            if(err)
                res.status(400).send(err.toString());
            else
                res.status(201).send("succes");
        });
    } catch (error) {
        res.status(400).send(error.toString());
    }
});


router.get("/api/afficherArticles/:id", (req,res) => {
    const id = Number(req.params.id);

    try {
        pool.query('SELECT * FROM public."articleMenu" WHERE "id_utilisateur" = $1',[id], (err, result) => {
            if(err)
                res.status(400).send(err.toString());
            else {
                res.status(200).json(result.rows);
            }
        });
    } catch (error) {
        console.error(error.toString());
    }
});

router.delete('/api/deletearticle/:id', function (req, res) {

   let  id=Number(req.params.id);
 
try{
   pool.query('DELETE FROM public."articleMenu" WHERE id=$1 RETURNING *', [id], (error, result) =>{
        if (error) {
            res.status(400).send(error.toString());
        }else {   
            res.status(200).send("deleted");
        }
      });
} catch (error){
    console.error(error);
}
});


router.get("/api/afficherCategorie/:id", (req,res) => {
    const id = Number(req.params.id);
    
    try {
        pool.query('SELECT * FROM public.categorie WHERE "id_utilisateur" = $1',[id], (err, result) => {
            if(err) {
                res.status(400).send(err.toString());
            }else {
                res.status(200).json(result.rows);
            }
        });
    } catch (error) {
        console.error(error);
    }
});


module.exports = router;