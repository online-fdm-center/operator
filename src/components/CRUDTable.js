import React, { Component } from "react"
import { Container, Table, Form, Modal, Button, DropdownButton, Dropdown } from "react-bootstrap"

const OPENAPI_HTML_TYPES_MAP = {
  string: 'text'
}

class CRUDTable extends Component {
  constructor(props){
    super(props)
    this.state = {
      createItemModal: false,
      deleteModal: null,
      updateModal: null,
    }
    props.getItems(props.filter)
  }

  onCreateNewItem = e => {
    e.preventDefault()
    const item = {}
    const { schema } = this.props
    Object.keys(schema.properties).forEach(key => {
      if (!e.target[key].value){
        return
      }
      let value
      switch (schema.properties[key].type) {
      case 'number':
        value = Number(e.target[key].value)
        break
      default:
        value = e.target[key].value
        break
      }
      item[key] = value
    })
    this.props.createItem(item)
    this.setState({createItemModal: false})
  }

  onUpdate = e => {
    e.preventDefault()
    const item = {}
    const { schema } = this.props
    Object.keys(schema.properties).forEach(key => {
      if (!e.target[key].value){
        return
      }
      let value
      switch (schema.properties[key].type) {
      case 'number':
        value = Number(e.target[key].value)
        break
      default:
        value = e.target[key].value
        break
      }
      item[key] = value
    })
    this.props.updateItem(item)
    this.setState({updateModal: null})
  }

  onDelete = id => {
    this.props.deleteItem(id)
    this.setState({deleteModal: null})
  }

  render() {
    const {items, schema} = this.props
    const editItem = this.state.updateModal !== null
      ? items.find(item => item.id === this.state.updateModal)
      : null
    return (
      <>
        <Container fluid={true}>
          <h2>Таблица {schema.title}</h2>
          { typeof this.props.createItem === 'function'
            ? <Button size="sm" className="ml-2" onClick={() => this.setState({createItemModal: true})}>Создать {schema.title}</Button>
            : null
          }
          <Table striped bordered hover size="sm" className="mt-2">
            <thead>
              <tr>
                {
                  Object.keys(schema.properties).map(key => (
                    <th key={key}>{schema.properties[key].title || key}</th>
                  ))
                }
                <th>Действие</th>
              </tr>
            </thead>
            <tbody>
              {
                items.map(item => (
                  <tr key={item.id}>
                    {
                      Object.keys(schema.properties).map(key => (
                        <td key={key}>{item[key]}</td>
                      ))
                    }
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
          <Modal.Body>Удалить запись №{this.state.deleteModal}?</Modal.Body>
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
              Создание новой записи в {schema.title}
            </Modal.Header>
            <Modal.Body>
              {
                Object.keys(schema.properties).map(key => (
                  <Form.Group key={key}>
                    <Form.Label>{schema.properties[key].title || key}</Form.Label>
                    <Form.Control
                      name={key}
                      type={OPENAPI_HTML_TYPES_MAP[schema.properties[key].type] || schema.properties[key].type}
                      step={0.01}
                      size="sm"
                      required={schema.required.includes(key)}
                    ></Form.Control>
                  </Form.Group>
                ))
              }
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
                Редактирование записи №{editItem.id}
              </Modal.Header>
              <Modal.Body>
                <Form.Control name="id" value={editItem.id} type="hidden" />
                {
                  Object.keys(schema.properties).filter(key => key !== 'id').map(key => (
                    <Form.Group key={key}>
                      <Form.Label>{schema.properties[key].title || key}</Form.Label>
                      { Array.isArray(schema.properties[key].enum)
                        ? <Form.Control
                          name={key}
                          type={OPENAPI_HTML_TYPES_MAP[schema.properties[key].type] || schema.properties[key].type}
                          step={0.01}
                          size="sm"
                          defaultValue={editItem[key]}
                          required={schema.required.includes(key)}
                          as="select"
                        >
                          { schema.properties[key].enum.map(item => (<option key={item}>{item}</option>))}
                        </Form.Control>
                        : <Form.Control
                          name={key}
                          type={OPENAPI_HTML_TYPES_MAP[schema.properties[key].type] || schema.properties[key].type}
                          step={0.01}
                          size="sm"
                          defaultValue={editItem[key]}
                          required={schema.required.includes(key)}
                        />
                      }
                    </Form.Group>
                  ))
                }
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

export default CRUDTable