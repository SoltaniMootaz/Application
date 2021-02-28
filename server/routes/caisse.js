const router = require('express').Router();
const xlsxFile = require('read-excel-file/node');
const pool = require('../database/creerDB-postgreSQL');

/* router.post("/api/excelToDB",(req,res) => {
    xlsxFile('C:/Users/houss/Desktop/projet1/application/server/produits.xlsx').then((rows) => {
        for (i in rows){
            if(i>0) {
                pool.query('INSERT INTO public.produits("code_a_barre",libelle,prix,image) VALUES($1,$2,$3,$4) RETURNING *',[rows[i][2],rows[i][4],rows[i][32],rows[i][22]],(err,result)=>{
                    if(err) 
                        console.error(err.toString());
                })
            }
        }
        res.status(200).send("succes");
    }).catch(err => res.send(err.toString()));
}); */

router.get("/api/stock",(req,res) => {
    pool.query("select * from stock",(err,result) => {
        if(err)
            res.status(400).send(err.toString());
        else if(result.rowCount>0)
            res.status(200).json(result.rows);
        else
            res.status(400).send("aucun produit dans votre stock");
    })
});

module.exports = router;