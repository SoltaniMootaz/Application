import { ADD_DATA,GET_DATA_ERROR } from '../actions/actions'

const initialState = {
    data: [],
    loading: false,
    error: ""
}

const loadIngredients = (state = initialState,action = {}) => {
    switch (action.type) {
        case ADD_DATA: 
            for(var i=0;i<state.data.length;i++) {
                if(state.data[i])
                    if(state.data[i].key == action.payload.key) {
                        delete state.data[i]
                        break;
                    }
            }

            console.log({ ...state, data : [...state.data, action.payload]})
            return({ ...state, data : [...state.data, action.payload]})
        case GET_DATA_ERROR: 
            return {...state,
                data: "",
                loading: false,
                error: action.error
            };
        default: return state;
    }
}

export default loadIngredients;