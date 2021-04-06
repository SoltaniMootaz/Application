import axios from 'axios';
import { GET_DATA_SUCCESS,GET_DATA_ERROR,GET_DATA_REQUEST } from './actions'

const userId=localStorage.getItem("userID");
const url = "http://localhost:3001/api/afficherActivite/"+userId;
var stock;

const LoadActivite = () => {
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
        axios.get(url).then(res => {   
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


export default LoadActivite;