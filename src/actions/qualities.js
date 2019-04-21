import api from '../api'

export const GET_QUALITIES = 'GET_QUALITIES'
export const GET_QUALITIES_ERROR = 'GET_QUALITIES_ERROR'
export const GET_QUALITIES_SUCCESSFUL = 'GET_QUALITIES_SUCCESSFUL'

export const getQualities = (filter) => {
  return (dispatch, getState) => {
    const { token } = getState().auth
    if (!filter) filter = getState().qualities.filter
    dispatch({type: GET_QUALITIES, filter})
    api.getQualities(token.token, filter)
      .then(qualities => {
        dispatch({type: GET_QUALITIES_SUCCESSFUL, qualities})
      })
      .catch(error => {
        dispatch({type: GET_QUALITIES_ERROR, error})
      })
  }
}

export const CREATE_QUALITY = 'CREATE_QUALITY'
export const CREATE_QUALITY_ERROR = 'CREATE_QUALITY_ERROR'
export const CREATE_QUALITY_SUCCESS = 'CREATE_QUALITY_SUCCESS'

export const createQuality = (quality) => {
  return (dispatch, getState) => {
    const { token } = getState().auth
    dispatch({type: CREATE_QUALITY})
    api.createQuality(token.token, quality)
      .then(quality => {
        dispatch({type: CREATE_QUALITY_SUCCESS, quality})
        dispatch(getQualities())
      })
      .catch(error => {
        console.error(error)
        dispatch({type: CREATE_QUALITY_ERROR, error})
      })
  }
}

export const DELETE_QUALITY = 'DELETE_QUALITY'
export const DELETE_QUALITY_ERROR = 'DELETE_QUALITY_ERROR'
export const DELETE_QUALITY_SUCCESS = 'DELETE_QUALITY_SUCCESS'

export const deleteQuality = (id) => {
  return (dispatch, getState) => {
    const { token } = getState().auth
    dispatch({type: DELETE_QUALITY})
    api.deleteQuality(token.token, id)
      .then(() => {
        dispatch({type: DELETE_QUALITY_SUCCESS})
        dispatch(getQualities())
      })
      .catch(error => {
        console.error(error)
        dispatch({type: DELETE_QUALITY_ERROR, error})
      })
  }
}

export const UPDATE_QUALITY = 'UPDATE_QUALITY'
export const UPDATE_QUALITY_ERROR = 'UPDATE_QUALITY_ERROR'
export const UPDATE_QUALITY_SUCCESS = 'UPDATE_QUALITY_SUCCESS'

export const updateQuality = (quality) => {
  return (dispatch, getState) => {
    const { token } = getState().auth
    dispatch({type: UPDATE_QUALITY})
    api.updateQuality(token.token, quality)
      .then(() => {
        dispatch({type: UPDATE_QUALITY_SUCCESS})
        dispatch(getQualities())
      })
      .catch(error => {
        console.error(error)
        dispatch({type: UPDATE_QUALITY_ERROR, error})
      })
  }
}