import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LoadTicket } from '../../../actions'

const TicketVente = (props) => {
  const [produits, setProduits] = useState();
  const [quantite, setQuantite] = useState(0);
  const [totale, setTotale] = useState(0);
  const [payment, setPayment] = useState();
  const [rendu, setRendu] = useState(0);
  const loadTicket = useSelector(state=>state.loadTicket)
  const venteTicket = useSelector(state=>state.venteTicket);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(props.print) {
      const w=window.open();
      if(w) {
        w.document.write(document.getElementById('content').innerHTML);
        w.focus();
        w.print();
        w.close();

        props.setPrint(false);

        localStorage.removeItem('ticket' + localStorage.getItem('tableIndex'));
        dispatch(LoadTicket({}, "remove_all_data"))
      }
    }
  },[props.print])

  useEffect(()=>{
    if(loadTicket.data) {
      var quant=0,tot=0;

      setProduits(
        loadTicket.data.map((val,index)=>{
          quant += loadTicket.quantite[index];
          tot = parseFloat(tot) + (parseInt(loadTicket.quantite[index],10) * parseFloat(val.prix_ttc));
          return(
            <tr>
              <td style={{fontSize:10,textAlign:"center"}}>{loadTicket.quantite[index].toString() + "x " + val.libelle}</td>
              <td style={{fontSize:12,textAlign:"center"}}>{val.prix_ttc.toFixed(3)}</td>
              <td style={{fontSize:12,textAlign:"center"}}>{(val.prix_ttc * loadTicket.quantite[index]).toFixed(3)}</td>
            </tr>
          )
        })
      )
      
      setQuantite(quant);
      setTotale(tot);
    }
  },[loadTicket])

  useEffect(()=>{
    var rend = 0;
    if(venteTicket.data.length > 0)
      setPayment(
        venteTicket.data.map(val=>{
          if(val[0])
            if(val[0].montant > 0) {
              rend += parseFloat(val[0].montant)
              return(<>         
                  <tr>
                    <td style={{fontSize:12}}>{val[0].methode}&nbsp;:</td>
                    <td style={{fontSize:12}}>{parseFloat(val[0].montant).toFixed(3)}&nbsp;DT</td>
                  </tr>
              </>)
            }
        })
      )
    
    setRendu(rend.toFixed(3))
  },[venteTicket,props.print,loadTicket])

  return (<>
    <div id="content">
      <p style={{marginLeft:50,fontSize:15}}>TICKET N°{localStorage.getItem('numTicket')}</p>
      <hr />

      <table style={{marginLeft:5}} width="10px" cellSpacing="5px">
        <tr>
          <th style={{fontSize:15}}>Description</th>
          <th style={{fontSize:15}}>PU</th>
          <th style={{fontSize:15}}>MNT</th>
        </tr>
        {produits}
        <tr></tr><tr></tr>
        <tr>
          <td style={{fontSize:12}}>= TOTAL ({quantite})</td>
          <td></td>
          <td style={{fontSize:12,textAlign:"right"}}>{totale.toFixed(3)}</td>
        </tr>
        <tr>
          <td style={{fontSize:12,width:"20px"}}>Rendu monnaie</td>
          <td></td>
          <td style={{fontSize:12,textAlign:"right"}}>{'-' + Math.abs(rendu - totale).toFixed(3)}</td>
        </tr>
      </table>
      <hr />   
      <table style={{marginLeft:30}} width="20px" cellSpacing="5px">  
        {payment}
      </table> 
      <hr/>
      <p style={{marginLeft:40,fontSize:10}}>POWERED BY CLEDISS</p>
      <p style={{marginLeft:55,fontSize:10}}>www.clediss.com</p>
      <p style={{marginLeft:50,fontSize:10}}>www.nomadis.online</p>
      <p style={{marginLeft:55,fontSize:10}}>TEL: 36 32 12 68</p>
    </div>
  </>)
}

export default TicketVente;