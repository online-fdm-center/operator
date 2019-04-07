import React, { Component } from "react"
import { connect } from 'react-redux'
import { Container, Table, Form, Modal, Button, DropdownButton, Dropdown } from "react-bootstrap"
import { getUsers, createUser, deleteUser, updateUser } from '../actions/usersTable'

const mapStateToProps = ({usersTable}) => ({
  users: usersTable.users,
  filter: usersTable.filter
})

const mapDispatchToProps = dispatch => ({
  getUsers: (filter) => dispatch(getUsers(filter)),
  createUser: (user) => dispatch(createUser(user)),
  deleteUser: (id) => dispatch(deleteUser(id)),
  updateUser: (user) => dispatch(updateUser(user))
})

class UsersTable extends Component {
  constructor(props){
    super(props)
    this.state = {
      createUserModal: false,
      deleteModal: null,
      updateModal: null,
    }
    props.getUsers(props.filter)
  }

  onChangeGroup = (e) => {
    const { getUsers, filter } = this.props
    const newFilter = {
      ...filter,
      where: {
        ...filter.where,
        group: e.target.value
      }
    }
    getUsers(newFilter)
  }

  onCreateNewUser = e => {
    e.preventDefault()
    const user = {
      name: e.target.name.value,
      mail: e.target.mail.value,
      password: e.target.password.value,
      address: e.target.address.value,
      balance: e.target.balance.value,
      group: e.target.group.value,
    }
    this.props.createUser(user)
    this.setState({createUserModal: false})
  }

  onUpdate = e => {
    e.preventDefault()
    const oldUser = this.props.users.find(user => user.id == e.target.id.value)
    const user = {
      id: e.target.id.value,
      name: e.target.name.value,
      mail: e.target.mail.value,
      password:  (oldUser.password == e.target.password.value) ? undefined : e.target.password.value,
      address: e.target.address.value,
      balance: Number(e.target.balance.value),
      group: e.target.group.value,
    }
    this.props.updateUser(user)
    this.setState({updateModal: null})
  }

  onDelete = id => {
    this.props.deleteUser(id)
    this.setState({deleteModal: null})
  }

  render() {
    const {users, filter} = this.props
    const editUser = this.state.updateModal !== null
      ? users.find(user => user.id === this.state.updateModal)
      : null
    return (
      <>
        <Container fluid={true}>
          <h2>Таблица пользователей</h2>
          <Form inline>
            <Form.Group>
              <Form.Label>Группа пользователей:</Form.Label>
              <Form.Control className="ml-2" size="sm" as="select" value={filter.where.group} onChange={this.onChangeGroup}>
                <option>TEMPORARY_USER</option>
                <option>USER</option>
                <option>OPERATOR</option>
                <option>SERVER</option>
                <option>ADMIN</option>
              </Form.Control>
            </Form.Group>
            <Button size="sm" className="ml-2" onClick={() => this.setState({createUserModal: true})}>Создать пользователя</Button>
          </Form>
          <Table striped bordered hover size="sm" className="mt-2">
            <thead>
              <tr>
                <th>#</th>
                <th>Имя</th>
                <th>Почта</th>
                <th>Адрес</th>
                <th>Баланс</th>
                <th>Группа</th>
                <th>Действие</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.mail}</td>
                    <td>{user.address}</td>
                    <td>{user.balance}</td>
                    <td>{user.group}</td>
                    <td>
                      <DropdownButton title="действия" size="sm">
                        <Dropdown.Item onClick={() => this.setState({updateModal: user.id})}>Изменить</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.setState({deleteModal: user.id})}>Удалить</Dropdown.Item>
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
          <Modal.Body>Удалить пользователя №{this.state.deleteModal}?</Modal.Body>
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
        <Modal show={this.state.createUserModal} onHide={() => this.setState({createUserModal: false})}>
          <Form size="sm" onSubmit={this.onCreateNewUser}>
            <Modal.Header closeButton>
              Создание нового пользователя
            </Modal.Header>
            <Modal.Body>   
              <Form.Group>
                <Form.Label>Имя</Form.Label>
                <Form.Control name="name" type="text" size="sm" required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Почта</Form.Label>
                <Form.Control name="mail" type="email" size="sm" required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Пароль</Form.Label>
                <Form.Control name="password" type="password" size="sm" required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Адрес</Form.Label>
                <Form.Control name="address" type="text" size="sm" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Баланс</Form.Label>
                <Form.Control name="balance" type="text" size="sm" defaultValue={0}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Группа</Form.Label>
                <Form.Control name="group" type="select" as="select" size="sm">
                  <option>TEMPORARY_USER</option>
                  <option>USER</option>
                  <option>OPERATOR</option>
                  <option>SERVER</option>
                  <option>ADMIN</option>
                </Form.Control>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit">Создать</Button>
            </Modal.Footer>
          </Form>
        </Modal>
        { editUser
          ? <Modal show={this.state.updateModal !== null} onHide={() => this.setState({updateModal: null})}>
            <Form size="sm" onSubmit={this.onUpdate}>
              <Modal.Header closeButton>
                Редактирование пользователя №{editUser.id}
              </Modal.Header>
              <Modal.Body>
                <Form.Control name="id" value={editUser.id} type="hidden" />
                <Form.Group>
                  <Form.Label>Имя</Form.Label>
                  <Form.Control name="name" type="text" size="sm" defaultValue={editUser.name} required />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Почта</Form.Label>
                  <Form.Control name="mail" type="email" size="sm" defaultValue={editUser.mail} required />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control name="password" type="password" defaultValue={editUser.password} size="sm" required />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Адрес</Form.Label>
                  <Form.Control name="address" type="text" defaultValue={editUser.address} size="sm" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Баланс</Form.Label>
                  <Form.Control name="balance" type="text" size="sm" defaultValue={editUser.balance}/>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Группа</Form.Label>
                  <Form.Control name="group" type="select" as="select" size="sm" defaultValue={editUser.group}>
                    <option>TEMPORARY_USER</option>
                    <option>USER</option>
                    <option>OPERATOR</option>
                    <option>SERVER</option>
                    <option>ADMIN</option>
                  </Form.Control>
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