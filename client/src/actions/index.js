import Axios from 'axios'
import { REMOVE_ALL_TICKET,REMOVE_ALL_DATA,ADD_DATA,REMOVE_DATA,GET_DATA_ERROR,GET_DATA_REQUEST,GET_DATA_SUCCESS } from './actions'

const url = "http://localhost:3001/api/stock/" + localStorage.getItem("userID");
var stock;

const LoadStock = () => {
    return (dispatch) => {
        dispatch({
            type: GET_DATA_REQUEST,
            payload: console.log("wait...")
        })

        Axios.get(url).then(res => {   
            stock = res.data;  
            return  dispatch( {
                    type: GET_DATA_SUCCESS,
                    payload: res.data
                });
            })
            .catch(err => {
              return   dispatch( {
                    type: GET_DATA_ERROR,
                    payload: err.response.data
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
                    type: ADD_DATA,
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
                    type: ADD_DATA,
                    payload: product[0]
                });
            case "remove_all_data" :
                return dispatch( {
                    type: REMOVE_ALL_TICKET,
                });
            case "quantity change" :
                console.log(value);
                return dispatch( {
                    type: ADD_DATA,
                    payload: data,
                    quantity: value
                }); 
            default :
                return dispatch( {
                    type: ADD_DATA,
                    payload: data
                });
        }
    }
}

export {LoadStock, LoadTicket};