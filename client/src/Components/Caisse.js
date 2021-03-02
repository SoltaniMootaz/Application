import React,{ useState, useEffect } from 'react'
import Ticket from './CaisseComponents/ticket'
import AfficheArticle from './CaisseComponents/AfficheArticle'
import {
    Container,
    Row,
    Col,
    Spinner,
    Navbar,
    Form,
    FormControl,
    Nav
  } from "react-bootstrap";
  import { AiFillHome } from "react-icons/ai";
  import Axios from "axios";
function Caisse() {
  const urlart = "http://localhost:3001/api/afficherArticles&";
  const urlprod ="http://localhost:3001/api/stock";


  const [dataArt, setDataArt] = useState([]);
  const [dataProd,setDataProd]=useState([]);
  const [isLoading2, setLoading2] = useState(true);

  var tickeTab=new Array();
  const getArticles = () => {
    Axios.get(urlart)
      .then((res) => setDataArt(res.data))
      .catch((err) => console.log(err));
    setLoading2(false);
  };
  const getProd = () => {
    Axios.get(urlprod)
      .then((res) => setDataProd(res.data))
      .catch((err) => console.log(err));
    setLoading2(false);
  };
  useEffect(() => {

    getArticles();
    getProd();
  }, []);

const ticketCallBack=(a)=>{
tickeTab=a;
console.log(a)

}
  if (isLoading2) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  } else {
    return (
        <>

       
    )
}}

export default Caisse; 