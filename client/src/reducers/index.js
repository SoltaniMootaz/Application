import loadStock from './loadStock'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    loadStock,
})

export default allReducers;