import React from 'react'
import HomeButtons from './HomeComponents/HomeButtons'
import {BiCart} from 'react-icons/bi';
import {BiMenu} from 'react-icons/bi';
import {IoIosJournal} from 'react-icons/io';
import {BiStats} from 'react-icons/bi';
import {FaWarehouse} from 'react-icons/fa';
import {AiFillBook} from 'react-icons/ai';
import {BiSupport} from 'react-icons/bi';
import {AiOutlineSetting} from 'react-icons/ai';
import {RiLogoutBoxRLine} from 'react-icons/ri';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Grid} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(2),
  },

  padding: {
      padding: theme.spacing(1), 
      maxWidth: '40%',
      maxHeight:'50em',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      marginTop: '10%',
      [theme.breakpoints.down('sm')]: {
        maxWidth: '75%',
        
      },
      [theme.breakpoints.down('xs')]:{
         marginLeft :'5em',
      }
  }
  }));
function Home() {
    const classes=useStyles();
    console.log(localStorage.getItem('userID'));
    
    return (
        <>
        
        <div className={classes.padding}>
            <Grid container>
                <Grid container spacing={4}>
                <Grid item sm={4} xs={12}>
           <HomeButtons buttonName='Caisse' icon={<BiCart />} link='/caisse' Bcolor='#00A0B1'/> 
           </Grid>
           <Grid item sm={4} xs={12} >
           <HomeButtons buttonName='menu' icon={<BiMenu />} link='/menu'  Bcolor='#00A600'/>
           </Grid>
           <Grid item sm={4} xs={12} > 
           <HomeButtons buttonName='Journal' icon={<IoIosJournal />} link='#' Bcolor='#BF1E4B'/> 
           </Grid>
           </Grid>
           <Grid container style={{paddingTop:'1em'}} spacing={4}>
           <Grid item sm={4} xs={12}>
           <HomeButtons buttonName='Statistiques' icon={<BiStats />} link='#' Bcolor='#DC572E'/> 
           </Grid>
           <Grid item sm={4} xs={12}  >
           <HomeButtons buttonName='Stock' icon={<FaWarehouse />} link='#' Bcolor='#2E8DEF'/> 
           </Grid>
           <Grid item sm={4} xs={12}>
           <HomeButtons buttonName='Kridi' icon={<AiFillBook />} link='#' Bcolor='#DC572E'/> 
           </Grid>
           </Grid>
           <Grid container style={{paddingTop:'1em'}} spacing={4}>
               <Grid item sm={4} xs={12}>
           <HomeButtons buttonName='Support' icon={<BiSupport />} link='#' Bcolor='#BF1E4B'/> 
           </Grid>
           <Grid item sm={4} xs={12} >
           <HomeButtons buttonName='Options' icon={<AiOutlineSetting />} link='#' Bcolor='#199900'/> 
           </Grid>
           <Grid item sm={4} xs={12}>
           <HomeButtons buttonName='Logout' icon={<RiLogoutBoxRLine />} link='#' Bcolor='#0A5BC4'/> 
           </Grid>
           </Grid>
           </Grid>
           </div>
        
        </>
    )
}

export default Home
