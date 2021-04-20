const router = require('express').Router();
const pool = require('../database/creerDB-postgreSQL');

router.get("/api/afficherLogKridi/:id",(req,res) => {
    const id = Number(req.params.id);

    pool.query(`SELECT public."client"."nomPre", public."mouvement".date, public."methodeVente".montant, public."methodeVente".id_ticket
                FROM  public."client", public."mouvement", public."methodeVente"
                WHERE public."client"."id_utilisateur" = $1
                AND   public."methodeVente".nom = 'kridi'
                AND   public."client".id = public."methodeVente"."id_client"
                AND   public."mouvement".id_ticket = public."methodeVente"."id_ticket"`
            ,[id],(err,result) => {
        if(err) {
            console.log(err.toString())
            res.status(400).send(err.toString());
        }else {
            res.status(200).send(result.rows);
        }         
    })
})

router.get("/api/detailsTicket/:id",(req,res)=>{
    const id = Number(req.params.id);
    
    pool.query('SELECT type from public."produitsTicket" WHERE public."produitsTicket"."id_ticket" = $1',[id],(err,result1)=> {
        if(err)
            res.status(400).send(err.toString());
        else
            if(result1.rows[0].type === "menu") {
                pool.query(`SELECT * from public."articleMenu" , public."produitsTicket"
                    WHERE public."produitsTicket"."id_ticket" = $1
                    AND   public."produitsTicket".id = public."articleMenu".id`,[id],(err,result2)=>{
                    if(err)
                        res.status(400).send(err.toString());
                    else {
                        res.status(200).send(result2.rows);
                    }   
                })
            }else{
                pool.query(`SELECT * from public."stock" , public."produitsTicket"
                    WHERE public."produitsTicket".id_ticket = $1
                    AND   public."produitsTicket".id = public."stock".id`,[id],(err,result2)=>{
                    if(err)
                        res.status(400).send(err.toString());
                    else {
                        res.status(200).send(result2.rows);
                    }   
                })
            }
    })
})


router.get("/api/afficherClients/:id",(req,res) => {
    const {id} = req.params;

    pool.query(`Select * from client where "id_utilisateur" = $1`,[id],(err,result1) => {
        if(err)
            res.status(400).send(err.toString());
        else {
            res.status(200).send(result1.rows);
        }         
    })
})

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

module.exports = router;