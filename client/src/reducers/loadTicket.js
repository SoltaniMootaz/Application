import { ADD_DATA,GET_DATA_SUCCESS, REMOVE_DATA } from '../actions/actions'

const initialState = {data: [], quantite: []}
var tmpState = {data: [], quantite: [], tmp: []}

const loadTicket = (state = initialState,action = {}) => {
    //console.log(action.payload)
    switch (action.type) {
        case REMOVE_DATA:
            state.data.forEach((val,index) => {
                if(val == action.payload) {
                    if(state.quantite[index] == 1) {
                        state.data.splice(index,1);
                        state.quantite.splice(index,1);
                    }else 
                        state.quantite[index] -= 1;
                    
                    tmpState = {...tmpState, index : "tmp"}
                    tmpState.data = state.data;
                    tmpState.quantite = state.quantite;  
                }
            })
            return tmpState
        case ADD_DATA: 
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