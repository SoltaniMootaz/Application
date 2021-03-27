import { combineReducers } from 'redux'
import loadStock from './loadStock'
import loadTicket from './loadTicket'
import loadIngredients from './ingredient'

const allReducers = combineReducers({
    loadStock,
    loadTicket,
    loadIngredients
})

export default allReducers;