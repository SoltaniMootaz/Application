const router = require('express').Router();
const pool = require('../database/creerDB-postgreSQL');


router.get("/api/afficherStock/:id",(req,res) => {
    const  id=Number(req.params.id);
    pool.query('SELECT * From public."stockUtilisateur" su Inner Join public.stock s on su.id_produit=s.id where su.id_utilisateur=$1 ',[id],(err,result) => {
        if(err)
            res.status(400).send(err.toString());
        else
            res.status(200).json(result.rows);
    })
})

module.exports = router;