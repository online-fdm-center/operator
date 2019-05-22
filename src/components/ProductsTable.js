import React from 'react'
import { connect } from 'react-redux'
import CRUDTable from './CRUDTable'
import { Api } from '../api'

import { getProducts, deleteProduct, updateProduct } from '../actions/products'

import openapi from '../api/openapi.json'
const productScheme = openapi.components.schemas.Product

const mapStateToProps = ({products, files}) => ({
  items: Object.keys(products.byId).map(key => products.byId[key]),
  filter: products.filter,
  schema: productScheme,
  controls: [
    {
      title: 'Статус',
      column: 'status'
    }
  ],
  extraColumns: [
    {
      header: 'Скачать',
      func: product => {
        const Href =  files.byId[product.fileId]
          ? <a href={`//${Api.apiUrl}/files/${files.byId[product.fileId].filename}/download`} download>скачать</a>
          : <a href="#">...</a>
        return Href
      }
    }
  ]
})

const mapDispatchToProps = dispatch => ({
  getItems: (filter) => dispatch(getProducts(filter)),
  deleteItem: (id) => dispatch(deleteProduct(id)),
  updateItem: (item) => dispatch(updateProduct(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(CRUDTable)