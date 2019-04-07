import { combineReducers } from "redux"
import auth from './auth'
import usersTable from './usersTable'

export default combineReducers({
  auth,
  usersTable
})