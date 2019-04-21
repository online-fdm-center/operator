import { connect } from 'react-redux'
import CRUDTable from './CRUDTable'

import { getMaterials, deleteMaterial, updateMaterial, createMaterial } from '../actions/materials'

import openapi from '../api/openapi.json'
const materialsScheme = openapi.components.schemas.Materials

const mapStateToProps = ({materials}) => ({
  items: materials.materials,
  filter: materials.filter,
  schema: materialsScheme
})

const mapDispatchToProps = dispatch => ({
  getItems: (filter) => dispatch(getMaterials(filter)),
  createItem: (item) => dispatch(createMaterial(item)),
  deleteItem: (id) => dispatch(deleteMaterial(id)),
  updateItem: (item) => dispatch(updateMaterial(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(CRUDTable)