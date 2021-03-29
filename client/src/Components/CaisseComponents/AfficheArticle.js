import React,{useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { LoadTicket } from '../../actions'
import Axios from "axios";

import def from './img/def.jpg'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from "@material-ui/core/Button";
import CardMedia from '@material-ui/core/CardMedia';
import { Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: '16rem',
    
  },
  media: {
    width:'100%',
    height: 0,
    paddingTop: '70%', // 16:9
  },
  menu: {
    shadows: ["none"]
  }, Paper:{
    width:'97%',
    marginTop:'1em'
  },
  typo:{
    paddingLeft:'1em'
  },
});
  
function AfficheArticle(props) {
  const urlcat = "http://localhost:3001/api/afficherCategorie";
  const urlart = "http://localhost:3001/api/afficherArticles";

  const [dataCat, setDataCat] = useState([]);
  const [dataArt, setDataArt] = useState([]);
  const [selected, setSelected] = useState();
  const [dataArtSpec, setDataArtSpec] = useState([]);
   
  const dispatch = useDispatch();
  
  var src=def;
  const classes = useStyles();
  const isSRC=(data)=>{
      if (data == null) return true
      else return false
  };

  const handleClick=(a)=> {
    dispatch(LoadTicket(a,"ajouter menu"));
  }

  const handleSelected = (data) => {
    if(data !== "") {
      setSelected(data)
    }else {
      setSelected();
    } 
  }

  const getCategories = () => {
    if(dataCat.length == 0)
      Axios.get(urlcat)
        .then((res) => {
          res.data.map(data=>{
            setDataCat(dataCat=>[...dataCat,{nom: data.nom, id: data.id}])
          })
        })
        .catch((err) => console.log(err));
  };

  const getArticles = () => {
    Axios.get(urlart)
      .then((res) => {
        if(props.search)
          setDataArt(res.data.filter(val=>val.nom.indexOf(props.search) > -1));
        else
          setDataArt(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCategories();
    getArticles();
  }, [props.search]);

  useEffect(()  => {
    if(selected) {
      setDataArtSpec(dataArt.filter(val=>val.id_categorie == selected))
    }else {
      setDataArtSpec();
    }
  },[selected])

  
  return (<>
    <Grid container>
      {dataCat ? dataCat.map((data,index)=> {
        return (
          <>
            <Grid item xs={3} key={index}>
              {selected == data.id ? (
                <Button
                  key={index}
                  variant="contained"
                  style={{ width: "100%", backgroundColor: "#00bcd4" }}
                  onClick={() => handleSelected("")}
                >
                  <p>{data.nom}</p>
                </Button>
              ) : (
                <Button
                  key={index}
                  variant="contained"
                  style={{ width: "100%" }}
                  onClick={() => handleSelected(data.id)}
                >
                  <p>{data.nom}</p>
                </Button>
              )}
            </Grid>
          </>
        )
      }):""}
    </Grid>
    <br />
    <hr />
    <Grid container spacing={3}>
      {dataArtSpec ? 
        dataArtSpec.map((data1, index) => {
          return (
            <>
              <Grid item xs={3}>
                <div key={index} onClick={() => handleClick(data1)}>
                  <div style={{ padding: "5%" }}>
                    <Card className={classes.root} style={{ width: "100%" }}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image={isSRC(data1.image) ? src : data1.image}
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: "0px",
                            right: "0px",
                            height: "20%",
                            borderRadius: "2em 0em 0em 2em",
                            width: "50%",
                            color: "white",
                            backgroundColor: "#00bcd4",
                          }}
                        >
                          <Typography
                            noWrap
                            gutterBottom
                            variant="h6"
                            component="h6"
                            style={{
                              color: "white",
                              marginLeft: "15%",
                              paddingTop: "5%",
                              fontSize:"140%"
                            }}
                          >
                            {data1.prix.toFixed(3)}DT
                          </Typography>
                        </div>
                        <Typography
                          noWrap
                          gutterBottom
                          variant="h6"
                          component="h4"
                        >
                          {data1.nom}
                        </Typography>
                      </CardActionArea>
                    </Card>
                  </div>
                </div>
              </Grid>
            </>
          );
        })
      : dataArt.map((data1, index) => {
          return (
            <>
              <Grid item xs={3}>
                <div key={index} onClick={() => handleClick(data1)}>
                  <div style={{ padding: "5%" }}>
                    <Card className={classes.root} style={{ width: "100%" }}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image={isSRC(data1.image) ? src : data1.image}
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: "0px",
                            right: "0px",
                            height: "20%",
                            borderRadius: "2em 0em 0em 2em",
                            width: "50%",
                            color: "white",
                            backgroundColor: "#00bcd4",
                          }}
                        >
                          <Typography
                            noWrap
                            gutterBottom
                            variant="h6"
                            component="h6"
                            style={{
                              color: "white",
                              marginLeft: "15%",
                              paddingTop: "5%",
                              fontSize:"140%"
                            }}
                          >
                            {data1.prix.toFixed(3)}DT
                          </Typography>
                        </div>
                        <Typography
                          noWrap
                          gutterBottom
                          variant="h6"
                          component="h4"
                        >
                          {data1.nom}
                        </Typography>
                      </CardActionArea>
                    </Card>
                  </div>
                </div>
              </Grid>
            </>
          );
        })}
    </Grid>
  </>)
}

export default AfficheArticle
