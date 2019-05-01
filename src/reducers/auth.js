import {
  AUTH,
  AUTH_FAILED,
  AUTH_SUCCESS,
  UNLOGIN
} from '../actions/auth'

const initialState = {
  group: 'UNAUTHORIZED',
  status: null
}

function authReducer(state = initialState, action) {
  switch (action.type) {
  case AUTH_SUCCESS:
    return {...state, ...action.token, status: null}
  case AUTH_FAILED:
    return {
      ...state,
      status: AUTH_FAILED
    }
  case UNLOGIN:
    return initialState
  default:
    return state
  }
}

export default authReducer