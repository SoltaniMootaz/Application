import { GET_DATA,GET_DATA_ERROR,GET_DATA_REQUEST,GET_DATA_SUCCESS } from '../actions/actions'

const initialState = {
    data: [],
    loading: false,
    error: ""
}

const loadStock = (state = initialState,action) => {
    switch (action.type) {
        case GET_DATA_REQUEST: 
            return {...state,
                data: action.payload,
                loading: true,
                error: ""
            }
        case GET_DATA_SUCCESS: 
            return {...state,
                data: action.payload,
                loading: false,
                error: ""
            }
        case GET_DATA_ERROR: 
            return {...state,
                data: [],
                loading: false,
                error: action.payload
            }
        default: return state;
    }
}

export default loadStock;

/* const initialState = {
    data:[],
    loading:true
}

export default function loadStock(state = initialState, action){
    switch(action.type){
        case GET_DATA_REQUEST:
            return {
                ...state,
                data: action.payload,
                loading:true
            }
        case GET_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading:false
            }
        case GET_DATA_ERROR:
            return {
                ...state,
                data: action.payload,
                loading:false
            }
        //default: return state
    }

} */