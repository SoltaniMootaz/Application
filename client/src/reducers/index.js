import loadStock from './loadStock'
import loadTicket from './loadTicket'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    loadStock,
    loadTicket
})

export default allReducers;