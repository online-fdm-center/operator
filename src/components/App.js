import React, { Component } from "react"
import { Route, Redirect, Switch } from "react-router-dom"
import { connect } from 'react-redux'

import "../styles/App.css"

import AuthPage from "./AuthPage"
import NavBar from './NavBar'
import UsersTable from './UsersTable'

const mapStateToProps = ({auth}) => ({
  isAuth: auth.token && auth.token.user.group !== 'TEMPORARY_USER',
})

class PrivateRouteUnconnected extends Component {
  render(){
    const { component: Component, isAuth, ...rest } = this.props
    return <Route
      {...rest}
      render={
        props => isAuth
          ? <Component {...props} />
          : <Redirect to="/auth" />
      }
    />
  }
}

const PrivateRoute = connect(mapStateToProps)(PrivateRouteUnconnected)


class Panel extends Component {
  render() {
    return (
      <>
        <NavBar />
        <Route path="/panel/users" component={UsersTable} />
      </>
    )
  }
}

class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Redirect exact from="/" to="/panel/users" />
          <PrivateRoute path="/panel" component={Panel}/>
        </Switch>
        <Route path="/auth" component={AuthPage} />
      </>
    )
  }
}




export default App