const router = require('express').Router();
const pool = require('../database/creerDB-postgreSQL');


router.get("/api/afficherStock/:id",(req,res) => {
    const {id}= req.params;

    pool.query('SELECT * From public."stockUtilisateur" su Inner Join public.stock s on su.id_produit=s.id where su.id_utilisateur=$1 ',[id],(err,result) => {
        if(err)
            res.status(400).send(err.toString());
        else
            res.status(200).json(result.rows);
    })
})

router.post("/api/ajouterProduit/:id", (req,res) => {
    const { libelle, codeBarre, prix_achat, prix_vente, categorie } = req.body;
    const {id} = req.params;

    pool.query('SELECT * from public."stock" WHERE "code_a_barre" = $1',[codeBarre],(err,result0) => {
        if(err)
            res.status(400).send(err.toString());
        else if(result0.rowCount > 0) {
            pool.query('INSERT INTO public."stockUtilisateur"(id_utilisateur, id_produit, prix_vente) VALUES($1,$2,$3)',[id,result0.rows[0].id,prix_vente],(err,result2)=>{
                if(err)
                    res.status(400).send(err.toString());
                else
                    res.status(200).send("Produit ajouté avec succés")
            })
        }else {
            pool.query('INSERT INTO public."stock"("code_a_barre", libelle, "prix_ttc", "gamme_code") VALUES($1,$2,$3,$4) RETURNING *',[codeBarre,libelle,prix_achat,categorie],(err,result1) => {
                if(err)
                    res.status(400).send(err.toString());
                else {
                    pool.query('INSERT INTO public."stockUtilisateur"(id_utilisateur, id_produit, prix_vente) VALUES($1,$2,$3)',[id,result1.rows[0].id,prix_vente],(err,result2)=>{
                        if(err)
                            res.status(400).send(err.toString());
                        else
                            res.status(200).send("Produit ajouté avec succés")
                    })
                }
            })
        }
    })
})

router.get("/api/allStock", (req,res) => {
    pool.query('SELECT * FROM public.stock',(err,result)=>{
        if(err)
            res.status(400).send(err.toString())
        else
            res.status(200).send(result.rows)
    })
})

router.get("/api/allMouvement/:id/:idP", (req,res) => {
  const {id}=req.params;
  const {idP}=req.params;
    pool.query('SELECT quantite,date FROM public."tableMouvement" where type=$1 and user_id=$2 and id_produit=$3',["vente",id,idP],(err,result)=>{
        if(err)
            res.status(400).send(err.toString())
        else
            res.status(200).send(result.rows)
    })
})
module.exports = router;