import { Button } from '@material-ui/core'
import React from 'react'
import axios from 'axios'
import env from 'react-dotenv'

function TestingPage() {
    function addNewMvmt(){
        var date=new Date();
      
        axios.post(env.API_URL + "addAchat/28", {
           id_produit:20,        
           type: "achat",
           quantite: 15,
           prix: 7.2,
           id_fournisseur: 0,
           date: date,
            })
    }
 
    return (
        <div>
            <Button onClick={()=>{
             addNewMvmt()
             
            }}>Start the test</Button>
        </div>
    )
}

export default TestingPage
