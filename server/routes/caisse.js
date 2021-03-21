const router = require('express').Router();
const xlsxFile = require('read-excel-file/node');
const { query } = require('../database/creerDB-postgreSQL');
const pool = require('../database/creerDB-postgreSQL');
var async = require("async");

/* router.post("/api/excelToDB",(req,res) => {
    xlsxFile('C:/Users/houss/Desktop/projet1/application/server/produits.xlsx').then((rows) => {
        for (i in rows){
            if(i>0) {
                pool.query('INSERT INTO public.stock(id,"code_a_barre",libelle,prix_ttc,image,qte_stock,prix_vente_public,gamme_code) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',[rows[i][0],rows[i][2],rows[i][4],rows[i][32],rows[i][22],rows[i][15],rows[i][37],rows[i][8]],(err,result)=>{
                    if(err) 
                        console.error(err.toString());
                })
            }
        }
        res.status(200).send("succes");
    }).catch(err => res.send(err.toString()));
}); */

/* router.post("/api/stockToUser",(req,res)=>{
    pool.query('SELECT * FROM public.stock',(err,result) => {
        if(!err && result.rowCount > 0) {
            console.log(result.rows.id)
            result.rows.map(val=> {
                pool.query('INSERT into public."stockUtilisateur" VALUES($1,$2,$3,$4)',[28,val.id,10,10.00],(err,result1) => {
                    if(err) {
                        res.status(400).send(err.toString());
                    }
                })
            })
        }else{
            res.status(400).send(err.toString());
        }
    })
})  */

router.get("/api/stock/:id",async (req,res) => {
    const { id } = req.params;
    var stock = [{}];

    try {
        const result = await pool.query('select * from public."stockUtilisateur" WHERE "id_utilisateur" = $1',[id])
        const result1 = await pool.query('select * from public."stock"');

        result.rows.map((element,index)=> {
            for(var i=0;i<result1.rowCount;i++) {
                if(element.id_produit == result1.rows[i].id)  {
                    stock[index] = result1.rows[i];
                    break;
                }
            }
        });

        res.status(200).json(stock)
    }catch(err) {
        res.status(400).send(err.toString());
    }
});

router.post("/api/AjouterClient",(req,res) => {
    const { nomPre, tel, id_utilisateur } = req.body;
    if(nomPre.length == 0)
        res.status(400).send("le champ 'nom et prenom' est vide.")
    else
    pool.query('INSERT INTO client("nomPre",telephone,id_utilisateur) VALUES($1,$2,$3) RETURNING *',[nomPre,tel,id_utilisateur],(err,result) => {
        if(err) 
            res.status(400).send(err.toString());
        else
            res.status(200).send("succes");
    })
})

router.get("/api/afficherClients",(req,res) => {
    pool.query('SELECT * FROM client',(err,result) => {
        if(err)
            res.status(400).send(err.toString());
        else
            res.status(200).json(result.rows);
    })
})

module.exports = router;