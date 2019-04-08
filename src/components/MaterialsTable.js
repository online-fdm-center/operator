import React, { Component } from "react"
import { connect } from 'react-redux'
import { Container, Table, Form, Modal, Button, DropdownButton, Dropdown } from "react-bootstrap"
import { getMaterials, deleteMaterial, updateMaterial, createMaterial } from '../actions/materials'

const mapStateToProps = ({materials}) => ({
  materials: materials.materials,
  filter: materials.filter
})

const mapDispatchToProps = dispatch => ({
  getItems: (filter) => dispatch(getMaterials(filter)),
  createItem: (item) => dispatch(createMaterial(item)),
  deleteItem: (id) => dispatch(deleteMaterial(id)),
  updateItem: (item) => dispatch(updateMaterial(item))
})

class UsersTable extends Component {
  constructor(props){
    super(props)
    this.state = {
      createItemModal: false,
      deleteModal: null,
      updateModal: null,
    }
    props.getItems(props.filter)
  }

  onChangeGroup = (e) => {
    const { getItems, filter } = this.props
    const newFilter = {
      ...filter,
      where: {
        ...filter.where,
        group: e.target.value
      }
    }
    getItems(newFilter)
  }

  onCreateNewItem = e => {
    e.preventDefault()
    const item = {
      type: e.target.type.value,
      color: e.target.color.value,
      count: Number(e.target.count.value),
    }
    this.props.createItem(item)
    this.setState({createItemModal: false})
  }

  onUpdate = e => {
    e.preventDefault()
    const item = {
      id: Number(e.target.id.value),
      type: e.target.type.value,
      color: e.target.color.value,
      count: Number(e.target.count.value),
    }
    this.props.updateItem(item)
    this.setState({updateModal: null})
  }

  onDelete = id => {
    this.props.deleteItem(id)
    this.setState({deleteModal: null})
  }

  render() {
    const {materials, filter} = this.props
    const editItem = this.state.updateModal !== null
      ? materials.find(material => material.id === this.state.updateModal)
      : null
    return (
      <>
        <Container fluid={true}>
          <h2>Таблица материалов</h2>
          <Button size="sm" className="ml-2" onClick={() => this.setState({createItemModal: true})}>Создать материал</Button>
          <Table striped bordered hover size="sm" className="mt-2">
            <thead>
              <tr>
                <th>#</th>
                <th>Тип</th>
                <th>Цвет</th>
                <th>Количество</th>
                <th>Действие</th>
              </tr>
            </thead>
            <tbody>
              {
                materials.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.type}</td>
                    <td>{item.color}</td>
                    <td>{item.count}</td>
                    <td>
                      <DropdownButton title="действия" size="sm">
                        <Dropdown.Item onClick={() => this.setState({updateModal: item.id})}>Изменить</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.setState({deleteModal: item.id})}>Удалить</Dropdown.Item>
                      </DropdownButton>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </Container>
        <Modal show={this.state.deleteModal !== null} onHide={() => this.setState({deleteModal: null})}>
          <Modal.Header>Удаление</Modal.Header>
          <Modal.Body>Удалить материал №{this.state.deleteModal}?</Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => this.setState({deleteModal: null})}
            >
              Отмена
            </Button>
            <Button
              variant="danger"
              onClick={this.onDelete.bind(this, this.state.deleteModal)}
            >
              Удалить
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.createItemModal} onHide={() => this.setState({createItemModal: false})}>
          <Form size="sm" onSubmit={this.onCreateNewItem}>
            <Modal.Header closeButton>
              Создание нового материала
            </Modal.Header>
            <Modal.Body>   
              <Form.Group>
                <Form.Label>Тип</Form.Label>
                <Form.Control name="type" type="text" size="sm" required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Цвет</Form.Label>
                <Form.Control name="color" type="text" size="sm" required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Количество</Form.Label>
                <Form.Control name="count" type="number" size="sm" required />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit">Создать</Button>
            </Modal.Footer>
          </Form>
        </Modal>
        { editItem
          ? <Modal show={this.state.updateModal !== null} onHide={() => this.setState({updateModal: null})}>
            <Form size="sm" onSubmit={this.onUpdate}>
              <Modal.Header closeButton>
                Редактирование материала №{editItem.id}
              </Modal.Header>
              <Modal.Body>
                <Form.Control name="id" value={editItem.id} type="hidden" />
                <Form.Group>
                  <Form.Label>Тип</Form.Label>
                  <Form.Control name="type" type="text" size="sm" defaultValue={editItem.type} required />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Цвет</Form.Label>
                  <Form.Control name="color" type="text" size="sm" defaultValue={editItem.color} required />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Количество</Form.Label>
                  <Form.Control name="count" type="number" size="sm" defaultValue={editItem.count} required />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit">Изменить</Button>
              </Modal.Footer>
            </Form>
          </Modal>
          : null
        }
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable)