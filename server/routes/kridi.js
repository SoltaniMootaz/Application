const router = require('express').Router();
const pool = require('../database/creerDB-postgreSQL');

router.get("/api/afficherLogKridi/:id",(req,res) => {
    const id = Number(req.params.id);

    pool.query(`SELECT public."client"."nomPre", public."mouvement".date, public."methodeVente".montant, 
                       public."methodeVente".id_ticket, public."mouvement".operation
                FROM  public."client", public."mouvement", public."methodeVente"
                WHERE public."client"."id_utilisateur" = $1
                AND   public."methodeVente".nom = 'kridi'
                AND   public."client".id = public."methodeVente"."id_client"
                AND   public."mouvement".id_ticket = public."methodeVente"."id_ticket"
                AND   public."mouvement".operation = 'vente'`
            ,[id],(err,result) => {
        if(err) {
            res.status(400).send(err.toString());
        }else {
            const arr = result.rows;

            pool.query(`SELECT public."client"."nomPre", public."mouvement".date, public."mouvement".montant, public."mouvement".operation
                        FROM  public."client", public."mouvement"
                        WHERE public."client"."id_utilisateur" = $1
                        AND   public."client".id = public."mouvement".id_client
                        AND   public."mouvement".operation = 'paiement'`,[id],(err,result)=>{
                if(err) {
                    res.status(400).send(err.toString());
                }else {
                    for(let value of result.rows)
                        arr.push(value)

                    res.status(200).send(arr);
                }
            })
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

router.put("/api/ModifierMontant/:id",(req,res)=>{
    const {id} = req.params;
    const {montant, date} = req.body;

    pool.query('UPDATE public."client" SET montant = ((SELECT montant FROM public."client" WHERE id = $2) - $1) WHERE id = $2',[montant, id],(err)=>{
        if(err) {
            res.status(400).send(err.toString())
        }else {
            pool.query('INSERT INTO public.mouvement(operation, date, montant,"id_client") VALUES($1,$2,$3,$4)',["paiement",date,montant,id],(err)=>{
                if(err) 
                    res.status(400).send(err.toString())
                else
                    res.status(200).send("succes")
            })
        }
    })
})

module.exports = router;