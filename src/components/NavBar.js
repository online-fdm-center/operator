import React, { Component } from "react"
import { Navbar, Nav, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { connect } from 'react-redux'
import { unlogin } from '../actions/auth'

const mapStateToProps = ({auth}) => ({
  token: auth.token,
  status: auth.status
})
const mapDispatchToProps = dispatch => ({
  unlogin: () => dispatch(unlogin())
})

class NavBar extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Brand>online.fdm.center</Navbar.Brand>
        <Nav className="mr-auto">
          <LinkContainer to="/panel/users">
            <Nav.Link>Пользователи</Nav.Link>
          </LinkContainer>
        </Nav>
        <Button variant="outline-secondary" onClick={this.props.unlogin}>Выйти</Button>
      </Navbar>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)