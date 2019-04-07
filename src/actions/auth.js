import api from '../api'

export const TEST_LOGIN = 'TEST_LOGIN'
export const TEST_LOGIN_FAILED = 'TEST_LOGIN_FAILED'
export const TEST_LOGIN_SUCCESS = 'TEST_LOGIN_SUCCESS'

export const login = (mailPass) => {
  return (dispatch, getState) => {
    const authState = getState().auth
    dispatch({type: TEST_LOGIN})
    let token
    api.auth(authState.token.token, mailPass)
      .then(answer => {
        token = answer
        return api.getUser(answer.token, answer.userId)
      })
      .then(user => {
        token = {
          ...token,
          user
        }
        console.log(token)
        localStorage.setItem('token', JSON.stringify(token))
        dispatch({type: TEST_LOGIN_SUCCESS, token})
      })
      .catch(error => dispatch({type: TEST_LOGIN_FAILED, error}))
  }
}

export const UNLOGIN = 'UNLOGIN'

export const unlogin = () => {
  return (dispatch) => {
    localStorage.removeItem('token')
    dispatch(tempAuth(true))    
  }
}

export const TEMP_AUTH = 'TEMP_AUTH'
export const TEMP_AUTH_FAILED = 'TEMP_AUTH_FAILED'
export const TEMP_AUTH_SUCCESS = 'TEMP_AUTH_SUCCESS'

export const tempAuth = (force = false) => {
  return (dispatch, getState) => {
    const authState = getState().auth
    if (!force && authState.token){
      return
    }
    dispatch({type: TEMP_AUTH})
    let token
    api.temporaryRegister()
      .then(answer => {
        token = answer
        return api.getUser(answer.token, answer.userId)
      })
      .then(user => {
        token = {
          ...token,
          user
        }
        console.log(token)
        localStorage.setItem('token', JSON.stringify(token))
        dispatch({type: TEMP_AUTH_SUCCESS, token})
      })
      .catch(error => {
        console.error(error)
        dispatch({type: TEMP_AUTH_FAILED, error})
      })
  }
}