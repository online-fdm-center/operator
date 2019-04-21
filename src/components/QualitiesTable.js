import { connect } from 'react-redux'
import CRUDTable from './CRUDTable'

import { getQualities, createQuality, deleteQuality, updateQuality } from '../actions/qualities'

import openapi from '../api/openapi.json'
const qualityScheme = openapi.components.schemas.PrintQuality

const mapStateToProps = ({qualities}) => ({
  items: qualities.qualities,
  filter: qualities.filter,
  schema: qualityScheme
})

const mapDispatchToProps = dispatch => ({
  getItems: (filter) => dispatch(getQualities(filter)),
  createItem: (item) => dispatch(createQuality(item)),
  deleteItem: (id) => dispatch(deleteQuality(id)),
  updateItem: (item) => dispatch(updateQuality(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(CRUDTable)