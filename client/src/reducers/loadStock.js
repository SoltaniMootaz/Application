import { GET_DATA_ERROR,GET_DATA_REQUEST,GET_DATA_SUCCESS } from '../actions/actions'

const initialState = {
    data: [],
    loading: false,
    error: ""
}

const loadStock = (state = initialState,action = {}) => {
    switch (action.type) {
        case GET_DATA_REQUEST: 
            return {...state,
                data: [],
                loading: true,
                error: ""
            };
        case GET_DATA_SUCCESS: 
            return {...state,
                data: action.payload,
                loading: false,
                error: ""
            };
        case GET_DATA_ERROR: 
            return {...state,
                data: [],
                loading: false,
                error: action.payload
            };
        default: return state;
    }
}

export default loadStock;