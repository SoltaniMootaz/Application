import { Divider, Grid,TextField,Button } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import axios from 'axios'
import React,{useState} from 'react'

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
            <Typography variant="h5" style={{color:'#4caf50',fontWeight:'bold'}}>
                Changer votre mot de passe actuelle:
            </Typography>
            <Grid container>
                <Grid item xs={7}>
                <TextField
          id="outlined-full-width"
         
          style={{ margin: 8 }}
          placeholder="nouvelle mdp"
         
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e)=>setNewPass1(e)}
        />
                </Grid>
                <Grid item xs={5}>
                <Button variant="contained" style={{marginLeft:'1em',marginTop:'0.79em',height:'3.5em',width:'95%'}} onClick={()=>Submit1()}>
                Changer
                </Button>
                </Grid>
            </Grid>
            <Divider></Divider>
            <br></br>
            <Typography variant="h5" style={{color:'#4caf50',fontWeight:'bold'}}>
                Changer votre mot de passe utile de l'application:
            </Typography>
            <Grid container>
                <Grid item xs={7}>
                <TextField
          id="outlined-full-width"
         
          style={{ margin: 8 }}
          placeholder="nouvelle mdp"
         
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
                </Grid>
                <Grid item xs={5}>
                <Button variant="contained" style={{marginLeft:'1em',marginTop:'0.79em',height:'3.5em',width:'95%'}} >
                Changer
                </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default Passwords
