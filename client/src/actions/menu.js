import { ADD_DATA,GET_DATA_ERROR,GET_DATA_REQUEST } from './actions'

const LoadIngredients = (data) => {
    return (dispatch) => {
        dispatch({
            type: GET_DATA_REQUEST,
            payload: console.log("wait...")
        })

        if(data)
            return  dispatch({
                type: ADD_DATA,
                payload: data
            });
        else
            return  dispatch({
                type: GET_DATA_ERROR,
                error: data
            });
    }
}

export default LoadIngredients;