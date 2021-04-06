import Axios from 'axios'
import { REMOVE_ALL_TICKET,REMOVE_ALL_DATA,REMOVE_DATA,GET_DATA_ERROR,GET_DATA_REQUEST,GET_DATA_SUCCESS,GET_DATA_SUCCESS1,ADD_DATA1 } from './actions'

const url = "http://localhost:3001/api/stock/" + localStorage.getItem("userID");
var stock;

const LoadStock = () => {
    return (dispatch) => {
        dispatch({
            type: GET_DATA_REQUEST,
            payload: console.log("wait...")
        })

        if(stock)
            return  dispatch( {
                type: GET_DATA_SUCCESS,
                payload: stock
            });
        else
        Axios.get(url).then(res => {   
            stock = res.data;  
            return  dispatch( {
                    type: GET_DATA_SUCCESS,
                    payload: res.data
                });
            })
            .catch(err => {
              return dispatch( {
                    type: GET_DATA_ERROR,
                    payload: err
                });
            })
    }
}

const LoadTicket = (data, todo, value) => (dispatch) => {
    dispatch({
        type: GET_DATA_REQUEST,
        payload: "wait..."
    })
    if(data) {
        switch(todo) {
            case "ajouter menu" :
                const menu = {id: data.id, libelle: data.nom, prix_ttc: data.prix}
                return dispatch( {
                    type: ADD_DATA1,
                    payload: menu,
                });
            case "remove" :
                return dispatch( {
                    type: REMOVE_DATA,
                    payload: data,
                });
            case "remove_all" :
                return dispatch( {
                    type: REMOVE_ALL_DATA,
                    payload: data,
                });
            case "barcode" :
                const product = stock.filter(e=>e.code_a_barre === data);
                return dispatch( {
                    type: ADD_DATA1,
                    payload: product[0]
                });
            case "remove_all_data" :
                return dispatch( {
                    type: REMOVE_ALL_TICKET,
                });
            case "quantity change" :
                return dispatch( {
                    type: ADD_DATA1,
                    payload: data,
                    quantity: value
                }); 
            default :
                return dispatch( {
                    type: ADD_DATA1,
                    payload: data
                });
        }
    }
}

const LoadStockByCategorie = (code,value) => (dispatch) => {
    var products;

    if(value) {
        if(code)
            products = stock.filter(val=> (val.gamme_code === code &&
            (val.libelle.toLowerCase().indexOf(value.toLowerCase()) !== -1 || val.code_a_barre.indexOf(value.toUpperCase()) !== -1)))
        else {
            products = stock.filter(val=> 
                val.libelle.toLowerCase().indexOf(value.toLowerCase()) !== -1 || 
                val.code_a_barre.indexOf(value.toUpperCase()) !== -1)
        }
    }else {
        if(code)
            products = stock.filter(val=>val.gamme_code === code)
        else
            products = stock;
    }

    return dispatch( {
        type: GET_DATA_SUCCESS1,
        payload: products,
    });
}

const VenteTicket = (value) => (dispatch) => {
    return dispatch( {
        type: GET_DATA_SUCCESS,
        payload: value,
    });
}

export {LoadStock, LoadTicket, LoadStockByCategorie, VenteTicket};