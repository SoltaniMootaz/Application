const router = require('express').Router();
const xlsxFile = require('read-excel-file/node');
const { query } = require('../database/creerDB-postgreSQL');
const pool = require('../database/creerDB-postgreSQL');
var async = require("async");
const bcrypt = require('bcrypt');

/* router.post("/api/excelToDB",(req,res) => {
    xlsxFile('C:/Users/houss/OneDrive/Bureau/projet1/application/server/produits.xlsx').then((rows) => {
        for(var j = 7;j<50;j++)
            for (i in rows){
                if(i>0) {
                    pool.query('INSERT INTO public.stock("code_a_barre",libelle,prix_ttc,image,qte_stock,prix_vente_public,gamme_code) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *',[rows[i][2] + j,rows[i][4] + j,rows[i][32],rows[i][22],rows[i][15],rows[i][37],rows[i][8]],(err,result)=>{
                        if(err) 
                            console.error(err.toString());
                    })
                }
            }
        res.status(200).send("succes");
    }).catch(err => res.send(err.toString()));
});

router.post("/api/stockToUser",(req,res)=>{
    pool.query('SELECT * FROM public.stock',(err,result) => {
        if(!err && result.rowCount > 0) {
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

        res.status(200).send("succes")
    })
}) */

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

router.get("/api/afficherVente/:id",(req,res) => {
    let  id=Number(req.params.id);
    pool.query('SELECT * FROM mouvement m inner Join ticket t on t.id=m.id_ticket WHERE  t.id_utilisateur=$1 ', [id],(err,result) => {
        if(err)
            res.status(400).send(err.toString());
        else
            res.status(200).json(result.rows);
    })
}) 


router.post("/api/ticket/:id",async (req,res) => {
    const { data, quantite, somme, date, operation, methodes, typeCommerce, id_client } = req.body;
    const id_utilisateur = req.params.id;
    var {table} = req.body;

    pool.query('SELECT MAX(numero) as numero FROM public.ticket WHERE id_utilisateur = $1',[id_utilisateur],(err,res0)=>{
        if(err) {
            res.status(400).send(err.toString())
        }else{
            var num;
            
            if(res0.rows[0].numero >=0)
                num = res0.rows[0].numero + 1;
            else  
                num = 0;

            if(!table) table = -1;

            pool.query('INSERT INTO public.ticket(somme,"id_utilisateur","table","numero") VALUES($1,$2,$3,$4) RETURNING *',[parseFloat(somme),id_utilisateur,parseInt(table,10),num],(err, res1) => {
                if(err) {
                    res.status(400).send(err.toString())
                }else {
                    data.map((value,index) => {
                        if(value) {
                            pool.query('INSERT INTO public."produitsTicket" VALUES($1,$2,$3,$4) RETURNING *',[value.id,res1.rows[0].id,quantite[index],typeCommerce],(err) => {
                                if(err) {
                                    res.status(400).send(err.toString())
                                }
                            })

                            if(operation === "vente")
                                pool.query(`INSERT INTO public."tableMouvement"("id_produit",type,quantite,prix,date,"user_id")
                                            VALUES($1,$2,$3,$4,$5,$6)`,[value.id,"achat",quantite[index],value.prix_ttc,date,id_utilisateur],err=>{
                                    if(err)
                                        res.status(400).send(err.toString())
                                })
                        }
                    })

                    pool.query('INSERT INTO public."mouvement"(operation, date, id_ticket) VALUES($1,$2,$3) RETURNING *',[operation, date, res1.rows[0].id],(err) => {
                        if(err) {
                            res.status(400).send(err.toString())
                        }
                    })

                    if(methodes)
                        methodes.map(value=>{
                            if(value.montant>0) {
                                if(value.methode === "kridi") {
                                    pool.query('INSERT INTO public."methodeVente"(nom, montant, id_ticket, id_client) VALUES($1,$2,$3,$4) RETURNING *',[value.methode, value.montant, res1.rows[0].id, id_client],(err) => {
                                        if(err) {
                                            console.log(err.toString())
                                            res.status(400).send(err.toString())
                                        }
                                    })

                                    pool.query(`UPDATE public."client" 
                                                SET montant = (SELECT montant FROM public."client" WHERE id = $1) + $2
                                                WHERE id = $1`, [id_client, value.montant],err=>{
                                                    if(err){
                                                        console.log(err.toString())
                                                        res.status(400).send(err.toString())
                                                    }
                                                })
                                    
                                }else
                                    pool.query('INSERT INTO public."methodeVente"(nom, montant, id_ticket) VALUES($1,$2,$3) RETURNING *',[value.methode, value.montant, res1.rows[0].id],(err) => {
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

router.post("/api/testCle/:id", (req,res) => {
    try {
        const { id } = req.params;
        const { cle } = req.body;

        pool.query("SELECT cle FROM utilisateur WHERE id = $1",[id],(err,result) => {
            if(err) {
                console.error('Error executing query', err.stack);
            }else {
                if(result.rowCount > 0) {
                    bcrypt.compare(cle, result.rows[0].cle, async function(err, result1) {
                        if(err || !result1) {
                            res.status(400).send("Votre clé est incorrecte");
                        }else {
                            res.status(200).send("Success");
                        }
                    });
                }else {
                    res.status(400).send("Utilisateur n'existe pas");
                }
            }
        });
    } catch (error) {
        res.status(400).send(error.toString())
    }
});

module.exports = router;