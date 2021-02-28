const router = require('express').Router();
const sqlite3 = require('sqlite3').verbose();
const pool = require('../database/creerDB-postgreSQL');
const db = new sqlite3.Database('./database/mydb.db');
const verif = require('./verifToken');

router.post("/api/ajouterCateg", (req,res) => {
    try {
        pool.query("INSERT INTO categorie(nom) VALUES ($1) RETURNING *",[req.body.categorie], (err) => {
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
        const { nom,prix,unite,categorie } = req.body;

        pool.query('INSERT INTO public."articleMenu"(nom,prix,unite,"nomCategorie") VALUES ($1,$2,$3,$4) RETURNING *',[nom,prix,unite,categorie], (err) => {
            if(err)
                res.status(400).send(err.toString());
            else
                res.status(201).send("succes");
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post("/api/ajouterIngredient", (req,res) => {
    try {
        const { nomIngr,quantite,nomArt } = req.body;

        pool.query("INSERT INTO public.ingredient(nom,quantite,nomArt) VALUES ($1,$2,$3)",[nomIngr,quantite,nomArt], (err) => {
            if(err)
                res.status(400).send(err.toString());
            else
                res.status(201).send("succes");
        });
    } catch (error) {
        res.status(400).send(error.toString());
    }
});


router.get("/api/afficherArticles&*?", (req,res) => {
    try {
        if(!req.params[0]) {
            pool.query('SELECT * FROM public."articleMenu"', (err, result) => {
                if(err)
                    res.status(400).json(err);
                else {
                    res.status(200).json(result.rows);
                }
            });

        }else {
            pool.query('SELECT $1 FROM public."articleMenu"',[req.params[0]], (err, rows) => {
                if(err)
                    res.status(400).send(err);
                else {
                    res.status(200).json(rows.rows);
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
});

router.get("/api/afficherCategorie", (req,res) => {
    try {
        pool.query('SELECT * FROM public.categorie', (err, result) => {
            if(err) {
                res.status(400).send(err);
            }else {
                res.status(200).json(result.rows);
            }
        });
    } catch (error) {
        console.error(error);
    }
});


module.exports = router;