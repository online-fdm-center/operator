import {
  GET_QUALITIES,
  GET_QUALITIES_ERROR,
  GET_QUALITIES_SUCCESSFUL
} from '../actions/qualities'

const initialState = {
  qualities: [],
  filter: {}
}

function materialsReducer(state = initialState, action) {
  switch (action.type) {
  case GET_QUALITIES:
    return { ...state, qualities: [], filter: action.filter }
  case GET_QUALITIES_SUCCESSFUL:
    return { ...state, qualities: action.qualities }
  case GET_QUALITIES_ERROR:
    return { ...state, qualities: [] }
  default:
    return state
  }
}

export default materialsReducer