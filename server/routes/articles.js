const router = require('express').Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/mydb.db');
const verif = require('./verifToken');

router.post("/api/ajouterCateg",verif,async (req,res) => {
    try {
        var stmt = await db.prepare("INSERT INTO categorie(nom) VALUES (?)");

        stmt.run(req.body.categorie, (err) => {
            if(err)
                res.status(400).json(err);
            else
                res.status(201).send("succes");
        });
        stmt.finalize();
    }catch(err) {
        res.send(err);
    }
});

router.post("/api/ajouterArticle", verif, async (req,res) => {
    try {
        const { nom,prix,unite,cout } = req.body;

        var stmt = await db.prepare("INSERT INTO 'article-menu'(nom,prix,unite,cout) VALUES (?,?,?,?)");

        stmt.run(nom,prix,unite,cout, (err) => {
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

router.post("/api/ajouterIngredient", verif, async (req,res) => {
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


module.exports = router;