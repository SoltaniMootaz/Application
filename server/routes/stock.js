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
    const { libelle, codeBarre, prix_vente, categorie } = req.body;
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
            pool.query('INSERT INTO public."stock"("code_a_barre", libelle, "gamme_code") VALUES($1,$2,$4) RETURNING *',[codeBarre,libelle,categorie],(err,result1) => {
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
  const { id, idP }=req.params;

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

router.post("/api/ajouterCommande/:id", async (req,res)=>{
    const id_utilisateur = req.params.id;
    const { num_piece, produits, date } = req.body;
    var { id_fournisseur } = req.body;
    
    if(isNaN(parseInt(id_fournisseur, 10))) 
        await pool.query('INSERT INTO public.fournisseur(nom) VALUES($1) RETURNING *',[id_fournisseur],(err, result)=>{
            if(err) 
                console.log(err.toString())
            else 
                id_fournisseur = result.rows[0].id;
        })

    setTimeout(()=>{
        pool.query('INSERT INTO public.commande(num_piece, id_fournisseur, id_utilisateur) VALUES($1,$2,$3) RETURNING *'
        ,[+num_piece,+id_fournisseur,+id_utilisateur],err => {
            if(err) {
                res.status(400).send(err.toString())
                return;
            }else {
                produits.forEach((val, index)=>{
                    if(val.produit !== "null") {
                        pool.query(`INSERT INTO public."tableMouvement"(id_produit, type, quantite, prix, id_fournisseur, date, user_id)
                        VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`,[val.produit, "achat", +val.quantite, +val.prix, +id_fournisseur, date, +id_utilisateur],err => {
                            if(err) {
                                console.log(err.toString())
                                res.status(400).send(err.toString())
                                return;
                            }else 
                                pool.query(`UPDATE public."stockUtilisateur" SET quantite = $1 WHERE id_produit = $2 RETURNING *`,[+val.quantite,val.produit],err => {
                                    if(err) {
                                        console.log(err.toString())
                                        res.status(400).send(err.toString())
                                        return;
                                    }else if (index == produits.length - 1)
                                        res.status(200).send("succes")
                                })
                        })
                    }else if (index == produits.length - 1)
                        res.status(200).send("succes")
                })
            }
        })
    },1000)
})

module.exports = router;