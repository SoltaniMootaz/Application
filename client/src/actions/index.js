import Axios from 'axios'
import { GET_DATA,GET_DATA_ERROR,GET_DATA_REQUEST,GET_DATA_SUCCESS } from './actions'

const url = "http://localhost:3001/api/stock";

const Load = (dispatch) => {
    //return(dispatch) => {
        dispatch( {
            type: GET_DATA_REQUEST,
            payload: console.log("wait...")
        })

        Axios.get(url)
            .then(res => {
                return dispatch( {
                    type: GET_DATA_SUCCESS,
                    payload: res.data
                });
            })
            .catch(err => {
                return dispatch( {
                    type: GET_DATA_ERROR,
                    payload: console.log(err),
                });
            })
    //}
}

export default Load;