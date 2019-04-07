import {
  TEST_LOGIN,
  TEST_LOGIN_FAILED,
  TEST_LOGIN_SUCCESS,
  TEMP_AUTH,
  TEMP_AUTH_FAILED,
  TEMP_AUTH_SUCCESS,
  UNLOGIN
} from '../actions/auth'

const initialState = {
  token: JSON.parse(localStorage.getItem('token')),
  status: null
}

function authReducer(state = initialState, action) {
  switch (action.type) {
  case TEST_LOGIN:
    return {...state, status: TEST_LOGIN}
  case TEST_LOGIN_FAILED:
    return {...state, status: TEST_LOGIN_FAILED}
  case TEST_LOGIN_SUCCESS:
  case TEMP_AUTH_SUCCESS:
    return {...state, status: null, token: action.token}
  case UNLOGIN:
    return {...state, status: null}
  default:
    return state
  }
}

export default authReducer