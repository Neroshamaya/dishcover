import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import LogoutPage from './pages/LogoutPage'
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import CreatePage from './pages/CreatePage'

function RouterComponent() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/logout">
          <LogoutPage />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/explore">
          <ExplorePage />
        </Route>
        <Route path="/create">
          <CreatePage />
        </Route>
        <Route path="*">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </Router>
  )
}
