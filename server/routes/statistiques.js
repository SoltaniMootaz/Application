const router = require('express').Router();
const xlsxFile = require('read-excel-file/node');
const { query } = require('../database/creerDB-postgreSQL');
const pool = require('../database/creerDB-postgreSQL');
var async = require("async");
const bcrypt = require('bcrypt');

router.get('/api/Top5/:id',(req,res)=>{
    const {id}=req.params;
    pool.query(`SELECT su.libelle,count(pt.id) as cnt
                FROM public."mouvement" as m 
                Join ticket as t on t.id=m.id_ticket
                Join public."produitsTicket" as pt on t.id=pt.id_ticket 
                Join public."stock" as su on su.id=pt.id  
                where t.id_utilisateur=$1 group by su.libelle order by cnt desc`,[id],(err,result)=>{
        if(err)
            res.status(400).send(err.toString())
        else
           { 
               var arr=[];
               for(var i=0; i<5;i++){
                if(result.rows[i]==null) continue;
                     arr.push(result.rows[i])
               }
               res.status(200).send(arr)
            }
    })
})
router.get('/api/Fournisseur/:id',(req,res)=>{
    const {id}=req.params;
    pool.query(`SELECT f.nom,tm.id_fournisseur,count(tm.id_fournisseur) as cnt2
        From public."fournisseur" as f
        Join public."tableMouvement" as tm on f.id=tm.id_fournisseur
        where tm.user_id=$1 group by tm.id_fournisseur,f.nom order by cnt2 desc`,[id],(err,result)=>{
        if(err)
            res.status(400).send(err.toString())
        else
        { 
            var arr=[];
            for(var i=0; i<5;i++){
                if(result.rows[i]==null) continue;
                  
                arr.push(result.rows[i])
            }
            res.status(200).send(arr)
         }
    })
})
router.get('/api/methodeVente/:id',(req,res)=>{
    const {id}=req.params;
    pool.query(`Select mv.nom,Sum(mv.montant) as total
                from public."methodeVente" as mv
                join (select id_ticket,nom from public."methodeVente") as mv2 on mv.nom=mv2.nom
                join ticket as t on mv2.id_ticket=t.id
                where id_utilisateur=$1
                group by mv.nom` ,[id],(err,result)=>{
        if(err)
            res.status(400).send(err.toString())
        else
               res.status(200).send(result.rows)
    })
})
router.get('/api/getVenteMouvement/:id',(req,res)=>{
    const {id}=req.params;
    pool.query(`Select date, SUM(quantite) from public."tableMouvement" where type=$1 and user_id=$2 group by date`,["vente",id],(err,result)=>{
        if(err)
            res.status(400).send(err.toString())
        else
               res.status(200).send(result.rows)
    })
})
router.get('/api/getAchatMouvement/:id',(req,res)=>{
    const {id}=req.params;
    pool.query(`Select date, SUM(quantite) from public."tableMouvement" where type=$1 and user_id=$2 group by date`,["achat",id],(err,result)=>{
        if(err)
            res.status(400).send(err.toString())
        else
               res.status(200).send(result.rows)
    })
})

router.get('/api/NombreVente/:id',(req,res)=>{
    const {id}=req.params;
    pool.query(`Select count(*) from public."tableMouvement" where type=$1 and user_id=$2 `,["vente",id],(err,result)=>{
        if(err)
            res.status(400).send(err.toString())
        else
               res.status(200).send(result.rows)
    })
})
router.get('/api/NombreAchat/:id',(req,res)=>{
    const {id}=req.params;
    pool.query(`Select count(*) from public."tableMouvement" where type=$1 and user_id=$2`,["achat",id],(err,result)=>{
        if(err)
            res.status(400).send(err.toString())
        else
               res.status(200).send(result.rows)
    })
})
router.get('/api/profitVente/:id',(req,res)=>{
    const currentDate=new Date();
    var last30DaysDate = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
    const {id}=req.params;
    pool.query(`Select date,SUM(prix)from public."tableMouvement" where type=$1 and date<$2 and date>$3 and user_id=$4 Group by date`,["vente",currentDate,last30DaysDate,id],(err,result)=>{
        if(err)
            res.status(400).send(err.toString())
        else
               res.status(200).send(result.rows)
    })
})
router.get('/api/sortieAchat/:id',(req,res)=>{
    const currentDate=new Date();
    var last30DaysDate = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
    const {id}=req.params;
    pool.query(`Select date,SUM(prix) from public."tableMouvement" where type=$1 and date<=$2 and date>$3 and user_id=$4 Group by date order by date ASC`,["achat",currentDate,last30DaysDate,id],(err,result)=>{
        if(err)
            res.status(400).send(err.toString())
        else
               res.status(200).send(result.rows)
    })
})
module.exports = router;