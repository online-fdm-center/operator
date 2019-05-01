import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESSFUL,
  GET_PRELIMINATYPRICE_SUCCESSFUL,
  DELETE_PRODUCT_SUCCESSFUL,
} from '../actions/products'

const initialState = {
  byId: {},
  preliminaryPrices: {},
  renders: {},
  myProducts: [],
  filter: {}
}

function arrayToObjectById(array){
  const byId = {}
  array.forEach(item => {
    byId[item.id] = item
  })
  return byId
}

function productsReducer(state = initialState, action) {
  switch (action.type) {
  case GET_PRODUCTS:
    return { ...state, filter: action.filter }
  case GET_PRODUCTS_SUCCESSFUL:
    return {
      ...state,
      byId: {
        ...state.byId,
        ...arrayToObjectById(action.products)
      }
    }
  case GET_PRELIMINATYPRICE_SUCCESSFUL:
    return {
      ...state,
      preliminaryPrices: {
        ...state.preliminaryPrices,
        [action.productId]: action.preliminaryPrice
      }
    }
  case DELETE_PRODUCT_SUCCESSFUL: 
    delete state.byId[action.id]
    return {
      ...state,
      byId: {
        ...state.byId,
      }
    }
  default:
    return state
  }
}

export default productsReducer