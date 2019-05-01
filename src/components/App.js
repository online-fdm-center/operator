import React, { Component } from "react"
import { Route, Redirect, Switch } from "react-router-dom"
import { connect } from 'react-redux'

import "../styles/App.css"

import AuthPage from "./AuthPage"
import NavBar from './NavBar'
import MaterialsTable from './MaterialsTable'
import QualitiesTable from './QualitiesTable'

const mapStateToProps = ({auth}) => ({
  isAuth: auth.token && auth.group && auth.group !== 'TEMPORARY_USER' && auth.group !== 'UNAUTHORIZED',
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
        <Route path="/panel/materials" component={MaterialsTable} />
        <Route path="/panel/qualities" component={QualitiesTable} />
      </>
    )
  }
}

class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Redirect exact from="/" to="/panel/materials" />
          <PrivateRoute path="/panel" component={Panel}/>
        </Switch>
        <Route path="/auth" component={AuthPage} />
      </>
    )
  }
}




export default App