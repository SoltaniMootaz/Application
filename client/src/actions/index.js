import Axios from 'axios'
import { ADD_DATA,REMOVE_DATA,GET_DATA_ERROR,GET_DATA_REQUEST,GET_DATA_SUCCESS } from './actions'

const url = "http://localhost:3001/api/stock/" + localStorage.getItem("userID");

const LoadStock = () => {
    return (dispatch) => {
        dispatch({
            type: GET_DATA_REQUEST,
            payload: console.log("wait...")
        })

        Axios.get(url)
            .then(res => {
                
            return   dispatch( {
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

const LoadTicket = (data, todo) => (dispatch) => {
    dispatch({
        type: GET_DATA_REQUEST,
        payload: "wait..."
    })

    if (todo == "remove") {
        return dispatch( {
            type: REMOVE_DATA,
            payload: data
        });
    }else {
        return dispatch( {
            type: ADD_DATA,
            payload: data
        });
    }
}

export {LoadStock, LoadTicket};