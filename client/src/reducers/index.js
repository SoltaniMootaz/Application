import { combineReducers } from 'redux'
import {loadStock, loadStockByCategorie} from './loadStock'
import {loadTicket, venteTicket} from './loadTicket'
import loadIngredients from './ingredient'
import loadActivie from './loadJournal'

const allReducers = combineReducers({
    loadStock,
    venteTicket,
    loadStockByCategorie,
    loadTicket,
    loadIngredients,
    loadActivie
})

export default allReducers;