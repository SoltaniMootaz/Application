const router = require('express').Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/mydb.db');
const verif = require('./verifToken');

router.get("/api/ajouterCateg",verif,async (req,res) => {
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


module.exports = router;