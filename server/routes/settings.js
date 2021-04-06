const router = require('express').Router();
const pool = require('../database/creerDB-postgreSQL');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('sessionstorage');



router.post("/api/changePassword", async (req,res) => {
    try {
        const {id, mdp} = req.body;
        bcrypt.genSalt(parseInt(process.env.saltRounds), (err, salt) => {
            bcrypt.hash(mdp, salt,(err, hash) => {
                if(err) {
                    console.error(err);
                }else {
            
                            pool.query("Update utilisateur set mdp=$1 where id_utilisateur=$2", [hash,id],(err,result) => {
                                if(err) {
                                    res.status(400).send("error dans l'execution de la requete insert");
                                }else {
                                    res.status(201).send('success');
                                }
                            });
                        }
                    });
                }
          
        )
    } catch (error) {
        console.error(error);
    }
});



module.exports = router;