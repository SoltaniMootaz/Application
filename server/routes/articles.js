const router = require('express').Router();
const sqlite3 = require('sqlite3').verbose();
const pool = require('../database/creerDB-postgreSQL');
const db = new sqlite3.Database('./database/mydb.db');
const verif = require('./verifToken');

router.post("/api/ajouterCateg",async (req,res) => {
    try {
        pool.query("INSERT INTO categorie(nom) VALUES ($1)",[req.body.categorie], (err) => {
            if(err)
                res.status(400).send("erreur");
            else
                res.status(201).send("succes");
        });
    }catch(err) {
        res.send(err);
    }
});

router.post("/api/ajouterArticle", async (req,res) => {
    try {
        const { nom,prix,unite,categorie } = req.body;

        pool.query("INSERT INTO 'article-menu'(nom,prix,unite,nomCategorie) VALUES ($1,$2,$3,$4)",[nom,prix,unite,categorie], (err) => {
            if(err)
                res.status(400).json(err);
            else
                res.status(201).send("succes");
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post("/api/ajouterIngredient",  async (req,res) => {
    try {
        const { nomArt,nomIngr,quantite } = req.body;

        pool.query("INSERT INTO 'ingredient'(nom,quantite,nomArt) VALUES ($1,$2,$3)",[nomArt,nomIngr,quantite], (err) => {
            if(err)
                res.status(400).json(err);
            else
                res.status(201).send("succes");
        });
    } catch (error) {
        res.status(400).send(error);
    }
});


router.get("/api/afficherArticles&*?",  async (req,res) => {
    try {
        if(!req.params[0]) {
            pool.query("SELECT * FROM public.article-menu", (err, result) => {
                if(err)
                    res.status(400).send(err);
                else {
                    console.log(res);
                    res.status(200).json(result);
                }
            });

        }else {
            const sql = "SELECT " + req.params[0] + " FROM 'article-menu'";

            pool.query(sql, (err, rows) => {
                if(err)
                    res.send(err);
                else {
                    res.json(rows);
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
});

router.get("/api/afficherCategorie",  async (req,res) => {
    //res.send(req.body);

    try {
        pool.query("SELECT * FROM public.categorie", (err, rows) => {
            if(err) {
                res.status(200).send(err);
            }else {
                res.status(200).json(rows);
            }
        });
    } catch (error) {
        console.error(error);
    }
});


module.exports = router;