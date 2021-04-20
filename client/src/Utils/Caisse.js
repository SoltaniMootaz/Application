import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {GiTable} from 'react-icons/gi'
import MenuItem from '@material-ui/core/MenuItem';

const getGammes = (data) => {
    const gammes = [];

    for(let i in data) {
      if (gammes.indexOf(data[i].gamme_code) === -1) {
        gammes.push(data[i].gamme_code);
      }
    }

    return gammes
}

const getTables = (submit, styling, classes) => {
    var items=[];
        
    for(var i=1;i<=localStorage.getItem('nbTables');i++){
        const index = i;
        items.push(
            <Grid item xs={4} style={{paddingTop:'1em'}}> 
                <Button size="large" startIcon={<GiTable style={{color:'white'}}/>} value={i} onClick={()=>submit(index)} 
                    className={classes.root} variant="contained"  style={styling(i)}>Table n°{i}
                </Button>
            </Grid>
        )
    }

    return items
}

const calculTotale = (data, quantite) => {
    var sm = 0;

    data.map((e, index) => {
      if(e) {
        if (e.prix_ttc) {
          sm += +e.prix_ttc * +quantite[index];
        }
      }
    });

    return sm.toFixed(3);
}

const calculSomme = (data) => {
    var somme = 0;

    data.map(val=>{
      if(val.montant)
        somme += +val.montant;
    })

    return somme
}

const getClients = (data, setSelectedClient) => {
    var clients = [];

    data.map((row, i) => {
        clients.push(<MenuItem key={i} value={row.nomPre} onClick={()=>setSelectedClient(row.id)}>{row.nomPre}</MenuItem>)
    })

    return clients
}

const setTotaleToNull = (data) => {
    data.map(val=>{
        val.montant = 0;
    })

    return data;
}

const getStock = (page, nbProduits, data) => {
    const res = [];

    for(var i = (page * nbProduits - nbProduits);i< (page * nbProduits);i++) {
        if(data[i])
            res.push(data[i])
    }

    return res;
}

export {
    getGammes,
    getTables,
    calculTotale,
    calculSomme,
    getClients,
    setTotaleToNull,
    getStock
}