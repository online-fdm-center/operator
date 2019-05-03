import api from '../api'

export const GET_PRELIMINATYPRICE = 'GET_PRELIMINATYPRICE'
export const GET_PRELIMINATYPRICE_SUCCESSFUL = 'GET_PRELIMINATYPRICE_SUCCESSFUL'
export const GET_PRELIMINATYPRICE_FAILED = 'GET_PRELIMINATYPRICE_FAILED'

export const getPreliminaryPrice = (id) => {
  return (dispatch, getState) => {
    const authState = getState().auth
    dispatch({type: GET_PRELIMINATYPRICE})
    api.getPreliminaryPrice(authState.token, id)
      .then(answer => {
        if (answer.preliminaryPrice){
          dispatch({
            type: GET_PRELIMINATYPRICE_SUCCESSFUL,
            productId: id,
            preliminaryPrice: answer.preliminaryPrice
          })
        }        
      })
      .catch(error => {
        console.error(error)
        dispatch({type: GET_PRELIMINATYPRICE_FAILED})
      })
  }
}

export const GET_FILES = 'GET_FILES'
export const GET_FILES_SUCCESSFUL = 'GET_FILES_SUCCESSFUL'
export const GET_FILES_FAILED = 'GET_FILES_FAILED'

export const getProductFile = (id) => {
  return (dispatch, getState) => {
    const authState = getState().auth
    dispatch({type: GET_FILES})
    api.getFileProduct(authState.token, id)
      .then(answer => {
        dispatch({
          type: GET_FILES_SUCCESSFUL,
          files: [answer]
        })     
      })
      .catch(error => {
        console.error(error)
        dispatch({type: GET_FILES_FAILED})
      })
  }
}

export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_PRODUCTS_SUCCESSFUL = 'GET_PRODUCTS_SUCCESSFUL'
export const GET_PRODUCTS_FAILED = 'GET_PRODUCTS_FAILED'

export const getProduct = (id) => {
  return (dispatch, getState) => {
    const authState = getState().auth
    dispatch({type: GET_PRODUCTS})
    api.getProduct(authState.token, id)
      .then(product => {
        console.log(product)
        dispatch({type: GET_PRODUCTS_SUCCESSFUL, products: [product]})
        dispatch(getPreliminaryPrice(product.id))
        dispatch(getProductFile(product.id))
      })
      .catch(error => {
        console.error(error)
        dispatch({type: GET_PRODUCTS_FAILED, error})
      })
  }
}

export const getProducts = (filter) => {
  return (dispatch, getState) => {
    const authState = getState().auth
    dispatch({type: GET_PRODUCTS, filter})
    api.getProducts(authState.token, filter)
      .then(products => {
        console.log(products)
        products.forEach(product => {
          dispatch(getPreliminaryPrice(product.id))
          dispatch(getProductFile(product.id))
        })
        dispatch({type: GET_PRODUCTS_SUCCESSFUL, products: products})
      })
      .catch(error => {
        console.error(error)
        dispatch({type: GET_PRODUCTS_FAILED, error})
      })
  }
}

export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const UPDATE_PRODUCT_SUCCESSFUL = 'UPDATE_PRODUCT_SUCCESSFUL'
export const UPDATE_PRODUCT_FAILED = 'UPDATE_PRODUCT_FAILED'

export const updateProduct = (product) => {
  return (dispatch, getState) => {
    const authState = getState().auth
    dispatch({type: UPDATE_PRODUCT, product})
    api.updateProduct(authState.token, product)
      .then(() => {
        dispatch({type: UPDATE_PRODUCT_SUCCESSFUL, product})
        dispatch(getProducts({where: {id: product.id}}))
      })
      .catch(error => {
        console.error(error)
        dispatch({type: UPDATE_PRODUCT_FAILED, error})
      })
  }
}

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const DELETE_PRODUCT_SUCCESSFUL = 'DELETE_PRODUCT_SUCCESSFUL'
export const DELETE_PRODUCT_FAILED = 'DELETE_PRODUCT_FAILED'

export const deleteProduct = (id) => {
  return (dispatch, getState) => {
    const authState = getState().auth
    dispatch({type: DELETE_PRODUCT, id})
    api.deleteProduct(authState.token, id)
      .then(() => {
        dispatch({type: DELETE_PRODUCT_SUCCESSFUL, id})
        dispatch(getProducts(getState().products.filter))
      })
      .catch(error => {
        console.error(error)
        dispatch({type: DELETE_PRODUCT_FAILED, error})
      })    
  }
}