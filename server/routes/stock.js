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
        if(result0.rowCount > 0) {
            pool.query('INSERT INTO public."stockUtilisateur" VALUES($1,$2,$3,$4)',[id,result0.rows[0].id,0,prix_vente],(err,result2)=>{
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
                    pool.query('INSERT INTO public."stockUtilisateur" VALUES($1,$2,$3,$4)',[id,result1.rows[0].id,0,prix_vente],(err,result2)=>{
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

router.get("/api/fournisseurs", (req, res) => {
    pool.query('SELECT * from public.fournisseur', (err, result) => {
        if(err)
            res.status(400).send(err.toString())
        else
            res.status(200).send(result.rows)
    })
})

router.post("/api/ajouterCommande/:id", (req,res)=>{
    const id_utilisateur = req.params.id;
    const { num_piece, id_fournisseur, produits } = req.body;
    
    pool.query('INSERT INTO public.commande(num_piece, id_fournisseur, id_utilisateur) VALUES($1,$2,$3) RETURNING *'
    ,[+num_piece,+id_fournisseur,+id_utilisateur],(err, result)=>{
        if(err) {
            console.log(err.toString())
            res.status(400).send(err.toString() + '1')
        }else
            produits.forEach((val, index)=>{
                if(val.produit !== "null" && val.quantite !== "null")
                    pool.query(`UPDATE public."stockUtilisateur" SET quantite = $1 WHERE id_produit = $2`,[+val.quantite,val.produit],(err, result)=>{
                        if(err) {
                            console.log(err.toString())
                            res.status(400).send(err.toString())
                        }
                    })
                
                if (index == produits.length - 1)
                    res.status(200).send("succes")
            })
    })
})

module.exports = router;