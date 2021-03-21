import Axios from 'axios'
import { GET_DATA_ERROR,GET_DATA_REQUEST,GET_DATA_SUCCESS } from './actions'

const url = "http://localhost:3001/api/stock";
const url1 = "http://localhost:3001/api/afficherArticles";
const url2 = "http://localhost:3001/api/afficherCategorie";

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

const LoadMenu = () => {
    return (dispatch) => {
        dispatch({
            type: GET_DATA_REQUEST,
            payload: console.log("wait...")
        })

        Axios.get(url1)
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
const LoadCat = () => {
    return (dispatch) => {
        dispatch({
            type: GET_DATA_REQUEST,
            payload: console.log("wait...")
        })

        Axios.get(url2)
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

const LoadTicket = (data) => (dispatch) => {
    dispatch({
        type: GET_DATA_REQUEST,
        payload: "wait..."
    })

    return dispatch( {
        type: GET_DATA_SUCCESS,
        payload: data
    });
}

export {LoadStock, LoadTicket,LoadMenu,LoadCat};