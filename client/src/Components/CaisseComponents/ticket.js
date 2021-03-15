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

    function countOccurrences(e) {
      if(e.target.value)
        return (e.target.value + 1);
      else
        return 1;
    }

      useEffect(() => {
        if(typeof props.array != "undefined"&&!index.includes(props.index)) {
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
                />
              </td>
            </tr>]);
        }
      },[props.array])
  
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
        <Button variant="primary" onClick={() => setState({ isOpen: true })} style={{borderRadius:"10px",width:"8em"}}>Valider</Button> 

<Vente
handleOpen={state.isOpen}
handleClose={() => setState({ isOpen: false })}
/>

  <Button variant="danger" style={{borderRadius:"10px",width:"8em",marginLeft:'2.5em'}}>Effacer</Button>
</div>
       

      </>
    )
}

export default Ticket; 