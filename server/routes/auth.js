const router = require('express').Router();
const pool = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const verif = require('./verifToken');

router.post("/api/signup", async (req,res) => {
    try {
        const { nom,prenom,tel,email,adr,mdp } = req.body;
        bcrypt.genSalt(parseInt(process.env.saltRounds), function(err, salt) {
            bcrypt.hash(mdp, salt,(err, hash) => {
                if(err) {
                    console.error(err);
                }else {
                    pool.query("INSERT INTO utilisateur(nom,prenom,telephone,email,adresse,mdp) VALUES($1,$2,$3,$4,$5,$6) RETURNING *", [nom,prenom,tel,email,adr,hash],(err,result) => {
                        if(err) {
                            res.status(400).send('error');
                        }else {
                            res.status(201).send('success');
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
        pool.query("SELECT mdp FROM utilisateur WHERE email = $1",[email],(err,result) => {
            if(err) {
                console.error('Error executing query', err.stack);
            }else {
                if(result.rowCount > 0) {
                    bcrypt.compare(mdp, result.rows[0].mdp, function(err, result) {
                        if(err) {
                            console.error(err);
                        }else {
                            if(result) {
                                //create and assign a token 
                                const token = jwt.sign({_email: email}, process.env.TOKEN_SECRET);
                                res.header('auth_token', token).status(200).send("success");
                            }else {
                                res.status(200).send('mot de passe incorrecte');
                            }
                        }
                    });
                }else {
                    res.send("adresse email n'existe pas");
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;