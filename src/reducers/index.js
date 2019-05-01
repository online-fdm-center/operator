import { combineReducers } from "redux"
import auth from './auth'
import materials from './materials'
import qualities from './qualities'
import products from './products'

export default combineReducers({
  auth,
  materials,
  qualities,
  products
})