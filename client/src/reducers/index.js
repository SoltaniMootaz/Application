import loadStock from './loadStock'
import loadTicket from './loadTicket'
import loadMenu from './loadMenu'
import loadCat from './loadCat'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    loadStock,
    loadTicket,
    loadMenu,
    loadCat
})

export default allReducers;