import { combineReducers } from "redux"
import auth from './auth'
import materials from './materials'
import qualities from './qualities'

export default combineReducers({
  auth,
  materials,
  qualities
})