import { GET_DATA_SUCCESS } from '../actions/actions'

const initialState = {data: [], quantite: []}
var tmpState = {data: [], quantite: [], tmp: []}

const loadTicket = (state = initialState,action = {}) => {
    switch (action.type) {
        case GET_DATA_SUCCESS: 
            if(!state.data.includes(action.payload))
                return { ...state, data : [...state.data, action.payload], quantite : [...state.quantite, 1]}
            else
                state.data.map((val,index)=>{
                    if(val.id == action.payload.id) {
                        state.quantite[index] += 1;
                        tmpState = {...tmpState, index : "tmp"}
                        tmpState.data = state.data;
                        tmpState.quantite = state.quantite;
                    }
                })
                return tmpState;
        default: return state;
    }
}

export default loadTicket;