import React, { useEffect, useState } from "react";
import { deleteArticle } from "../../services/Menu";
import * as MenuUtils from "../../Utils/Menu"

import def from "./img/def.jpg";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { MdDelete } from "react-icons/md";

const useStyles = makeStyles({
  root: {
    width: "16rem",
  },
  media: {
    width: "100%",
    height: 0,
    paddingTop: "70%", // 16:9
  },
  menu: {
    shadows: ["none"],
  },
  Paper: {
    width: "97%",
    marginTop: "3em",
  },
  typo: {
    paddingLeft: "1em",
  },
});

function ArticleChercher(props) {
  const classes = useStyles();
  const [articles, setArticles] = useState()
  var src = def;

  const isSRC = (data) => {
    if (data == null) {
      return true;
    }else 
      return false;
  };

  useEffect(()=>{
    setArticles(MenuUtils.chercher(props.chercherDans, props.value));
  },[props.chercherDans, props.value])

  return (
    <>
      <Paper className={classes.Paper}>
        <div style={{ marginLeft: "2em" }}>
          <Grid container spacing={3}>
            {articles ? articles.map((data1, index) => {
              return (
                <div key={index}>
                  <div style={{ padding: "1em" }}>
                    <Card className={classes.root} key={data1.ategorie}>
                      <CardHeader
                        action={
                          <IconButton aria-label="delete">
                            <MdDelete
                              onClick={() => {
                                window.location.reload(false);
                                deleteArticle(data1.id);
                              }}
                            />
                          </IconButton>
                        }
                        title={data1.nom}
                        subheader={data1.prix.toFixed(3)}
                      />

                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image={isSRC(data1.image) ? src : data1.image}
                        />
                      </CardActionArea>
                    </Card>
                  </div>
                </div>
              );
            })
            : ""}
          </Grid>
        </div>
      </Paper>
    </>
  );
}

export default ArticleChercher;
