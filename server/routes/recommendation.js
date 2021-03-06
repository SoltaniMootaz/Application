const router = require('express').Router();
const pool = require('../database/creerDB-postgreSQL');
const geolib = require('geolib');

router.get("/api/recommend/:id",(req,res) => {
    const { id } = req.params;
    
    pool.query('SELECT coords FROM utilisateur WHERE id = $1',[id],(err,result1)=>{
        if(err)
            res.status(400).send(err.toString())
        else if(result1.rowCount > 0)
            pool.query('SELECT * FROM utilisateur WHERE id <> $1',[id],async (err,result2)=>{
                if(err)
                    res.status(400).send(err.toString())
                else if(result2.rowCount > 0) {
                    const point1 = { latitude: result1.rows[0].coords.x, longitude: result1.rows[0].coords.y };
                    
                    const closeUsers = await getCloseUsers(result2, point1)

                    const products = [];

                    if(closeUsers.length == 0) 
                        res.status(400).send('no result')
                    else {
                        closeUsers.forEach((value, index)=>{
                            pool.query('SELECT "id_produit", quantite FROM public."tableMouvement" WHERE "user_id" = $1',[value], async (err,result)=>{
                                if(result.rowCount > 0){              
                                    result.rows.map(async val1=>{
                                        await getProducts(val1, products);
                                    })
                                }

                                if(index === closeUsers.length -1) {
                                    if(products) {
                                        if(products.length > 0) {
                                            const Prods = [];

                                            products.forEach((value, index1)=>{
                                                pool.query(`SELECT * FROM public.stock WHERE id = $1 
                                                AND NOT EXISTS (SELECT * from public."stockUtilisateur" 
                                                WHERE "id_produit" = $1 AND "id_utilisateur" = $2)`,[value.id, id],async (err,result)=>{
                                                    if(err)
                                                        res.status(400).send(err.toString())
                                                    else if(result.rowCount > 0) {
                                                        Prods.push(
                                                            {
                                                                id: result.rows[0].id,
                                                                libelle: result.rows[0].libelle,
                                                                image: result.rows[0].image,
                                                                prix: result.rows[0].prix_ttc,
                                                                quantite_vendu: value.quantite 
                                                            }
                                                        )

                                                        //if(index1 === products.length - 1)
                                                            
                                                    }
                                                })
                                            })

                                            setTimeout(()=>{
                                                if(Prods.length === 0)
                                                    res.status(400).send('no result')
                                                else
                                                    res.status(200).json(Prods)
                                            },2000)

                                        }else
                                            res.status(400).send('no result')
                                    }else
                                        res.status(400).send('no result')
                                }
                            })
                        })
                    }
                }
            })
        else
            res.status(400).send('no result')
    })
})

const getCloseUsers = (result, point1) => {
    const arr = [];

    for(var i=0; i<result.rowCount; i++)
        if(result.rows[i] && result.rows[i].coords) {
            const point2 = { latitude: result.rows[i].coords.x, longitude: result.rows[i].coords.y };
            //console.log(point1, point2, geolib.getDistance(point1, point2))

            if(geolib.isPointWithinRadius(point2, point1, 1000)) {
                arr.push(result.rows[i].id)
            }
        }

    return arr;
}

const getProducts = async (val1, products) => {
    var test = false;
                
    for (let val2 of products) {
        if(val2.id === val1.id_produit) {
            val2.quantite += val1.quantite;
            test = true;
            break;
        }
    }

    if(!test) {            
        products.push({id: val1.id_produit, quantite : val1.quantite})
    }
}

module.exports = router;