import api from '../api'
import { unlogin } from './auth'

export const GET_USERS_TABLE = 'GET_USERS_TABLE'
export const GET_USERS_TABLE_ERROR = 'GET_USERS_TABLE_ERROR'
export const GET_USERS_TABLE_SUCCESSFUL = 'GET_USERS_TABLE_SUCCESSFUL'

export const getUsers = (filter) => {
  return (dispatch, getState) => {
    const { token } = getState().auth
    if (!filter) filter = getState().usersTable.filter
    dispatch({type: GET_USERS_TABLE, filter})
    api.getUsers(token, filter)
      .then(users => {
        dispatch({type: GET_USERS_TABLE_SUCCESSFUL, users})
      })
      .catch(error => {
        dispatch({type: GET_USERS_TABLE_ERROR, error})
      })
  }
}

export const CREATE_USER = 'CREATE_USER'
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR'
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'

export const createUser = (user) => {
  return (dispatch, getState) => {
    const { token } = getState().auth
    dispatch({type: CREATE_USER})
    api.createUser(token, user)
      .then(user => {
        dispatch({type: CREATE_USER_SUCCESS, user})
        dispatch(getUsers())
      })
      .catch(error => {
        console.error(error)
        dispatch({type: CREATE_USER_ERROR, error})
      })
  }
}

export const DELETE_USER = 'DELETE_USER'
export const DELETE_USER_ERROR = 'DELETE_USER_ERROR'
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS'

export const deleteUser = (id) => {
  return (dispatch, getState) => {
    const { token } = getState().auth
    dispatch({type: DELETE_USER})
    api.deleteUser(token, id)
      .then(() => {
        dispatch({type: DELETE_USER_SUCCESS})
        dispatch(getUsers())
      })
      .catch(error => {
        console.error(error)
        dispatch({type: DELETE_USER_ERROR, error})
      })
  }
}

export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'

export const updateUser = (user) => {
  return (dispatch, getState) => {
    const { token } = getState().auth
    dispatch({type: UPDATE_USER})
    api.updateUser(token, user)
      .then(() => {
        dispatch({type: UPDATE_USER_SUCCESS})
        dispatch(getUsers())
      })
      .catch(error => {
        console.error(error)
        dispatch({type: UPDATE_USER_ERROR, error})
      })
  }
}