import { Grid, } from '@material-ui/core'
import {makeStyles } from '@material-ui/core/styles'
import React from 'react'
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
    return (
        <div>
           <StockAppBar /> 
           <main className={classes.content}>
          <div className={classes.toolbar} />

               <StockTable />

               
           </main>
           
        </div>
    )
}

export default Stock
