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
    
    pool.query('INSERT INTO client("nomPre",telephone,id_utilisateur) VALUES($1,$2,$3) RETURNING *',[nomPre,tel,id_utilisateur],(err,result) => {
        if(err) 
            res.status(400).send(err.toString());
        else{
            res.status(200).send((result.rows[0].id).toString());
        }
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

router.get("/api/afficherVente/:id",(req,res) => {
    let  id=Number(req.params.id);
    pool.query('SELECT * FROM mouvement m inner Join ticket t on t.id=m.id_ticket WHERE  t.id_utilisateur=$1 ', [id],(err,result) => {
        if(err)
            res.status(400).send(err.toString());
        else
            res.status(200).json(result.rows);
    })
})




router.post("/api/ticket",async (req,res) => {
    const { data, quantite, table, somme, date, operation, id_utilisateur, methodes } = req.body;

    pool.query('SELECT MAX(numero) as numero FROM public.ticket WHERE id_utilisateur = $1',[id_utilisateur],(err,res0)=>{
        if(err) {
            res.status(400).send(err.toString())
        }else{
            var num;
            
            if(res0.rows[0].numero >=0)
                num = res0.rows[0].numero + 1;
            else  
                num = 0;

            pool.query('INSERT INTO public.ticket(somme,"id_utilisateur","table","numero") VALUES($1,$2,$3,$4) RETURNING *',[parseFloat(somme),id_utilisateur,parseInt(table,10),num],(err, res1) => {
                if(err) {
                    res.status(400).send(err.toString())
                }else {
                    data.map((value,index) => {
                        pool.query('INSERT INTO public."produitsTicket" VALUES($1,$2,$3,$4) RETURNING *',[value.id,res1.rows[0].id,quantite[index],typeCommerce],(err) => {
                            if(err) {
                                res.status(400).send(err.toString())
                            }
                        })
                    })

                    pool.query('INSERT INTO public."mouvement"(operation, date, id_ticket) VALUES($1,$2,$3) RETURNING *',[operation, date, res1.rows[0].id],(err) => {
                        if(err) {
                            res.status(400).send(err.toString())
                        }
                    })

                    if(methodes)
                        methodes.map(value=>{
                            if(value[0].montant>0) {
                                if(id_client)
                                    pool.query('INSERT INTO public."methodeVente"(nom, montant, id_ticket, id_client) VALUES($1,$2,$3,$4) RETURNING *',[value[0].methode, value[0].montant, res1.rows[0].id, id_client],(err) => {
                                        if(err) {
                                            console.log(err.toString())
                                            res.status(400).send(err.toString())
                                        }
                                    })
                                else
                                    pool.query('INSERT INTO public."methodeVente"(nom, montant, id_ticket) VALUES($1,$2,$3) RETURNING *',[value[0].methode, value[0].montant, res1.rows[0].id],(err) => {
                                        if(err) {
                                            res.status(400).send(err.toString())
                                        }
                                    })
                            }
                        })

                    res.status(200).send(num.toString())
                }
            })
        }
    })
})

module.exports = router;