import {
  GET_USERS_TABLE,
  GET_USERS_TABLE_ERROR,
  GET_USERS_TABLE_SUCCESSFUL,
} from '../actions/usersTable'

const initialState = {
  users: [],
  filter: {
    where: {
      group: 'OPERATOR'
    }
  }
}

function usersTableReducer(state = initialState, action) {
  switch (action.type) {
  case GET_USERS_TABLE:
    return {...state, users: [], filter: action.filter}
  case GET_USERS_TABLE_SUCCESSFUL:
    return {...state, users: action.users}
  case GET_USERS_TABLE_ERROR:
    return {...state, users: []}
  default:
    return state
  }
}

export default usersTableReducer