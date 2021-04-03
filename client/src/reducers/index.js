import { combineReducers } from 'redux'
import {loadStock, loadStockByCategorie} from './loadStock'
import {loadTicket, venteTicket} from './loadTicket'
import loadIngredients from './ingredient'

const allReducers = combineReducers({
    loadStock,
    venteTicket,
    loadStockByCategorie,
    loadTicket,
    loadIngredients
})

export default allReducers;