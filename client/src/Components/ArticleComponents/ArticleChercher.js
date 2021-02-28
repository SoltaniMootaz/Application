import React from "react";
import { Row, Card, Col, Image } from "react-bootstrap";
import def from "./img/def.jpg";

function ArticleChercher(props) {
  const article = props.chercherDans.filter(
    (art) =>
      art.nomCategorie.toLowerCase().indexOf(props.value) > -1 ||
      art.nom.toLowerCase().indexOf(props.value) > -1
  );
  console.log(article);

  var src = def;

  const isSRC = (data) => {
    if (data == null) {
      return true;
    } else return false;
  };

  return (
    <>
      {article.map((data1) => {
        return (
          <div key={data1.nom}>
            <Row style={{display: 'flex', flexDirection: 'row'}}>
              <Col xs={3} key={data1.nomCategorie} style={{ marginTop: "5%", marginLeft: "5%" }}>
                <Card style={{ width: "15rem",flex:1, }} >
                  <Card.Img
                    as={Image}
                    variant="top"
                    src={isSRC(data1.image) ? src : data1.image}
                    style={{ height: "150px" }}
                  />
                  <Card.Body>
                    <Card.Title>{data1.nom}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        );
      })}
    </>
  );
}

export default ArticleChercher;
