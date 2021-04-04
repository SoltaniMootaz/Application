const router = require('express').Router();
const xlsxFile = require('read-excel-file/node');
const { query } = require('../database/creerDB-postgreSQL');
const pool = require('../database/creerDB-postgreSQL');
var async = require("async");


router.get("/api/afficherActivite/:id",(req,res) => {
    const  id=Number(req.params.id);
    pool.query('SELECT * FROM public."activite" where id_utilisateur=$1 ',[id],(err,result) => {
        if(err)
            res.status(200).send(err.toString());
        else
            res.status(200).json(result.rows);
    })
})
router.get("/api/afficherRecu/:id",(req,res) => {
    const  id=Number(req.params.id);
    pool.query('SELECT * FROM ticket where id_utilisateur=$1 ',[id],(err,result) => {
        if(err)
            res.status(200).send(err.toString());
        else
            res.status(200).json(result.rows);
    })
})
module.exports = router;