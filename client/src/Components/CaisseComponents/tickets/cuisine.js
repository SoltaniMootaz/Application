import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LoadTicket } from '../../../actions'

const Cuisine = (props) => {
  const [produits, setProduits] = useState();
  const [header, setHeader] = useState();
  const loadTicket = useSelector(state=>state.loadTicket);

  useEffect(()=>{
    if(props.print) {
      props.setPrint(false);
      let rndm = Math.random().toString(36).substring(7);
      localStorage.setItem('change',rndm)      
      const w=window.open();
      if(w) {
        w.document.write(document.getElementById('content1').innerHTML);
        w.focus();
        w.print();
        w.close();
      }
    }
  },[props.print])

  useEffect(()=>{
    setHeader(<>
      <p style={{marginLeft:60}}>CAISSE : {localStorage.getItem('userID')}</p>
      <p style={{marginLeft:60}}>TABLE : {localStorage.getItem('tableIndex')}</p>
      <hr />
    </>)
  },[localStorage.getItem('tableIndex')])

  useEffect(()=>{
    if(loadTicket.data) {
      setProduits(
        loadTicket.data.map((val,index)=>{
          if(val)
            return(
              <tr>
                <td style={{fontSize:15,textAlign:"center"}}>{loadTicket.quantite[index]}</td>
                <td style={{fontSize:15,textAlign:"center"}}>{val.libelle}</td>
              </tr>
            )
        })
      )
    }
  },[loadTicket])

  return (<>
    <div id="content1">
      {header}
      <table style={{marginLeft:5}} width="200px" cellSpacing="5px">
        <tr>
          <th style={{fontSize:15}}>Nb</th>
          <th style={{fontSize:15}}>Description</th>
        </tr>
        {produits}
      </table>
    </div>
  </>)
}

export default Cuisine;