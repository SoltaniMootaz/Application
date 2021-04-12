import { Button } from '@material-ui/core'
import { Grid, } from '@material-ui/core'
import {makeStyles } from '@material-ui/core/styles'
import React,{useState} from 'react'
import StockAddArticle from './StockComponents/StockAddArticle'
import StockAppBar from './StockComponents/StockAppbar'
import StockTable from './StockComponents/StockTable'

const useStyles = makeStyles((theme) => ({

    toolbar: theme.mixins.toolbar,
  
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));
function Stock() {
    const classes=useStyles()
    const [open, setOpen] = useState(false);
    return (
        <div>
           <StockAppBar /> 
           <main className={classes.content}>
          <div className={classes.toolbar} />
             <Grid container style={{marginBottom:'2em'}}>
                 <Grid xs={6}>
                     <Button variant="contained" style={{backgroundColor:'#4dabf5',color:'white',height:'4em',width:'100%'}} onClick={()=>setOpen(true)}>Ajouter un nouveau article</Button>
                 </Grid>
                 </Grid> 
               <StockTable />
              
               
           </main>
           <StockAddArticle  handleOpen={open}
        handleClose={() => setOpen(false)}></StockAddArticle>
        </div>
    )
}

export default Stock
