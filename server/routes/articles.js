const router = require('express').Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/mydb.db');
const verif = require('./verifToken');

router.post("/api/ajouterCateg",async (req,res) => {
    try {
        var stmt = await db.prepare("INSERT INTO categorie(nom) VALUES (?)");

        stmt.run(req.body.categorie, (err) => {
            if(err)
                res.status(400).send("erreur");
            else
                res.status(201).send("succes");
        });
        stmt.finalize();
    }catch(err) {
        res.send(err);
    }
});

router.post("/api/ajouterArticle", async (req,res) => {
    try {
        const { nom,prix,unite,categorie } = req.body;

        var stmt = await db.prepare("INSERT INTO 'article-menu'(nom,prix,unite,nomCategorie) VALUES (?,?,?,?)");

        stmt.run(nom,prix,unite,categorie, (err) => {
            if(err)
                res.status(400).json(err);
            else
                res.status(201).send("succes");
        });
        stmt.finalize();
    } catch (error) {
        console.error(error);
    }
});

router.post("/api/ajouterIngredient",  async (req,res) => {
    try {
        const { nomArt,nomIngr,quantite } = req.body;

        var stmt = await db.prepare("INSERT INTO 'ingredient'(nom,quantite,nomArt) VALUES (?,?,?)");

        stmt.run(nomIngr,quantite,nomArt, (err) => {
            if(err)
                res.status(400).json(err);
            else
                res.status(201).send("succes");
        });

        stmt.finalize();
    } catch (error) {
        console.error(error);
    }
});


router.get("/api/afficherArticles&*?",  async (req,res) => {
    try {
        if(!req.params[0]) {
            db.all("SELECT * FROM 'article-menu'", (err, rows) => {
                if(err)
                    res.send(err);
                else {
                    res.json(rows);
                }
            });

        }else {
            const sql = "SELECT " + req.params[0] + " FROM 'article-menu'";

            db.all(sql, (err, rows) => {
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
    try {
        db.all("SELECT * FROM 'categorie'", (err, rows) => {
            if(err)
                res.send(err);
            else {
                res.json(rows);
            }
        });
    } catch (error) {
        console.error(error);
    }
});

router.get("/api/rechercherArticle/:attr", async (req,res) => {
    try {
        const { attr } = req.params;
        const sql = "SELECT * FROM 'article-menu' where nom LIKE '%" + attr + "%' or nomCategorie LIKE '%" + attr + "%'"

        db.all(sql, (err, rows) => {
            if(err)
                res.send(err);
            else {
                res.json(rows);
            }
        });
    } catch (error) {
        console.error(error);
    }
});


module.exports = router;