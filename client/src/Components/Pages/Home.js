import React, { useEffect, useState } from "react";
import HomeButtons from "../_HomeComponents/HomeButtons";
import Recommendation from '../_HomeComponents/Recommendation'
import * as Stock from "../../services/Stock";
import {sort} from "../../Utils/Stock"

import { FaCashRegister, FaWarehouse } from "react-icons/fa";
import { BiMenu, BiStats, BiSupport } from "react-icons/bi";
import { IoIosJournal } from "react-icons/io";
import { AiFillBook, AiOutlineSetting } from "react-icons/ai";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { RiGpsLine } from 'react-icons/ri'
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Badge, IconButton, CircularProgress, Typography } from "@material-ui/core";

import logo from '../../images/logo.png'
import Image from 'material-ui-image'


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
  },

  padding: {
    padding: theme.spacing(1),
    maxWidth: "40%",
    maxHeight: "50em",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    marginTop: "10%",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "75%",
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: "3em",
    },
  },

  buttons : {
    [theme.breakpoints.down("sm")]: {
      marginTop:"-3em"
    },
    [theme.breakpoints.up("md")]: {
      marginTop:"-10em"
    },
  },

  gps :  {
    [theme.breakpoints.up("md")]: {
      marginLeft:"30%",
      marginTop:"-80%"
    },
    [theme.breakpoints.down("md")]: {
      marginLeft:"50%",
      marginTop:"-20%",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft:"4em",
      paddingTop:"1em"
    }
  },

  logo : {
    [theme.breakpoints.up("md")]: {
      marginTop:"-8em",
      marginLeft:"-14em",
    },

    [theme.breakpoints.down("md")]: {
      marginTop:"-2.5em",
      marginLeft:"-14em",
    },

    [theme.breakpoints.down("xs")]: {
      marginTop:"-1em",
      marginLeft:"0",
    }
  },
  iconButtonLabel: {
    display: 'flex',
    flexDirection: 'column',
  },
}));
function Home() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [recommended, setRecommended] = useState([]);
  const [length, setLength] = useState();

  useEffect(async ()=>{
    var produits = await Stock.recommend();

    if(produits === "no result" || produits.length == 0) {
      setRecommended([]);
      setLength('0')
    }else {
      produits = await sort(produits);
      setRecommended(produits)
      setLength(produits.length)
    }
  },[])

  return (
    <>
      <div className={classes.padding}>
        <Grid container>
          <Grid container>
            <Grid item sm={4} xs={1}></Grid>
            <Grid item sm={4} xs={10}>
              <Image
                src={logo}
                imageStyle={{ width: '70%', height: '60%' }}
                className={classes.logo}
              />
            </Grid>
            <Grid item sm={4} xs={10}>
              <Badge badgeContent={length} color="primary" className={classes.gps} >
                <IconButton classes={{label: classes.iconButtonLabel}}>
                  <RiGpsLine 
                    style={{ width:'4em', height:'4em' }}
                    onClick={()=>setOpen(true)}
                  />
                  <div><Typography style={{fontSize:15, fontWeight:"bold"}}>Recommendation</Typography></div>
                </IconButton>
              </Badge>
              <Recommendation
                handleOpen={open}
                handleClose={() => setOpen(false)}
                data={recommended}
              />
            </Grid>
          </Grid>
          <Grid container spacing={4} className={classes.buttons}>
            <Grid item sm={4} xs={12}>
              {localStorage.getItem("caisse") === "true" ?
                <HomeButtons
                  buttonName="Caisse"
                  icon={<FaCashRegister />}
                  link="/caisse"
                  Bcolor="#00bcd4"
                  disabled="false"
                />
              :
                <HomeButtons
                  buttonName="Caisse"
                  icon={<FaCashRegister />}
                  link="/caisse"
                  Bcolor="#00bcd4"
                  disabled="true"
                />
              }
            </Grid>

            {localStorage.getItem("commerce") === "menu" ? (
              <>
                <Grid item sm={4} xs={12}>
                  <HomeButtons
                    buttonName="menu"
                    icon={<BiMenu />}
                    link="/menu"
                    Bcolor="#00A600"
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <HomeButtons
                    buttonName="Journal"
                    icon={<IoIosJournal />}
                    link="/Journal"
                    Bcolor="#BF1E4B"
                  />
                </Grid>
              </>
            ) : (
              <Grid item sm={8} xs={12}>
                <HomeButtons
                  buttonName="Journal"
                  icon={<IoIosJournal />}
                  link="/Journal"
                  Bcolor="#BF1E4B"
                />
              </Grid>
            )}
          </Grid>
          <Grid container style={{ paddingTop: "1em" }} spacing={4}>
            <Grid item sm={4} xs={12}>
              <HomeButtons
                buttonName="Statistiques"
                icon={<BiStats />}
                link="/statistiques"
                Bcolor="#DC572E"
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <HomeButtons
                buttonName="Stock"
                icon={<FaWarehouse />}
                link="/stock"
                Bcolor="#2E8DEF"
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <HomeButtons
                buttonName="Kridi"
                icon={<AiFillBook />}
                link="/Kridi"
                Bcolor="#DC572E"
              />
            </Grid>
          </Grid>
          <Grid container style={{ paddingTop: "1em" }} spacing={4}>
            <Grid item sm={4} xs={12}>
              <HomeButtons
                buttonName="Support"
                icon={<BiSupport />}
                link="#"
                Bcolor="#BF1E4B"
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <HomeButtons
                buttonName="Options"
                icon={<AiOutlineSetting />}
                link="/options"
                Bcolor="#199900"
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <HomeButtons
                buttonName="Logout"
                icon={<RiLogoutBoxRLine />}
                /* link="/Log-In" */
                Bcolor="#0A5BC4"
                onClick={()=>console.log("clicked")}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Home;
