import { Divider, Grid,TextField,Button } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import axios from 'axios'
import React,{useState} from 'react'
import Pass1 from './passwordsComponents/Pass1'
import Pass2 from './passwordsComponents/Pass2'

function Passwords() {
   const url="http://localhost:3001/api/changePassword"
   const [newpass1, setNewPass1] = useState()
   function Submit1(){
    axios.post(url,{
        id: localStorage.getItem("userId"),
        mdp: newpass1,
    }).then(console.log("works")).catch()
   }
    return (
        <div>
              <Pass1 />
           
            
           
              <br></br>
            <Pass2 />
           
            
           
        </div>
    )
}

export default Passwords
