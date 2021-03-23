import { REMOVE_ALL_TICKET,REMOVE_ALL_DATA, ADD_DATA, REMOVE_DATA } from '../actions/actions'

const initialState = {data: [], quantite: []}
var tmpState = {data: [], quantite: [], tmp: []}

const loadTicket = (state = initialState,action = {}) => {
    switch (action.type) {
        case REMOVE_ALL_TICKET:
            return initialState
        case REMOVE_ALL_DATA:
            state.data.forEach((val,index) => {
                if(val == action.payload) {
                    state.data.splice(index,1);
                    state.quantite.splice(index,1);
                }
                tmpState = {...tmpState, index : "tmp"}
                tmpState.data = state.data;
                tmpState.quantite = state.quantite;  
            })
            return tmpState
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
            if(!JSON.stringify(state.data).includes(JSON.stringify(action.payload)))
                return { ...state, data : [...state.data, action.payload], quantite : [...state.quantite, 1]}
            else {
                state.data.map((val,index)=>{
                    if(JSON.stringify(val) === JSON.stringify(action.payload)) {
                        if(action.quantity)
                            state.quantite[index] = parseInt(action.quantity,10);
                        else
                            state.quantite[index] += 1;

                        tmpState = {...tmpState, index : "tmp"}
                        tmpState.data = state.data;
                        tmpState.quantite = state.quantite;
                    }
                })
                return tmpState;
            }
        default: return state;
    }
}

export default loadTicket;