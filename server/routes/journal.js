const router = require('express').Router();
const pool = require('../database/creerDB-postgreSQL');


router.get("/api/afficherActivite/:id",(req,res) => {
    const  id=Number(req.params.id);
    pool.query('SELECT * FROM public."activite" where id_utilisateur=$1 ',[id],(err,result) => {
        if(err)
            res.status(400).send(err.toString());
        else
            res.status(200).json(result.rows);
    })
})

router.get("/api/afficherRecu/:commerce/:id",(req,res) => {
    const {commerce,id} = req.params;

    if(commerce === "stock") {
        pool.query(`SELECT public."ticket".numero, public."stock".libelle, public."stock".prix_ttc, public."methodeVente".nom as methode, 
                           public."methodeVente".montant, public."produitsTicket".quantite, public."ticket".somme
                    FROM   public."ticket", public."produitsTicket", public."stock", public."methodeVente"
                    WHERE  public."ticket".id_utilisateur=$1
                    AND    public."ticket".id = public."produitsTicket".id_ticket
                    AND    public."produitsTicket".id = public."stock".id
                    AND    public."methodeVente".id_ticket = public."ticket".id`,[id],(err,result) => {
            if(err)
                res.status(400).send(err.toString());
            else
                res.status(200).json(result.rows);
            })
    }else {
        pool.query(`SELECT public."ticket".numero, public."articleMenu".nom as libelle, public."articleMenu".prix as prix_ttc, 
                           public."methodeVente".nom as methode, public."methodeVente".montant, public."produitsTicket".quantite, public."ticket".somme
                    FROM   public."ticket", public."produitsTicket", public."articleMenu", public."methodeVente"
                    WHERE  public."ticket".id_utilisateur= $1
                    AND    public."ticket".id = public."produitsTicket".id_ticket
                    AND    public."produitsTicket".id = public."articleMenu".id
                    AND    public."methodeVente".id_ticket = public."ticket".id`,[id],(err,result) => {
            if(err)
                res.status(200).send(err.toString());
            else
                res.status(200).json(result.rows);
            })
    }
})
module.exports = router;