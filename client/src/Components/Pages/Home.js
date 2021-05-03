import React from "react";
import HomeButtons from "../_HomeComponents/HomeButtons";
import { FaCashRegister } from "react-icons/fa";
import { BiMenu } from "react-icons/bi";
import { IoIosJournal } from "react-icons/io";
import { BiStats } from "react-icons/bi";
import { FaWarehouse } from "react-icons/fa";
import { AiFillBook } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
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
      marginLeft: "5em",
    },
  },
}));
function Home() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.padding}>
        <Grid container>
          <Grid container>
            <Grid item sm={4} xs={1}></Grid>
            <Grid item sm={4} xs={10}>
              <Image
                src={logo}
                imageStyle={{ width: '100%', height: '80%' }}
                style={{marginTop:"-70%"}} 
              />
            </Grid>
          </Grid>
          <Grid container spacing={4}>
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
                link="/Log-In"
                Bcolor="#0A5BC4"
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Home;
