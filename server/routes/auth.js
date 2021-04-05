const router = require('express').Router();
const pool = require('../database/creerDB-postgreSQL');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('sessionstorage');

router.post("/api/signup", async (req,res) => {
    try {
        const { nom,prenom,tel,email,adr,mdp,commerce } = req.body;
        bcrypt.genSalt(parseInt(process.env.saltRounds), (err, salt) => {
            bcrypt.hash(mdp, salt,(err, hash) => {
                if(err) {
                    console.error(err);
                }else {
                    pool.query("SELECT * FROM utilisateur WHERE email = $1",[email],(err,result) => {
                        if(err){
                            res.status(400).send("error dans l'execution de la requete select");
                        }else if(result.rowCount > 0) {
                            res.status(400).send("utilisateur existe déja");
                        }else {
                            pool.query("INSERT INTO utilisateur(nom,prenom,telephone,email,adresse,mdp,commerce) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *", [nom,prenom,tel,email,adr,hash,commerce],(err,result) => {
                                if(err) {
                                    res.status(400).send("error dans l'execution de la requete insert");
                                }else {
                                    res.status(201).send('success');
                                }
                            });
                        }
                    });
                }
            });
        });
    } catch (error) {
        console.error(error);
    }
});

router.post("/api/login", async (req,res) => {
    try {
        const { email,mdp } = req.body;
        pool.query("SELECT id,mdp,commerce FROM utilisateur WHERE email = $1",[email],(err,result) => {
            if(err) {
                console.error('Error executing query', err.stack);
            }else {
                if(result.rowCount > 0) {
                    bcrypt.compare(mdp, result.rows[0].mdp, async function(err, result1) {
                        if(err || !result1) {
                            res.status(400).send("Mot de passe incorrecte");
                        }else {
                            //create and assign a token 
                            const token = await jwt.sign({id: result.rows[0].id}, process.env.TOKEN_SECRET);
                            res.header('auth_token', token).send(result.rows[0]);
                        }
                    });
                }else {
                    res.status(400).send("Adresse email n'existe pas");
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;