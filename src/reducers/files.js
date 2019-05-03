import {
  GET_FILES_SUCCESSFUL,
} from '../actions/products'

const initialState = {
  byId: {},
}

function arrayToObjectById(array){
  const byId = {}
  array.forEach(item => {
    byId[item.id] = item
  })
  return byId
}

function filesReducer(state = initialState, action) {
  switch (action.type) {
  case GET_FILES_SUCCESSFUL:
    return {
      ...state,
      byId: {
        ...state.byId,
        ...arrayToObjectById(action.files)
      }
    }
  default:
    return state
  }
}

export default filesReducer