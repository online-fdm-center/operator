import { connect } from 'react-redux'
import CRUDTable from './CRUDTable'

import { getProducts, deleteProduct, updateProduct } from '../actions/products'

import openapi from '../api/openapi.json'
const productScheme = openapi.components.schemas.Product

const mapStateToProps = ({products}) => ({
  items: Object.keys(products.byId).map(key => products.byId[key]),
  filter: products.filter,
  schema: productScheme
})

const mapDispatchToProps = dispatch => ({
  getItems: (filter) => dispatch(getProducts(filter)),
  deleteItem: (id) => dispatch(deleteProduct(id)),
  updateItem: (item) => dispatch(updateProduct(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(CRUDTable)