const router = require('express').Router();
const xlsxFile = require('read-excel-file/node');
const { query } = require('../database/creerDB-postgreSQL');
const pool = require('../database/creerDB-postgreSQL');
var async = require("async");


router.get("/api/afficherClients/:id",(req,res) => {
    const  id=Number(req.params.id);
    pool.query('SELECT * FROM client where id_utilisateur=$1',[id],(err,result) => {
        if(err)
            res.status(400).send(err.toString());
        else
            res.status(200).json(result.rows);
    })
})

router.post("/api/AjouterClient",(req,res) => {
    const { nomPre, tel, id_utilisateur } = req.body;
    
    pool.query('INSERT INTO client("nomPre",telephone,id_utilisateur) VALUES($1,$2,$3) RETURNING *',[nomPre,tel,id_utilisateur],(err,result) => {
        if(err) 
            res.status(400).send(err.toString());
        else
            res.status(200).send("succes");
    })
})

module.exports = router;