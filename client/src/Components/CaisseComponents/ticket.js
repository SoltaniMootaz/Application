import React, {useState, useEffect} from 'react'
import Vente from './vente'
import {Button, Nav, Row, Col, Table,Form } from "react-bootstrap";
import { makeStyles, useTheme,fade } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  bottomPush: {
    position: "fixed",
    bottom: 0,
    textAlign: "center",
    paddingBottom: 10,
    
},
Control :{
  padding: theme.spacing(5),
}
}));

function Ticket(props) {
    const [state, setState] = useState({
        isOpen: Boolean(false),
      });

    const [data,setData] = useState([]);
    const [index,setIndex] = useState([]);
    const [somme,setSomme] = useState(0);
    const [totale,setTotale] = useState([{
      idIngr:null,
      quantite:null,
      prix:null
    }]);
    const [changed,setChanged] = useState(false);

      const calculTotale = () => {    
        var sm = 0;
        setSomme(0);
        totale.map(e=> {
          if(e.prix !== null) {
            sm += parseFloat(e.prix) * parseInt(e.quantite,10);
          }
        })

        if(!changed) {
          sm += parseFloat(props.array.prix);
        }

        return sm.toFixed(2);
      }

      const handleQuant = (e) => {
        const _id = e.target.getAttribute('id');
        const _prix = e.target.getAttribute('prix');

        setTotale(totale.filter((e1)=>((e1.idIngr !== _id)&&(e1.idIngr !== null))));
        if(e.target.value !== "") {
          setTotale(totale => [...totale,{idIngr:_id,quantite:e.target.value,prix:_prix}]);
          setChanged(true)
        }

      }

      useEffect(() => {
        if(changed) {
          setSomme(calculTotale());         
          setChanged(false);
        }

        if(typeof props.array != "undefined"&&!index.includes(props.index)) {
          if(props.array) {
            setTotale(totale => [...totale,{idIngr:props.array.id,quantite:1,prix:props.array.prix}]);
            setSomme(calculTotale());
          }

          setIndex(index =>[...index,props.index]);
          setData(data=>[...data,<tr key={props.index}>
            <td>{props.index}</td>
            <td>{props.array.nom ? props.array.nom : props.array.libelle}</td>
            <td>{props.array.prix}</td>
            <td>
              <Form.Control
                type="number"
                name="quantite"
                defaultValue="1"
                id={props.array.id}
                prix={props.array.prix}
                onChange={(e) => handleQuant(e)}
              />
            </td>
          </tr>]);
        }
      },[props.array,totale,somme])
  
      const classes = useStyles();
     

    return (
        <>

        <Table responsive >
          <thead>
            <tr>
              <th>#</th>
              <th>Nom du produit</th>
              <th>Prix</th>
              <th>Quantité</th>
            </tr>
          </thead>
          <tbody>
            {data}
          </tbody>
        </Table>

     
    <div className={classes.bottomPush} style={{padding:'10px'}}>
      <Row>
        <Col>
          <Button variant="primary" onClick={() => setState({ isOpen: true })} style={{borderRadius:"10px",width:"8em"}}>Valider</Button> 

          <Vente
            handleOpen={state.isOpen}
            handleClose={() => setState({ isOpen: false })}
            somme={somme}
          />
      </Col>
      <Col style={{top:"0.5em"}}>
        <p style={{fontSize:"15px",color:"green",display:"inline"}}>Somme: {somme} DT</p>
      </Col>
      </Row>
    </div>

      </>
    )
}

export default Ticket; 